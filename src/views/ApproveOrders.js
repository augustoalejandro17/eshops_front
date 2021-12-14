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

function createData(id, client, products, date, totalValue, status, actions) {
  return { id, client, products, date, totalValue, status, actions };
}

async function updatePermissions(permissionsRefId, shopId){
	const permissionsRef = doc(db, "user_permissions", permissionsRefId);
	await updateDoc(permissionsRef, {
		productsAllowed: arrayUnion(shopId)
	})
}	
async function confirmOrder(id, permissionsRef){
	const orderRef = doc(db, "orders", id);
	await updateDoc(orderRef, { status: "confirmed" });
	await updatePermissions(permissionsRef, id);
	console.log("confirmed");
}

async function declineOrder(id, permissionsRef){
	const orderRef = doc(db, "orders", id);
	await updateDoc(orderRef, { status: "declined" });
}
const roundButtons = (id, permissionsRef) => {

const icons = [{ color: "info", icon: FilePresentIcon },
	{ color: "success", icon: DoneIcon, id: id, onclick: (productId) => { confirmOrder(productId, permissionsRef) } },
	{ color: "danger", icon: Close, id: id, onclick: (productId) => { declineOrder(productId, permissionsRef) } }
	].map((prop, key) => {
		return (		
			<Button
				key={key}
				round
				justIcon
				color={prop.color}
				size="sm"
				onClick={() => { prop.onclick(prop.id, prop.userPermissionsRef) }}
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
	const [data, setData] = useState();

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
				return	createData(order.id, order.client.name, productNames, order.date, order.totalValue, order.status, roundButtons(order.id, order.client.permissions));
			})	
			setData(dataToSet);
		}
	}, [orders]);

	return (
		<TableContainer component={Paper}>
			{data ? <Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell align="center">Cliente</TableCell>
					<TableCell align="center">Producto(s) adquirido(s)</TableCell>
					<TableCell align="center">Fecha de la orden</TableCell>
					<TableCell align="center">Valor total</TableCell>
					<TableCell align="center">Estado de la orden</TableCell>
					<TableCell align="center">Acciones</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{data.map((row) => (
					<TableRow
					key={row.id}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
					<TableCell component="th" scope="row" align="center">
						{row.client}
					</TableCell>
					<TableCell align="center">{row.products}</TableCell>
					<TableCell align="center">{row.date.toDate().toLocaleString('en-GB')}</TableCell>
					<TableCell align="center">${row.totalValue}</TableCell>
					<TableCell align="center">{row.status}</TableCell>
					<TableCell align="center">{row.actions}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table> : null}
		</TableContainer>
  );
}