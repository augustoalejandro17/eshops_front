import React, {useEffect, useMemo, useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import { useAuth } from "context/AuthContext"

import { collection, query, where, doc, getDocs, updateDoc, addDoc } from "firebase/firestore";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase.js"

import FilePresentIcon from '@mui/icons-material/FilePresent';
import Close from "@mui/icons-material/Close";
import OrdersTable from 'components/OrdersTable';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useClasses from "components/UseClasses";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import Slide from "@mui/material/Slide";
import { FormInputFile } from "components/FormInputFile";
import { Paper } from "@mui/material";

import {  useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
					
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const MyOrders = (props) => {
    const [tabValue, setTabValue] = React.useState(0);
	const { userRef } = useAuth();
	const [orders, setOrders] = useState([]);
	const classes = useClasses(modalStyle);

	const [ordersFailed, setOrdersFailed] = useState([]);
	const [ordersPending, setOrdersPending] = useState([]);
	const [ordersCompleted, setOrdersCompleted] = useState([]);
	
	const [currentOrderId, setCurrentOrderId] = useState(null);

	const [paymentModal, setPaymentModal] = useState(false);
	const [paymentUploaded, setPaymentUploaded] = useState(false);
	const [paymentFile, setPaymentFile] = useState(null);
	const [updatePayment, setUpdatePayment] = useState(false);

	const [confirmationModal, setConfirmationModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);

    const [rows, setRows] = useState(null);
	const [orderId, setOrderId] = useState(null);

	function cancelOrderConfimation(id){
		setConfirmationModal(true);
		setCurrentOrderId(id);
	}

	async function cancelOrder(){
		const orderRef = doc(db, "orders", currentOrderId);
		await updateDoc(orderRef, { status: "canceled" });
		setSuccessModal(true); 
		setConfirmationModal(false);
	}

	const showPayment = (id, status) => {
		const orderRef = doc(db, "orders", id);

		let currentProduct = orders.find(order => order.id === id)
		setPaymentModal(true); 
		setOrderId(id);

		if(currentProduct.paymentImage){
			setPaymentUploaded(true);
			setPaymentFile(currentProduct.paymentImage);
		}
		else{
			setPaymentUploaded(false);
		}
	}
	
	function createData(id, products, date, totalValue, status, actions) {
		return { id, products, date, totalValue, status, actions };
	}

	const roundButtons = (id, permissionsRef, orderStatus, productId) => {

		const icons = [{ color: "info", icon: FilePresentIcon, id: id, orderStatus: orderStatus, onclick: (orderId, currentStatus) => { showPayment(orderId, currentStatus); } },
		{ color: "danger", icon: Close, id: id, userPermissionsRef: permissionsRef, productId: productId, onclick: (orderId) => { cancelOrderConfimation(orderId) } }
		].map((prop, key) => {
			return (		
				<Button
					key={key}
					round
					justIcon
					color={prop.color}
					size="sm"
					onClick={() => { prop.onclick(prop.id, prop.orderStatus) }}
				>
					<prop.icon />
				</Button>
			)
		})
		return icons;	
	}

	useEffect(() => {
		async function fetchOrders() {		
			const queryVar = query(collection(db, "orders"), where("clientId", "==", userRef));
			const querySnapshot  = await getDocs(queryVar);
			var ordersObject = [];
			if(querySnapshot){
				await querySnapshot.forEach((doc) => {
		
					ordersObject = 	[...ordersObject, { ...doc.data(), id: doc.id }];	
				});
				setOrders(ordersObject);
			}
		};
		if(userRef){
			fetchOrders();
		}
	}, [userRef]);

	useEffect(() => {
		if(orders.length > 0){
			const dataToSet = orders.map((order) => {
				let productNames = order.products.map((product) => product.name);
				let productIds = order.products.map((product) => product.id);
				return	createData(order.id, productNames, order.date, order.totalValue, order.status, roundButtons(order.id, order.client.permissions, order.status, productIds));
			})	
			if (dataToSet) {
				(dataToSet.forEach((order) => {
					switch (order.status) {
						case "payment-pending":
							setOrdersPending([...ordersPending, order]);
							break;
						case "confirmed":
							setOrdersCompleted([...ordersCompleted, order]);
							break;
						case "canceled":
							setOrdersFailed([...ordersFailed, order]);
							break;
						case "payment-refused":
							setOrdersFailed([...ordersFailed, order]);
							break;
						default:
							setOrdersFailed([...ordersFailed, order]);
							break;
					}
				}))
			}
			
		}
	}, [orders]);

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const headers = useMemo(
		() => ["Producto(s)", "Fecha de la orden", "Valor Total", "Estado de la orden", "Acciones"]
	, []);

	
	useEffect(() => {
		let currentTab = ordersPending;
		switch (tabValue) {
			case 0:
				currentTab = ordersPending;
				break;
			case 1:
				currentTab = ordersCompleted;
				break;
			case 2:
				currentTab = ordersFailed;
				break;
			default:
				currentTab = ordersPending;
				break;
		}

        const rowsToSet = currentTab.map((row) => {
			let translatedStatus = "";
			let products = row.products.map((product) => product).join(", ");
			switch (row.status) {
				case "payment-pending":
					translatedStatus = "Pendiente";
					break;
				case "confirmed":
					translatedStatus = "Completada";
					break;
				case "canceled":
					translatedStatus = "Cancelada";
					break;
				case "payment-refused":
					translatedStatus = "Pago rechazado";
					break;
				default:
					translatedStatus = "Cancelada";
					break;
			}
			return (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{products}</TableCell>
                <TableCell align="center">{row.date.toDate().toLocaleString('en-GB')}</TableCell>
                <TableCell align="center">${row.totalValue}</TableCell>
                <TableCell align="center">{translatedStatus}</TableCell>
                <TableCell align="center">{row.actions}</TableCell>
            </TableRow>
	)
		})
        setRows(rowsToSet);
    }, [tabValue, ordersCompleted, ordersFailed, ordersPending]);

	return (
		<div>
			<Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
				<GridContainer direction="row"
						alignItems="center"
						justifyContent="center" 
						justify="center"
				>	
					<Box>
						<Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
							<Tab label="Ordenes pendientes" {...a11yProps(0)} />
							<Tab label="Mis ordenes activas" {...a11yProps(1)} />
							<Tab label="Ordenes fallidas" {...a11yProps(2)} />
						</Tabs>
					</Box>
				</GridContainer>
			</Box>
			<div>
				<TabPanel value={tabValue} index={0}>
					<OrdersTable headers={headers} rows={rows} />
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
					<OrdersTable headers={headers} rows={rows} />
				</TabPanel>
				<TabPanel value={tabValue} index={2}>
					<OrdersTable headers={headers} rows={rows} />
				</TabPanel>
			</div>
			<Dialog
				classes={{
				root: classes.modalRoot,
				paper: classes.modal + " " + classes.modalLarge
				}}
				open={paymentModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setPaymentModal(false)}
				aria-labelledby="large-modal-slide-title"
				aria-describedby="large-modal-slide-description"
			>
				<DialogTitle
				id="large-modal-slide-title"
				className={classes.modalHeader}
				>
				<Button
					simple
					className={classes.modalCloseButton}
					key="close"
					aria-label="Close"
					onClick={() => setPaymentModal(false)}
				>
					{" "}
					<Close className={classes.modalClose} />
				</Button>
				<Typography variant="h4" className={classes.modalTitle}> Respaldo del pago </Typography>
				</DialogTitle>
				<DialogContent
				id="large-modal-slide-description"
				className={classes.modalBody}
				>
					{paymentUploaded ? 
						
						<Box sx={{
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								textAlign: 'center'
							}}>
								<img src={paymentFile} alt="payment" />
								<Box sx={{
									width: '100%',
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									textAlign: 'center',
									marginTop: '1rem',
								}}>
									<Button
										color="muted"
										size="lg"
										onClick={() => {setPaymentModal(false); setUpdatePayment(true);}}
									>	
									Subir nueva imagen
									</Button>
								</Box>
							</Box>
						: 
							<PaymentForm userRef={userRef} id={orderId} />
						}
				</DialogContent>
			</Dialog>
			<Dialog
				classes={{
				root: classes.modalRoot,
				paper: classes.modal + " " + classes.modalLarge
				}}
				open={updatePayment}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setUpdatePayment(false)}
				aria-labelledby="large-modal-slide-title"
				aria-describedby="large-modal-slide-description"
			>
				<DialogTitle
				id="large-modal-slide-title"
				className={classes.modalHeader}
				>
				<Button
					simple
					className={classes.modalCloseButton}
					key="close"
					aria-label="Close"
					onClick={() => setUpdatePayment(false)}
				>
					{" "}
					<Close className={classes.modalClose} />
				</Button>
				<Typography variant="h4" className={classes.modalTitle}> Subir un nuevo comprobante </Typography>
				</DialogTitle>
				<DialogContent
				id="large-modal-slide-description"
				className={classes.modalBody}
				>
					<PaymentForm userRef={userRef} id={orderId} />
				</DialogContent>
			</Dialog>
			<Dialog
				classes={{
				root: classes.modalRoot,
				paper: classes.modal
				}}
				open={confirmationModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setConfirmationModal(false)}
				aria-labelledby="classic-modal-slide-title"
				aria-describedby="classic-modal-slide-description"
			>
				<DialogTitle
				id="classic-modal-slide-title"
				disableTypography
				className={classes.modalHeader}
				>
				<Button
					simple
					className={classes.modalCloseButton}
					key="close"
					aria-label="Close"
					onClick={() => setConfirmationModal(false)}
				>
					{" "}
					<Close className={classes.modalClose} />
				</Button>
				<Typography variant="h4" className={classes.modalTitle}>Cancelar Orden</Typography>
				</DialogTitle>
				<DialogContent
				id="classic-modal-slide-description"
				className={classes.modalBody}
				>
				<Typography variant='body1' color='textSecondary' gutterBottom>¿Estás seguro de cancelar la orden?</Typography>
				</DialogContent>
				<DialogActions className={classes.modalFooter}>
				<Button onClick={() => setConfirmationModal(false)} color="secondary">
					Close
				</Button>
				<Button onClick={() => cancelOrder()} color="primary">Confirmar</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				classes={{
				root: classes.modalRoot,
				paper: classes.modal
				}}
				open={successModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setSuccessModal(false)}
				aria-labelledby="classic-modal-slide-title"
				aria-describedby="classic-modal-slide-description"
			>
				<DialogContent
				id="classic-modal-slide-description"
				className={classes.modalBody}
				>
				<Typography variant='body1' color='textSecondary' gutterBottom> Se canceló la orden </Typography>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default MyOrders


export const PaymentForm = (props) => {

	const { userRef, id } = props;
	const [file, setFile] = useState(null);
	const { handleSubmit, control, watch } = useForm();
	useEffect(() => {
        const subscription = watch((data) => {   
            setFile(data.attachments[0]);         
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const uploadImage = () => {
        if(file == null)
            return;
        const storageRef = ref(storage, 'payments/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
            default:
            break;
        }
        }, 
        (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
            case 'storage/canceled':
            // User canceled the upload
            break;
            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
            default:
            break;
        }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				const orderRef = doc(db, "orders", id);
				updateDoc(orderRef, { paymentImage: downloadURL })
				.then(() => {console.log("success")}).catch((e) => {console.log(e)});
                });
            }
        );
        
    };
	return(
		<Box sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center'
			}}
		>
			<Paper
			style={{
				display: "grid",
				gridRowGap: "20px",
				padding: "20px",
				// margin: "10px 300px",
			}}
			>
				<Typography variant="h6"> Imagen</Typography>

				<FormInputFile name="attachments" control={control} label="File" />
			
				<Button onClick={handleSubmit(uploadImage)} variant={"contained"}>
					{" "}
					Subir Imagen{" "}
				</Button>

				</Paper>
		</Box>
				
	)
}