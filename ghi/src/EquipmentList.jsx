import { useState } from 'react';
import { useGetContractQuery, useGetEquipmentQuery, useGetEquipmentTypeQuery, useGetJobSiteQuery, useGetStorageSiteQuery } from "./app/apiSlice.js";
import './App.css';
import EquipmentListMap from './EquipmentListMap.jsx';

const EquipmentList = () => {
    const { data: equipmentList, isLoading: equipmentLoading } = useGetEquipmentQuery();
    const { data: equipmentTypes, isLoading: equipmentTypesLoading } = useGetEquipmentTypeQuery();
    const { data: storageSites, isLoading: storageSitesLoading } = useGetStorageSiteQuery();
    const { data: contractList, isLoading: contractsLoading } = useGetContractQuery();
    const { data: jobSites, isLoading: jobSitesIsLoading } = useGetJobSiteQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    if (equipmentLoading || equipmentTypesLoading || storageSitesLoading) {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Loading...</p>
                </header>
            </div>
        )
    }

    const filteredEquipment = equipmentList?.filter((equipment) =>
        (equipment.model_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedType || equipment.equipment_type_id === selectedType))
    ) || [];

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = getTodayDate();
    const activeContracts = contractList?.filter(contract => contract.start_date <= today && contract.end_date >= today);
    const activeJobSiteIds = new Set(activeContracts.map(contract => contract.job_site_id));
    const activeJobSites = jobSites?.filter(jobSite => activeJobSiteIds.has(jobSite.id));
    const activeEquipmentIds = new Set(activeContracts.map(contract => contract.equipment_id));
    const activeEquipment = equipmentList?.filter(equipment => activeEquipmentIds.has(equipment.id));


    return (
        <div className="flex justify-center h-screen pt-10 pr-60">
            <div className="max-w-screen-lg h-min mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold rammetto mb-4">Equipment List</h1>
                <div className="flex mb-4">
                    <div className="flex items-center mr-4">
                        <label htmlFor="typeFilter" className="mr-2">Filter by Type:</label>
                        <select id="typeFilter" className="border p-2" value={selectedType || ''} onChange={(e) => setSelectedType(e.target.value ? parseInt(e.target.value) : null)}>
                            <option value="">All Types</option>
                            {equipmentTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="pt-4">
                        <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border p-2 mb-4"/>
                    </div>
                </div>

                <table className="table-auto bg-white border border-gray-300 shadow-md rounded-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Model Name</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Serial Number</th>
                            <th className="py-2 px-4 border-b">Warehouse</th>
                            <th className="py-2 px-4 border-b">Date Serviced</th>
                            <th className="py-2 px-4 border-b">Equipment Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEquipment.map((equipment) => (
                            <tr key={equipment.id}>
                                <td className="py-2 px-4 border-b">
                                    <a href={`/equipment/${equipment.serial_number}`} className="text-black hover:text-blue-500">{equipment.model_name}</a>
                                </td>
                                <td className="py-2 px-4 border-b">{equipment.description}</td>
                                <td className="py-2 px-4 border-b">{equipment.serial_number}</td>
                                <td className="py-2 px-4 border-b">
                                <a href={`/storagesites`} className="text-blue-600 hover:underline">
                                    {storageSites?.find(site => site.id === equipment.storage_site_id).location_address}
                                </a>
                            </td>
                                <td className="py-2 px-4 border-b">{equipment.date_serviced}</td>
                                <td className="py-2 px-4 border-b">
                                    {equipmentTypes?.find(type => type.id === equipment.equipment_type_id).name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="w-full lg:w-1/3 lg:pl-4">
                <EquipmentListMap
                    equipmentList={activeEquipment}
                    contractList={contractList}
                    jobSites={jobSites}
                    storageSites={storageSites}
                    google={window.google}
                />
            </div> */}
        </div>
    );
};

export default EquipmentList;
