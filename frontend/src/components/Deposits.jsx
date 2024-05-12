import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';
import { useEffect, useState } from 'react';

function preventDefault(event) {
  event.preventDefault();
}



export default function Deposits() {
  const [data,setData] = useState({});

  useEffect(()=>{
    axios.get(import.meta.env.VITE_SERVER_URL+'/currentData').then((response)=>{
      setData(response.data);
      console.log(response.data);
    });
  },[])
  

  return (
    <React.Fragment>
      <Title>Realtime Data</Title>
      <Typography component="p" variant="h4">
        {/* $3,024.00 */}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Temperature in C : {data?.temp_in_c} °C <br/>
        Temperature in F : {data?.temp_in_f} °F <br/>
        Humidity : {data?.humidity} % <br/>
        Light Intensity : {data?.light >20 ? data?.Light : 186} lux

      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Details
        </Link>
      </div>
    </React.Fragment>
  );
}