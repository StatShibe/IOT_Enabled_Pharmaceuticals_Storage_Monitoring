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

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({data, title}) {
  
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small" style={{}}>
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
            <TableRow key={row?.med_id} style={{}}>
              <TableCell>{row?.med_id}</TableCell>
              <TableCell>{row?.med_name}</TableCell>
              <TableCell>{row?.manufacturer}</TableCell>
              <TableCell>{row?.storage_id}</TableCell>
              <TableCell>{new Date(row?.mfd).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(row?.expd).toLocaleDateString()}</TableCell>
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