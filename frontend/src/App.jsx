import { useState } from 'react'
import { BrowserRouter, Route,Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import MedicinesPage from './pages/Medicines';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/medicines" element={<MedicinesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
