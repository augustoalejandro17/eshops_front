import * as React from 'react';
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

function createData(client, product, totalValue, actions) {
  return { client, product, totalValue, actions };
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

const rows = [
  createData('Cliente 1', "product1", 60.0, roundButtons),
  createData('Cliente 2', "product2", 90.15, roundButtons),
];

export default function ApproveOrders() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell align="right">Producto adquirido</TableCell>
            <TableCell align="right">Valor total</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.client}
              </TableCell>
              <TableCell align="right">{row.product}</TableCell>
              <TableCell align="right">{row.totalValue}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}