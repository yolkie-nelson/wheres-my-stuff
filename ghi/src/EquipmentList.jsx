import { useState } from 'react';
import { useGetEquipmentQuery } from "./app/apiSlice.js";
import './App.css';

const EquipmentList = () => {
    const { data: equipmentList } = useGetEquipmentQuery();
    // const [searchQuery, setSearchQuery] = useState('');

    // const filteredEquipment = equipmentList.filter((equipment) =>
    //     equipment.model_name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    console.log(equipmentList)
    return (
        <div>
            Hello 
        </div>
        // <div className="w-screen p-4">
        //     <h1 className="text-2xl font-bold mb-4">Equipment List</h1>
        //     <input
        //         type="text"
        //         placeholder="Search equipment..."
        //         value={searchQuery}
        //         onChange={(e) => setSearchQuery(e.target.value)}
        //         className="border p-2 mb-4"
        //     />
        //     <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
        //         <thead>
        //             <tr>
        //                 <th className="py-2 px-4 border-b">Model Name</th>
        //                 <th className="py-2 px-4 border-b">Description</th>
        //                 <th className="py-2 px-4 border-b">Serial Number</th>
        //                 <th className="py-2 px-4 border-b">Storage Site ID</th>
        //                 <th className="py-2 px-4 border-b">Date Serviced</th>
        //                 <th className="py-2 px-4 border-b">Equipment Type Name</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {filteredEquipment.map((equipment) => (
        //                 <tr key={equipment.id}>
        //                     <td className="py-2 px-4 border-b">{equipment.model_name}</td>
        //                     <td className="py-2 px-4 border-b">{equipment.description}</td>
        //                     <td className="py-2 px-4 border-b">{equipment.serial_number}</td>
        //                     <td className="py-2 px-4 border-b">{equipment.storage_site_id}</td>
        //                     <td className="py-2 px-4 border-b">{equipment.date_serviced}</td>
        //                     <td className="py-2 px-4 border-b">{equipment.equipment_type.name}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    );
};

export default EquipmentList;
