import { useState } from 'react'
import { BrowserRouter, Route,Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import MedicinesPage from './pages/Medicines';
import HumidityDashboard from './pages/HumidityDashboard';
import ReportsPage from './pages/Reports';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path='/humidity' element={<HumidityDashboard/>}/>
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
