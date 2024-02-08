// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useState, useEffect } from 'react'
import ErrorNotification from './ErrorNotification'
import Nav from './Nav.jsx'
import './App.css'
import Sidenav from './Sidenav'
import { useGetTokenQuery } from './app/apiSlice.js'
import LandingPage from './LandingPage'
import EquipmentList from './EquipmentList'
import SplashPage from './SplashPage'
import About from './About'
import CreateAccount from './CreateAccount'
import EquipmentDetail from './EquipmentDetail'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import JobSiteList from './JobSiteList'
import CreateJobSiteForm from './CreateJobSiteForm'
import Login from './Login'
import CreateEquipmentForm from './CreateEquipmentForm'
import CreateStorageSiteForm from './CreateStorageSiteForm'
import CreateEquipmentTypeForm from './CreateEquipmentTypeForm'
import CreateContractForm from './CreateContractForm'


const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    const { data: account } = useGetTokenQuery()
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <div className='main-section flex h-screen'>
                    {account && <Sidenav />}
                    <div className='w-screen'>
                        <Routes>
                            {account && <Route path="/" element={<LandingPage />} />}
                            {account && <Route path="/equipment" element={<EquipmentList />} />}
                            {account && <Route path="/equipment/create" element={<CreateEquipmentForm />} /> }
                            {account && <Route path="/equipment/:equipmentSerial" element={<EquipmentDetail />} />}
                            {account && <Route path="/jobsites" element={<JobSiteList />} /> }
                            {account && <Route path="/jobsites/create" element={<CreateJobSiteForm />} /> }
                            {!account && <Route path="/accounts" element={<CreateAccount />} />}
                            {!account && <Route path="/token" element={<Login />} />}
                            {!account && <Route path="/" element={<SplashPage />} />}
                            {!account && <Route path="/about" element={<About />} />}
                            {account && <Route path="/storagesites/create" element={<CreateStorageSiteForm />} /> }
                            {account && <Route path="/contracts/create" element={<CreateContractForm />} /> }
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
