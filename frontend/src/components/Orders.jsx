import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { useEffect,useState } from 'react';
import axios from 'axios';

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
  const [data,setData] = useState([]);

  useEffect(()=>{
      axios.get(import.meta.env.VITE_SERVER_URL+'/meds-storage').then((response)=>{
        setData(response.data);
        console.log(response.data);
      });
  },[])
  
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
            <TableCell>Manufactured Date</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Preferred Temp in C</TableCell>
            <TableCell>Preferred Humidity</TableCell>
            <TableCell>Preferred Light Intensity</TableCell>
            {/* <TableCell align="right">Quantity</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row?.med_id}>
              <TableCell>{row?.med_id}</TableCell>
              <TableCell>{row?.med_name}</TableCell>
              <TableCell>{row?.manufacturer}</TableCell>
              <TableCell>{row?.storage_id}</TableCell>
              <TableCell>{new Date(row?.mfd).toLocaleString()}</TableCell>
              <TableCell>{new Date(row?.expd).toLocaleString()}</TableCell>
              <TableCell>{row?.pref_min_temp} - {row?.pref_max_temp}</TableCell>
              <TableCell>{row?.pref_min_hum} - {row?.pref_max_hum}</TableCell>
              <TableCell>{row?.pref_min_light} - {row?.pref_max_light}</TableCell>
              {/* <TableCell align="right">{`${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}