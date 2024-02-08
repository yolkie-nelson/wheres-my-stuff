import React, { useState } from 'react'
import { useCreateJobsiteMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

const CreateJobSiteForm = () => {
    const navigate = useNavigate();
        const [formData, setFormData] = useState({
        job_name: '',
        job_address: '',
        job_poc: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [createJobSite, { isLoading, isError }] = useCreateJobsiteMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await (createJobSite(formData))

            // Want to redirect to the jobsitelist here
        } catch (err) {
            console.error('Failed to create job site:', err)
        }
        navigate('/jobsites')
    }

    return (
  <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
    <h1 className="text-2xl font-bold mb-6">Create a New Job Site</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="job_name" className="block text-gray-600 text-sm font-semibold mb-2">Job Name</label>
        <input type="text" id="job_name" name="job_name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" value={formData.job_name} onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label htmlFor="job_address" className="block text-gray-600 text-sm font-semibold mb-2">Job Address</label>
        <input type="text" id="job_address" name="job_address" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" value={formData.job_address} onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label htmlFor="job_poc" className="block text-gray-600 text-sm font-semibold mb-2">Job POC</label>
        <input type="text" id="job_poc" name="job_poc" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" value={formData.job_poc} onChange={handleChange} />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue" disabled={isLoading}>Create Job Site</button>
      {isError && <div className="text-red-500 mt-2">Error creating job site</div>} {/* Display error message if API request fails */}
      {isLoading && <div className="text-gray-600 mt-2">Loading...</div>} {/* Display loading spinner while API request is in progress */}
    </form>
  </div>
)
    }

    export default CreateJobSiteForm
