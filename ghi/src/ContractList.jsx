import React, { useState, useEffect } from 'react'
import { useDeleteContractMutation, useGetContractQuery, useGetEquipmentQuery, useGetJobSiteQuery } from './app/apiSlice'
import './App.css'
import ContractListMap from './ContractListMap'

const ContractList = () => {
    const [deleteContract] = useDeleteContractMutation();
    const { data: contractList, isLoading, isError } = useGetContractQuery();
    const { data: equipmentList, isEquipmentLoading, isEquipmentError } = useGetEquipmentQuery();
    const { data: jobSiteList, isJobSiteLoading, isJobSiteError } = useGetJobSiteQuery();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [deletedContract, setDeletedContract] = useState(null);

    useEffect(() => {
        let timeout
        if (showSuccess) {
            timeout = setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        }

        return () => clearTimeout(timeout)
    }, [showSuccess])

    const handleDelete = (contractId) => {
        setDeletedContract(contractId)
        setShowConfirmation(true)
    }

    const confirmDelete = () => {
        deleteContract(deletedContract)
        setShowConfirmation(false)
        setShowSuccess(true)
    }

    if (isLoading || isEquipmentLoading || isJobSiteLoading) {
        return <div>Loading...</div>
    }

    if (isError || isEquipmentError || isJobSiteError) {
        return <div>Error fetching storage sites.</div>
    }

    if (!contractList || contractList.length === 0) {
        return <div>No contracts to display.</div>
    }

    const contractsWithJobSiteInfo = contractList.map((contract) => {
    const matchingJobSite = jobSiteList?.find((jobSite) => jobSite.id === contract.job_site_id);
        return {
            id: contract.id,
            formatted_address: matchingJobSite ? matchingJobSite.job_address : 'Address not found',
        };
    });

    return (
        <div className=" flex">
            <div className="flex-1 mr-4 container mt-8 p-8 max-w-xl px-20 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6">Contract List</h1>
                {showSuccess && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>The contract has been successfully deleted.</p>
                    </div>
                )}
                <ul>
                    <div className="max-h-[42rem] overflow-y-scroll">
                    {contractList.map((contract) => {
                        const matchingEquipment = equipmentList?.filter((equipment) => equipment.id === contract.equipment_id);
                        const matchingJobSite = jobSiteList?.filter((jobSite) => jobSite.id === contract.job_site_id);
                        return (
                            <li key={contract.id} className="mb-4">
                                <div className="border border-gray-300 bg-white rounded-md p-4">
                                    <div className="p-4">
                                        <h1 className="text-l font-semibold mb-2">Equipment:</h1>
                                        {matchingEquipment.map((equipment) => (
                                            <div key={equipment.id}>
                                                <p className="text-gray-600 pt-6">Name: {equipment.model_name}</p>
                                                <p className="text-gray-600 pb-4">Serial Number: {equipment.serial_number}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {matchingJobSite.map((jobSite) => (
                                    <div key={jobSite.id}>
                                        <h2 className="text-xl font-semibold mb-2">Job Site: {jobSite.name}</h2>
                                        <p className="text-gray-600 py-4">Address: {jobSite.job_address}</p>
                                        <p className="text-gray-600 pb-4">Point of Contact: {jobSite.job_poc}</p>
                                    </div>
                                    ))}
                                    <p className="text-gray-600 pt-6">Start Date: {contract.start_date}</p>
                                    <p className="text-gray-600 pb-4">End Date: {contract.end_date}</p>
                                    <button
                                        onClick={() => handleDelete(contract.id)}
                                        className="max-w-[15rem] bg-dark-orange text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        Delete Contract
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                    </div>
                </ul>
                {showConfirmation && (
                    <div className="z-10 inset-0 ">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                                Confirm Delete
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Are you sure you want to delete this contract?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        onClick={confirmDelete}
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
            <div className="flex-1 pl-8 pt-10">
                <ContractListMap contractList={contractsWithJobSiteInfo} />

            </div>
        </div>
    );
};

export default ContractList;
