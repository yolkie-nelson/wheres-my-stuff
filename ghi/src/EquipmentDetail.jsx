import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneEquipmentQuery, useGetOneEquipmentTypeQuery, useGetContractQuery, useGetOneStoragesiteQuery, useGetOneContractQuery } from './app/apiSlice.js';
import './App.css';
import { data } from 'browserslist';

const EquipmentDetail = () => {
    const { equipmentSerial } = useParams();
    const { data: equipmentDetail } = useGetOneEquipmentQuery(equipmentSerial);
    const { data: equipmentType } = useGetOneEquipmentTypeQuery();
    const { data: storageSite } = useGetOneStoragesiteQuery();
    const { data: contractList } = useGetOneContractQuery();
    const [searchQuery, setSearchQuery] = useState('');

    console.log(storageSite)

    if (!equipmentDetail) {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Loading......</p>
                </header>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
            <img src={equipmentDetail.photo} alt="No photo" />
            <h1 className="text-2xl font-bold mb-4">{equipmentDetail.model_name}</h1>
            <p>{equipmentDetail.description}</p>
        </div>
    )



    // const filteredContract = contractList?.filter((contract) =>
    //     contract.start_date >=
    // )
}

export default EquipmentDetail;
