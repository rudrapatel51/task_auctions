import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register/Register'
import VehicleOptions from './components/vechicle/VechicleOptions';
import UserInfo from './components/userDetails/UserInfo';
import ClientState from './components/client/ClientState';
import UserForm from "./components/userDetails/UserForm"


function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} /> 
        <Route path="/vehicle-options" element={<VehicleOptions />} />
        <Route path="/fetch-user-info/:userId" element={<ClientState />} />
        <Route path="/client" element={<ClientState />} />
        <Route path="/userForm" element={<UserForm/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
