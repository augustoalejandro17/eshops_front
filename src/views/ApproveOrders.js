import React, { useEffect, useState, useMemo } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Close from "@mui/icons-material/Close";
import Button from "components/CustomButtons/Button.js";
import DoneIcon from '@mui/icons-material/Done';
import { storage, db } from "../firebase.js"
import { arrayUnion, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; 
import { useAuth } from "context/AuthContext"
import OrdersTable from 'components/OrdersTable.js';
import Slide from "@mui/material/Slide";
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import useClasses from "components/UseClasses";
import Typography from '@mui/material/Typography';
import {  useForm } from "react-hook-form";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Paper } from "@mui/material";
import { FormInputFile } from "components/FormInputFile";

function createData(id, client, products, date, totalValue, status, actions) {
  return { id, client, products, date, totalValue, status, actions };
}

async function updatePermissions(permissionsRefId, shopIdArray){
	const permissionsRef = doc(db, "user_permissions", permissionsRefId);
	shopIdArray.forEach(async (shopId) => {
		await updateDoc(permissionsRef, { productsAllowed: arrayUnion(shopId) });
	});
}	

async function confirmOrder(id, permissionsRef, productId){
	const orderRef = doc(db, "orders", id);
	await updateDoc(orderRef, { status: "confirmed" });
	await updatePermissions(permissionsRef, productId);
	console.log("confirmed");
}

async function declineOrder(id, permissionsRef){
	const orderRef = doc(db, "orders", id);
	await updateDoc(orderRef, { status: "declined" });
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ApproveOrders() {
	const { userRef } = useAuth();
	const [orders, setOrders] = useState([]);
	const [data, setData] = useState([]);
    const [rows, setRows] = useState(null);

    const [paymentModal, setPaymentModal] = useState(false);
    const [paymentUploaded, setPaymentUploaded] = useState(false);
    const [paymentFile, setPaymentFile] = useState(null);
	const [updatePayment, setUpdatePayment] = useState(false);

    const [orderId, setOrderId] = useState(null);

    const classes = useClasses(modalStyle);


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
    
    const roundButtons = (id, permissionsRef, productId) => {

        const icons = [{ color: "info", icon: FilePresentIcon, id: id, onclick: (orderId) => { showPayment(orderId); } },
        { color: "success", icon: DoneIcon, id: id, userPermissionsRef: permissionsRef, productId: productId, onclick: (orderId) => { confirmOrder(orderId, permissionsRef, productId) } },
        { color: "danger", icon: Close, id: id, userPermissionsRef: permissionsRef, productId: productId, onclick: (orderId) => { declineOrder(orderId) } }
        ].map((prop, key) => {
            return (		
                <Button
                    key={key}
                    round
                    justIcon
                    color={prop.color}
                    size="sm"
                    onClick={() => { prop.onclick(prop.id, prop.userPermissionsRef, prop.productId) }}
                >
                    <prop.icon />
                </Button>
            )
        })
        return icons;	
    }

	useEffect(() => {
		const fetchData = async () => {
			const queryVar = query(collection(db, "orders"), where("userId", "==", userRef));	
			const querySnapshot  = await getDocs(queryVar);
			var ordersObject = [];
			querySnapshot.forEach((doc) => {
	
				ordersObject = 	[...ordersObject, { ...doc.data(), id: doc.id }];	
			});
			setOrders(ordersObject);

		};
		fetchData();
    },[userRef])

	useEffect(() => {
		if(orders.length > 0){
			const dataToSet = orders.map((order) => {
				let productNames = order.products.map((product) => product.name);
				let productIds = order.products.map((product) => product.id);
				return	createData(order.id, order.client.name, productNames, order.date, order.totalValue, order.status, roundButtons(order.id, order.client.permissions, productIds));
			})	
			setData(dataToSet);
		}
	}, [orders]);
	
	const headers = useMemo(
		() => ["Cliente", "Producto", "Fecha de la orden", "Valor Total", "Estado de la orden", "Acciones"]
		, []
	);

    useEffect(() => {
        const rowsToSet = data.map((row) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell  align="center"> {row.client} </TableCell>
                <TableCell align="center">{row.products}</TableCell>
                <TableCell align="center">{row.date.toDate().toLocaleString('en-GB')}</TableCell>
                <TableCell align="center">${row.totalValue}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.actions}</TableCell>
            </TableRow>
        ))
        setRows(rowsToSet);
    }, [data]);
    

	return (
        <>
		<OrdersTable headers={headers} rows={rows} /> 
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
                        }}
                    >
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
                        </Box>
                    </Box>
                    : 
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
                        <Typography className={classes.modalTitle}> No se ha subido el pago </Typography>
                    </Box>
                }
            </DialogContent>
        </Dialog>
        </>
  	);
}

export const PaymentForm = (props) => {

	const { userRef, id } = props;
	const [file, setFile] = useState(null);
	const { handleSubmit, control, watch } = useForm();
	console.log(userRef, id);
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

				<FormInputFile name="FileValue" control={control} label="File" />
			
				<Button onClick={handleSubmit(uploadImage)} variant={"contained"}>
					{" "}
					Subir Imagen{" "}
				</Button>

				</Paper>
		</Box>
				
	)
}