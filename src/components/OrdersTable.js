import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

export default function OrdersTable(props) {
    const { headers, rows } = props;

    return (
        <TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
				<TableRow>
                { headers.map((header, index) => (
                    <TableCell align="center" key={index}>{header}</TableCell>
                )) }
				</TableRow>
				</TableHead>
				<TableBody>
                { rows ? rows : null }
				</TableBody>
			</Table>
		</TableContainer>
    )
}
