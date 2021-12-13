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
import { addDoc, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"; 
import { useAuth } from "context/AuthContext"

function createData(id, client, products, date, totalValue, status, actions) {
  return { id, client, products, date, totalValue, status, actions };
}

const roundButtons = [
  { color: "info", icon: FilePresentIcon },
  { color: "success", icon: DoneIcon },
  { color: "danger", icon: Close }
].map((prop, key) => {
  return (
    <Button round justIcon size="sm" color={prop.color} key={key}>
      <prop.icon />
    </Button>
  );
});

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
				return	createData(order.id, order.client.name, order.products, order.date, order.totalValue, order.status, roundButtons);
			})	
			setData(dataToSet);
		}
	}, [orders]);

	return (
		<TableContainer component={Paper}>
			{data ? <Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell>Cliente</TableCell>
					<TableCell align="right">Producto(s) adquirido(s)</TableCell>
					<TableCell align="right">Valor total</TableCell>
					<TableCell align="right">Acciones</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{data.map((row) => (
					<TableRow
					key={row.id}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
					<TableCell component="th" scope="row">
						{row.client}
					</TableCell>
					<TableCell align="right">{row.products}</TableCell>
					<TableCell align="right">{row.totalValue}</TableCell>
					<TableCell align="right">{row.actions}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table> : null}
		</TableContainer>
  );
}