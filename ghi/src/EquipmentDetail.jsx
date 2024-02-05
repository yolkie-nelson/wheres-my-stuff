import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneEquipmentQuery, useGetOneEquipmentTypeQuery, useGetContractQuery, useGetOneStoragesiteQuery } from './app/apiSlice.js';
import './App.css';
import { data } from 'browserslist';

const EquipmentDetail = () => {
    const { equipmentSerial } = useParams();
    const { data: equipmentDetail } = useGetOneEquipmentQuery(equipmentSerial);
    const { data: equipmentType } = useGetOneEquipmentTypeQuery();
    const { data: storageSite } = useGetOneStoragesiteQuery();
    const { data: contractList, isLoading: contractIsLoading } = useGetContractQuery();
    const [searchQuery, setSearchQuery] = useState('');

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [inputStartDate, setInputStartDate] = useState(getTodayDate());
    const [inputEndDate, setInputEndDate] = useState(getTodayDate());

    if (contractIsLoading) {
        return (
             <div className="App">
                <header className="App-header">
                    <p>Loading......</p>
                </header>
            </div>
        );
    };

    const isAvailable = () => {
        const isNoContract = contractList?.every(contract => contract.equipment_id !== equipmentDetail.id);

        if (isNoContract) {
            return true;
        }

        for (let i = 0; i < contractList?.length; i++) {
            const contract = contractList[i];
            const startDate = new Date(inputStartDate);
            const endDate = new Date(inputEndDate);
            const contractStartDate = new Date(contract.start_date);
            const contractEndDate = new Date(contract.end_date);

            if (startDate >= contractEndDate || endDate <= contractStartDate) {
                return true;
            }
        }
        return false;
    };

    console.log(isAvailable())

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
            <p>{isAvailable() ? 'Available' : 'Unavailable'}</p>
        </div>
    )



    // const filteredContract = contractList?.filter((contract) =>
    //     contract.start_date >=
    // )
}

export default EquipmentDetail;


    // useEffect(() => {
    //     if (contractList && contractList.length > 0) {
    //         setInputStartDate(getTodayDate());
    //         setInputEndDate(getTodayDate());
    //     }
    // }, [contractList]);
