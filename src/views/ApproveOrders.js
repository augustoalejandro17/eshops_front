import React, { useEffect, useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Label } from '@mui/icons-material';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Close from "@mui/icons-material/Close";
import Button from "components/CustomButtons/Button.js";
import DoneIcon from '@mui/icons-material/Done';
import { db } from "../firebase.js"
import { arrayUnion, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; 
import { useAuth } from "context/AuthContext"
import OrdersTable from 'components/OrdersTable.js';

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

const roundButtons = (id, permissionsRef, productId) => {

const icons = [{ color: "info", icon: FilePresentIcon },
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


export default function ApproveOrders() {
	const [orders, setOrders] = useState([]);
	const { userRef } = useAuth();
	const [data, setData] = useState([]);
    const [rows, setRows] = useState(null);

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
		<OrdersTable headers={headers} rows={rows} /> 
  	);
}