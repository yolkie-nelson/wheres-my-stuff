import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneEquipmentQuery, useGetOneEquipmentTypeQuery, useGetContractQuery, useGetOneStoragesiteQuery, useGetJobSiteQuery } from './app/apiSlice.js';
import './App.css';
import { data } from 'browserslist';

const EquipmentDetail = () => {
    const { equipmentSerial } = useParams();
    const { data: equipmentDetail } = useGetOneEquipmentQuery(equipmentSerial);
    const { data: equipmentType } = useGetOneEquipmentTypeQuery();
    const { data: storageSite } = useGetOneStoragesiteQuery();
    const { data: contractList, isLoading: contractIsLoading } = useGetContractQuery();
    const { data: jobSiteList, isLoading: jobIsLoading } = useGetJobSiteQuery();
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
        <div className="flex flex-col">
            <div className="flex m-20">
                <div className="flex flex-row w-m1/3 mx-auto m-20 p-4 bg-white rounded-lg shadow-lg min-w-[38rem]">
                    <div>
                        <div className="image-container">
                            <img src={equipmentDetail.photo} alt="No photo" className="max-w-[20rem]"/>
                        </div>
                        <div className="flex">
                            <div className={isAvailable() ? 'flex w-min availability-card available' : 'flex w-2/3 availability-card unavailable'}>
                                <p>{isAvailable() ? 'Available' : 'Unavailable'}</p>
                            </div>
                            <div className="flex w-auto pl-6 pt-2">
                                <p>Search Availability:</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <div>
                                <label htmlFor="startDate" className="pr-4">Start Date:</label>
                                <input className="pl-6 date-input"
                                    type="date"
                                    id="startDate"
                                    value={inputStartDate}
                                    onChange={(e) => setInputStartDate(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="endDate" className="pr-6">End Date:</label>
                                <input className="pl-6 date-input"
                                type="date"
                                id="endDate"
                                value={inputEndDate}
                                onChange={(e) => setInputEndDate(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pl-4 pt-20">
                        <h1 className="text-2xl font-bold mb-4">{equipmentDetail.model_name}</h1>
                        <p>{equipmentDetail.description}</p>
                        <p className="pt-4 font-bold">Serial Number: {equipmentDetail.serial_number}</p>
                        <div className="pt-16 flex justify-end">
                            <button className="edit-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">Edit</button>
                        </div>
                        <div className="flex justify-end">
                            <button className="delete-button hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                        </div>
                    </div>
                </div>


                <div className="w-2/3 pt-8 pl-32">
                    <div className="m-10">
                        <h1 className="custom-header">Rental History</h1>
                    </div>
                    <table className="rental-table">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Job Name</th>
                                <th className="py-2 px-4 border-b">Start Date</th>
                                <th className="py-2 px-4 border-b">End Date</th>
                                <th className="py-2 px-4 border-b">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contractList.map(contract => {
                                const jobSite = jobSiteList?.find(jobSite => jobSite.id === contract.job_site_id);
                                const jobName = jobSite ? jobSite.job_name : 'N/A';
                                return (
                                    <tr key={contract.id}>
                                        <td className="py-2 px-4 border-b">{jobName}</td>
                                        <td className="py-2 px-4 border-b">{contract.start_date}</td>
                                        <td className="py-2 px-4 border-b">{contract.end_date}</td>
                                        <td className="py-2 px-4 border-b">{contract.description}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
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
