import { useState } from 'react';
import { useGetEquipmentQuery, useGetEquipmentTypeQuery, useGetStorageSiteQuery } from "./app/apiSlice.js";
import './App.css';

const EquipmentList = () => {
    const { data: equipmentList, isLoading: equipmentLoading } = useGetEquipmentQuery();
    const { data: equipmentTypes, isLoading: equipmentTypesLoading } = useGetEquipmentTypeQuery();
    const { data: storageSites, isLoading: storageSitesLoading } = useGetStorageSiteQuery();
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

    return (
        <div className="w-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Equipment List</h1>
            <div className="flex items-center mb-4">
                <label htmlFor="typeFilter" className="mr-2">Filter by Type:</label>
                <select
                    id="typeFilter"
                    className="border p-2"
                    value={selectedType || ''}
                    onChange={(e) => setSelectedType(e.target.value ? parseInt(e.target.value) : null)}
                >
                    <option value="">All Types</option>
                    {equipmentTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>
            <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 mb-4"
            />
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
                            <td className="py-2 px-4 border-b">{equipment.model_name}</td>
                            <td className="py-2 px-4 border-b">{equipment.description}</td>
                            <td className="py-2 px-4 border-b">{equipment.serial_number}</td>
                            <td className="py-2 px-4 border-b">
                                {storageSites?.find(site => site.id === equipment.storage_site_id).location_address}
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
    );
};

export default EquipmentList;
