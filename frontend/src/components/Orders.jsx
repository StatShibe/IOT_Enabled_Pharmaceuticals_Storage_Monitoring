import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    'MDS12401',
    'Razo-D',
    'Dr.Reddy',
    'A004',
    '20',
  ),
  createData(
    1,
    'MDS12402',
    'Paracetamol 500mg',
    'GSK',
    'A001',
    '100',
  ),
  createData(2, 'MDS12403', 'DiCloWin plus', 'Wings Pharma', 'A003', '20'),
  createData(
    3,
    'MDS12404',
    'Cyclopam',
    'Indoco',
    'A005',
    '30',
  ),
  createData(
    4,
    'MDS12405',
    'Loparet',
    'Retort Laboratories',
    'A012',
    '15',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Medicine in Stock</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Medicine ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Storage ID</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more medicines
      </Link>
    </React.Fragment>
  );
}