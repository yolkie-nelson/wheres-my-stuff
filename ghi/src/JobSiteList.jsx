import React, { useState, useEffect } from 'react'
import { useGetJobSiteQuery, useDeleteJobsiteMutation } from './app/apiSlice'
import './App.css'
import JobSiteMap from './JobSiteMap'
import { CSVLink } from "react-csv";

const JobSiteList = () => {
    const [deleteJobsite] = useDeleteJobsiteMutation()
    const { data: jobSites, isLoading, isError } = useGetJobSiteQuery()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showFailure, setShowFailure] = useState(false)
    const [deletedJobSite, setDeletedJobSite] = useState(null)

    useEffect(() => {
        let timeout
        if (showSuccess || showFailure) {
            timeout = setTimeout(() => {
                setShowSuccess(false)
                setShowFailure(false)
            }, 6000)
        }

        return () => clearTimeout(timeout)
    }, [showSuccess || showFailure])

    const handleDelete = (jobSiteId) => {
        setDeletedJobSite(jobSiteId)
        setShowConfirmation(true)
    }

    const confirmDelete = async () => {
        const response = await deleteJobsite(deletedJobSite)
        if(response.error && response.error.status === 422) {
            setShowFailure(true)
        } else {
            setShowSuccess(true)
        }
        setShowConfirmation(false)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error fetching job sites.</div>
    }

    if (!jobSites || jobSites.length === 0) {
        return <div>No job sites to display.</div>
    }

    return (
        <div className="container mt-8 p-8 max-w-xl">
            <div>
                <CSVLink
                    data={jobSites}
                    filename={'jobiste.csv'}
                    className="export-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 "
                >
                    Download File
                </CSVLink>
            </div>
            <h1 className="text-2xl font-bold mb-6">Job Site List</h1>
            {showSuccess && (
                <div
                    className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
                    role="alert"
                >
                    <p className="font-bold">Success!</p>
                    <p>The job site has been successfully deleted.</p>
                </div>
            )}
            {showFailure && ( // Render failure banner when showFailure state is true
                <div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                    role="alert"
                >
                    <p className="font-bold">Failed!</p>
                    <p>Failed to delete the job site!  Is a contract assigned to this job site?</p>
                </div>
            )}
            <div className="flex ">
                <ul className="flex-1 mr-4">
                    <div className="max-h-[48rem] overflow-y-scroll">
                        {jobSites.map((jobSite) => (
                            <li key={jobSite.id} className="mb-4">
                                <div className="border border-gray-300 rounded-md p-4">
                                    <h1 className="text-xl font-bold text-center">
                                        {jobSite.id}
                                    </h1>
                                    <h2 className="text-xl font-semibold mb-2">
                                        Job Name: {jobSite.job_name}
                                    </h2>
                                    <p className="text-gray-600">
                                        Address: {jobSite.job_address}
                                    </p>
                                    <p className="text-gray-600">
                                        Point of Contact: {jobSite.job_poc}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(jobSite.id)}
                                        className="w-full bg-dark-orange text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        Delete Job Site
                                    </button>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
                <div>
                    <JobSiteMap
                        jobSites={jobSites.map((jobSite) => ({
                            id: jobSite.id,
                            formatted_address: jobSite.job_address,
                        }))}
                    />
                </div>
            </div>
            {showConfirmation && (
                <div className="z-10 inset-0 ">
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
                                                this job site?
                                            </p>
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
    )
}

export default JobSiteList
