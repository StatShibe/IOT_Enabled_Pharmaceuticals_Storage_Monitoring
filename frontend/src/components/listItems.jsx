import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import MedicalInformation from '@mui/icons-material/MedicalInformation'
import SensorsRounded from '@mui/icons-material/SensorsRounded'
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={()=>{window.location.href= '/';}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={()=>{window.location.href= '/medicines';}}>
      <ListItemIcon>
        <MedicalInformation />
      </ListItemIcon>
      <ListItemText primary="Medicines" />
    </ListItemButton>
    <ListItemButton onClick={()=>{window.location.href='/humidity'}}>
      <ListItemIcon>
        <SensorsRounded />
      </ListItemIcon>
      <ListItemText primary="Sensors Monitoring" />
    </ListItemButton>
    <ListItemButton onClick={()=> window.location.href = '/reports'}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </React.Fragment>
);