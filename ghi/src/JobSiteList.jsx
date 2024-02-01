import React from 'react'
import { useGetJobSiteQuery } from './app/apiSlice'

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
        <div>
            <h1>Job Site List</h1>
            <ul>
                {jobSites.map((jobSite) => (
                    <li key={jobSite.id}>
                        <h2>Job Name: {jobSite.job_name}</h2>
                        <p>Address: {jobSite.job_address}</p>
                        <p>Point of Contact: {jobSite.job_poc}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default JobSiteList
