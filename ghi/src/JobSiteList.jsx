import React from 'react'
import { useGetJobSiteQuery } from './app/apiSlice'
import './App.css'

const JobSiteList = () => {
    const { data: jobSites, isLoading, isError } = useGetJobSiteQuery()

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
    <div className="container mt-8 p-8 max-w-md rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Job Site List</h1>
        <ul>
            {jobSites.map((jobSite) => (
                <li key={jobSite.id} className="mb-4">
                    <div className="border border-gray-300 rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Job Name: {jobSite.job_name}
                        </h2>
                        <p className="text-gray-600">
                            Address: {jobSite.job_address}
                        </p>
                        <p className="text-gray-600">
                            Point of Contact: {jobSite.job_poc}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)
    // return (

    //     <div>
    //         <h1>Job Site List</h1>
    //         <ul>
    //             {jobSites.map((jobSite) => (
    //                 <li key={jobSite.id}>
    //                     <h2>Job Name: {jobSite.job_name}</h2>
    //                     <p>Address: {jobSite.job_address}</p>
    //                     <p>Point of Contact: {jobSite.job_poc}</p>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // )
}

export default JobSiteList
