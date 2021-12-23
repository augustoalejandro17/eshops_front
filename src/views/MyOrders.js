import React, {useEffect, useMemo, useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridContainer from "components/Grid/GridContainer.js";
import { Container, Grid, CardMedia, CardActions, CardActionArea } from '@mui/material';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { useAuth } from "context/AuthContext"
import { collection, query, where, doc, getDocs, updateDoc } from "firebase/firestore";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Close from "@mui/icons-material/Close";
import { db } from "../firebase.js"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import OrdersTable from 'components/OrdersTable';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


var cardsFailed = [{index: 1, title: 'Card Two', status: 'cancelled', productImage: 'https://source.unsplash.com/random'},      
                    {index: 2, title: 'Card Nine', status: 'payment-refused', productImage: 'https://source.unsplash.com/random'}];

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
	
	const [ordersFailed, setOrdersFailed] = useState([]);
	const [ordersPending, setOrdersPending] = useState([]);
	const [ordersCompleted, setOrdersCompleted] = useState([]);

	const [data, setData] = useState([]);
    const [rows, setRows] = useState(null);

	async function cancelOrder(id){
		const orderRef = doc(db, "orders", id);
		await updateDoc(orderRef, { status: "canceled" });
		console.log("Order canceled");
	}

	const showPayment = (id, status) => {
		const orderRef = doc(db, "orders", id);
		// console.log(...ordersPending);
		console.log(orders);

		let paymentUploaded = false;
		let paymentUrl = null;

		console.log(orders.find(order => order.id === id));

		
		// await updateDoc(orderRef, { status: status });
		// console.log("Order canceled");
	}
	
	function createData(id, products, date, totalValue, status, actions) {
		return { id, products, date, totalValue, status, actions };
	}

	const roundButtons = (id, permissionsRef, orderStatus, productId) => {

		const icons = [{ color: "info", icon: FilePresentIcon, id: id, orderStatus: orderStatus, onclick: (orderId, currentStatus) => { showPayment(orderId, currentStatus); } },
		{ color: "danger", icon: Close, id: id, userPermissionsRef: permissionsRef, productId: productId, onclick: (orderId) => { cancelOrder(orderId) } }
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
						case "pending":
							setOrdersPending([...ordersPending, order]);
							break;
						case "completed":
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
		() => ["Producto", "Fecha de la orden", "Valor Total", "Estado de la orden", "Acciones"]
	, []);

	// useEffect(() => {
	// 	console.log(ordersPending)
	// }
	// , [ordersPending])
	
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

        const rowsToSet = currentTab.map((row) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{row.products}</TableCell>
                <TableCell align="center">{row.date.toDate().toLocaleString('en-GB')}</TableCell>
                <TableCell align="center">${row.totalValue}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.actions}</TableCell>
            </TableRow>
        ))
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

		</div>
	);
}

export default MyOrders
