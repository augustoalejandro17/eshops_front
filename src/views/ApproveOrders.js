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
	// const [data, setData] = useState(null);

	useEffect(() => {
        const queryVar = query(collection(db, "orders"), where("userId", "==", userRef));	
        getDocs(queryVar).then((querySnapshot) => {
            querySnapshot.forEach((doc, key) => {
                const object = { id: doc.id, ...doc.data()};
                setOrders(...orders, object);
            });
        });
		
    },[])

	// useEffect(() => {
	// 	// if(orders.length > 0) {
    //     // console.log(orders)
    // },[orders])
	// if(orders){
	// 	const dataArray = orders.map((order, key) => {
	// 		return createData(order.buyer.name, order.products, order.date.toDate().toDateString(), order.totalValue, order.status, roundButtons);
	// 	};

	// 	if(dataArray.length > 0){
	// 		setData(dataArray);
	// 	}
	// }
	// if(orders.length > 0){
		console.log(orders)
	// }
	const data = [
		createData(1, 'Cliente 1', "product1", 60.0, roundButtons),
		createData(2, 'Cliente 2', "product2", 90.15, roundButtons),
	];
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