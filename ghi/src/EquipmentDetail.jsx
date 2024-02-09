import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOneEquipmentQuery, useGetContractQuery, useGetJobSiteQuery, useDeleteEquipmentMutation } from './app/apiSlice.js';
import './App.css';
import EditEquipmentModal from './EditEquipmentModal.jsx';

const EquipmentDetail = () => {
    const { equipmentSerial } = useParams();
    const { data: equipmentDetail } = useGetOneEquipmentQuery(equipmentSerial);
    const { data: contractList, isLoading: contractIsLoading } = useGetContractQuery();
    const { data: jobSiteList} = useGetJobSiteQuery();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteEquipment] = useDeleteEquipmentMutation();
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);


    const getDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [inputStartDate, setInputStartDate] = useState(getDate());
    const [inputEndDate, setInputEndDate] = useState(getDate());

    if (contractIsLoading) {
        return (
             <div className="App">
                <header className="App-header">
                    <p>Loading......</p>
                </header>
            </div>
        );
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    }

    const confirmDelete = (serialNum) => {
        deleteEquipment(serialNum);
        setShowConfirmation(false);
        setShowSuccess(true);
        navigate("/equipment");
    }

    const isAvailable = () => {
        const isNoContract = contractList?.every(contract => contract.equipment_id !== equipmentDetail.id);

        if (isNoContract) {
            return true;
        }

        for (let i = 0; i < contractList?.length; i++) {
            const contract = contractList[i];
            const contractStartDate = getDate(new Date(contract.start_date));
            const contractEndDate = getDate(new Date(contract.end_date));
            if ((inputStartDate < inputEndDate) && (inputStartDate > contractEndDate || inputEndDate < contractStartDate)) {
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
                {showSuccess && (
                    <div
                        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
                        role="alert"
                    >
                        <p className="font-bold">Success!</p>
                        <p>The equipment has been successfully deleted.</p>
                    </div>
                )}
                <div className="flex flex-row w-m1/3 mx-auto m-20 p-4 bg-white rounded-lg shadow-lg min-w-[38rem]">
                    <div>
                        <div className="image-container">
                            <img src={equipmentDetail.photo} alt="No photo" className="max-w-[20rem]"/>
                        </div>
                        <div className="flex">
                            <div className={isAvailable() ? 'flex w-min availability-card available' : 'flex w-min availability-card unavailable'}>
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
                            <button onClick={() => setShowEditModal(true)} className="edit-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">Edit</button>
                        </div>
                        <div className="flex justify-end">
                            <button onClick= {() => handleDelete()} className="delete-button hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                            {showConfirmation && (
                                <div className="fixed z-10 inset-0 overflow-y-auto">
                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                        <div
                                            className="fixed inset-0 transition-opacity"
                                            aria-hidden="true"
                                        >
                                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                        </div>
                                        <span
                                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                            aria-hidden="true"
                                        >
                                            &#8203;
                                        </span>
                                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                        <h3
                                                            className="text-lg font-medium leading-6 text-gray-900"
                                                            id="modal-title"
                                                        >
                                                            Confirm Delete
                                                        </h3>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                Are you sure you want to delete
                                                                this equipment?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                <button
                                                    onClick= {() => confirmDelete(equipmentSerial)}
                                                    type="button"
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => setShowConfirmation(false)}
                                                    type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <EditEquipmentModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} equipmentDetail={equipmentDetail} />
                <div className="w-2/3 pt-8 pl-32">
                    <div className="m-10">
                        <h1 className="custom-header rammetto">Rental History</h1>
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
                            {contractList
                                .filter(contract => contract.equipment_id === equipmentDetail.id)
                                .map(contract => {
                                    const jobSite = jobSiteList.find(jobSite => jobSite.id === contract.job_site_id);
                                    if (jobSite) {
                                        return (
                                            <tr key={contract.id}>
                                                <td className="py-2 px-4 border-b">{jobSite.job_name}</td>
                                                <td className="py-2 px-4 border-b">{contract.start_date}</td>
                                                <td className="py-2 px-4 border-b">{contract.end_date}</td>
                                                <td className="py-2 px-4 border-b">{contract.description}</td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default EquipmentDetail;
