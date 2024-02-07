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
import CreateAccount from './CreateAccount'
import EquipmentDetail from './EquipmentDetail'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import JobSiteList from './JobSiteList'
import CreateJobSiteForm from './CreateJobSiteForm'
import Login from './Login'
import CreateEquipmentForm from './CreateEquipmentForm'
import CreateStorageSiteForm from './CreateStorageSiteForm'
import CreateEquipmentTypeForm from './CreateEquipmentTypeForm'

// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

/**
 * This is an example of using JSDOC to define types for your component
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
 *
 * @returns {React.ReactNode}
 */
function App() {
    const { data: account } = useGetTokenQuery()
    // console.log({ account })
    // Replace this App component with your own.
    /** @type {[LaunchInfo | undefined, (info: LaunchInfo) => void]} */
    const [launchInfo, setLaunchInfo] = useState()
    const [error, setError] = useState(null)
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <div className='main-section'>
                    {account && <Sidenav />}
                    <div className='w-screen'>
                        <Routes>
                           {account && <Route path="/" element={<LandingPage />} />}
                            <Route path="/equipment" element={<EquipmentList />} />
                            {account && <Route path="/equipment/create" element={<CreateEquipmentForm />} /> }
                            <Route path="/equipment/:equipmentSerial" element={<EquipmentDetail />} />
                            <Route path="/jobsites" element={<JobSiteList />} />
                            <Route path="/jobsites/create" element={account ? <CreateJobSiteForm /> : <Login /> } />
                            <Route path="/types/create" element={account ? <CreateEquipmentTypeForm/> : <Login />} />
                            {!account && <Route path="/accounts" element={<CreateAccount />} />}
                            {!account && <Route path="/token" element={<Login />} />}
                            {!account && <Route path="/" element={<SplashPage />} />}
                            <Route path="/storagesites/create" element={account ? <CreateStorageSiteForm /> : <Login /> } />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
