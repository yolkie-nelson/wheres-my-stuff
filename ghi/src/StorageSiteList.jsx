import React, { useState, useEffect } from 'react'
import { useGetStorageSiteQuery, useDeleteStorageSiteMutation, useGetEquipmentQuery } from './app/apiSlice'
import './App.css'
import StorageSiteMap from './StorageSiteMap'
import { CSVLink } from "react-csv";

const StorageSiteList = () => {
    const [deleteStorageSite] = useDeleteStorageSiteMutation();
    const { data: storageSites, isLoading, isError } = useGetStorageSiteQuery();
    const { data: equipmentList, isEquipmentLoading, isEquipmentError } = useGetEquipmentQuery();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [deletedStorageSite, setDeletedStorageSite] = useState(null);

    useEffect(() => {
        let timeout
        if (showSuccess) {
            timeout = setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        }

        return () => clearTimeout(timeout)
    }, [showSuccess])

    const handleDelete = (storageSiteId) => {
        setDeletedStorageSite(storageSiteId)
        setShowConfirmation(true)
    }

    const confirmDelete = () => {
        deleteStorageSite(deletedStorageSite)
        setShowConfirmation(false)
        setShowSuccess(true)
    }

    if (isLoading || isEquipmentLoading) {
        return <div>Loading...</div>
    }

    if (isError || isEquipmentError) {
        return <div>Error fetching storage sites.</div>
    }

    if (!storageSites || storageSites.length === 0) {
        return <div>No storage sites to display.</div>
    }

    return (
        <div className=" flex pl-20 pt-10">
            <div className="flex-1 mr-4 container bg-white mt-8 p-8 max-w-xl px-10 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6">Warehouse List</h1>
                {showSuccess && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>The warehouse has been successfully deleted.</p>
                    </div>
                )}
                <ul>
                    <div className="max-h-[42rem] overflow-y-scroll">
                    {storageSites?.map((storageSite) => {
                        const matchingEquipment = equipmentList?.filter((equipment) => equipment.storage_site_id === storageSite.id);
                        return (
                            <li key={storageSite.id} className="mb-4">
                                <div className="border border-gray-300 bg-white rounded-md p-4">
                                    <h2 className="text-xl font-semibold mb-2">Warehouse Number: {storageSite.warehouse_number}</h2>
                                    <p className="text-gray-600 py-4">Address: {storageSite.location_address}</p>
                                    <p className="text-gray-600 pb-4">Point of Contact: {storageSite.point_of_contact}</p>
                                    <button
                                        onClick={() => handleDelete(storageSite.id)}
                                        className="max-w-[15rem] bg-dark-orange text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        Delete Storage Site
                                    </button>
                                    <div className="p-4">
                                        <h1 className="text-l font-semibold mb-2">Equipment at this Location:</h1>
                                        {matchingEquipment.map((equipment) => (
                                            <div key={equipment.id}>
                                                <p className="text-gray-600 pt-6">Name: {equipment.model_name}</p>
                                                <p className="text-gray-600 pb-4">Serial Number: {equipment.serial_number}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                    </div>
                </ul>
            </div>
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
                                        <p className="text-sm text-gray-500">Are you sure you want to delete this storage site?</p>
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
            <div className="flex-1 pl-8 pt-10">
                <StorageSiteMap
                    storageSites={storageSites.map((storageSite) => ({
                        id: storageSite.id,
                        formatted_address: storageSite.location_address,
                    }))}
                />
            </div>
        </div>
    );
};

export default StorageSiteList;
