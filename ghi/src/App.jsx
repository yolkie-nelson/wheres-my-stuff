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
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import JobSiteList from './JobSiteList'
import CreateJobSiteForm from './CreateJobSiteForm'
import StorageSiteList from './StorageSiteList'
import Login from './Login'
import CreateEquipmentForm from './CreateEquipmentForm'
import CreateStorageSiteForm from './CreateStorageSiteForm'
import CreateEquipmentTypeForm from './CreateEquipmentTypeForm'
import CreateContractForm from './CreateContractForm'
import ContractList from './ContractList'


const API_HOST = import.meta.env.VITE_API_HOST
const domain = /https:\/\/[^/]+/;
const basename = import.meta.env.VITE_PUBLIC_URL.replace(domain, '');

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    const { data: account } = useGetTokenQuery()
    return (
        <BrowserRouter basename={basename}>
            <div>
                <Nav />
                <div className='main-section flex h-screen'>
                    {account && <Sidenav />}
                    <div className='w-screen'>
                        <Routes>
                            {account && <Route path="/" element={<LandingPage />} />}
                            <Route path="/equipment" element={account ? <EquipmentList />: <Login />} />
                            <Route path="/equipment/:equipmentSerial" element= {account ? <EquipmentDetail /> : <Login />} />
                            <Route path="/types/create" element={account ? <CreateEquipmentTypeForm /> : <Login />} />
                            <Route path="/equipment/create" element={account ? <CreateEquipmentForm /> : <Login />} />
                            <Route path="/jobsites" element={account ? <JobSiteList /> : <Login />} />
                            <Route path="/jobsites/create"element={account ? <CreateJobSiteForm /> : <Login />} />
                            {!account && <Route path="/accounts" element={<CreateAccount />} />}
                            {!account && <Route path="/token" element={<Login />} />}
                            {!account && <Route path="/" element={<SplashPage />} />}
                            <Route path="/about" element={<About />} />
                            <Route path="/storagesites" element={account ? <StorageSiteList /> : <Login />} />
                            <Route path="/storagesites/create" element={account ? <CreateStorageSiteForm /> : <Login />} />
                            <Route path="/contracts/create" element={account ? <CreateContractForm /> : <Login />} />
                            <Route path="/contracts" element={account ? <ContractList /> : <Login />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
