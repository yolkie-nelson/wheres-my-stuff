import { useState, useRef } from 'react'
import { useCreateJobsiteMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'
import { GoogleApiWrapper } from 'google-maps-react'

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const CreateJobSiteForm = ({ google }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        job_name: '',
        job_address: '',
        job_poc: '',
    })
    const [formattedAddresses, setFormattedAddresses] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const dropdownRef = useRef(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

        if (e.target.name === 'job_address') {
            validateAddress(e.target.value)
        }
    }

    const [createJobSite, { isLoading, isError }] = useCreateJobsiteMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createJobSite(formData)
            navigate('/jobsites')
        } catch (err) {
            console.error('Failed to create job site:', err)
        }
    }

    const validateAddress = async (address) => {
        try {
            const geocoder = new google.maps.Geocoder()
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const formattedAddresses = results.map(
                        (result) => result.formatted_address
                    )
                    setFormattedAddresses(formattedAddresses)
                } else {
                    console.error(
                        'Geocode was not successful for the following reason:',
                        status
                    )
                }
            })
        } catch (error) {
            console.error('Error occurred while geocoding:', error)
        }
    }

    const handleAddressSelect = (selectedAddress) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            job_address: selectedAddress,
        }))
        setShowOptions(false)
    }

    const handleInputFocus = () => {
        setShowOptions(true)
    }

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowOptions(false)
        }, 200)
    }
    return (
        <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create a New Job Site</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="job_name"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Job Name
                    </label>
                    <input
                        type="text"
                        id="job_name"
                        name="job_name"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.job_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="job_address"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Job Address
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="job_address"
                            name="job_address"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={formData.job_address}
                            onChange={handleChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <div
                            ref={dropdownRef}
                            className={`absolute ${
                                showOptions ? 'block' : 'hidden'
                            } z-10 w-full border border-gray-300 rounded-md bg-white`}
                        >
                            {formattedAddresses.map((address, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                                    onClick={() => handleAddressSelect(address)}
                                >
                                    {address}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="job_poc"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Job POC
                    </label>
                    <input
                        type="text"
                        id="job_poc"
                        name="job_poc"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.job_poc}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    disabled={isLoading}
                >
                    Create Job Site
                </button>
                {isError && (
                    <div className="text-red-500 mt-2">
                        Error creating job site
                    </div>
                )}
                {isLoading && (
                    <div className="text-gray-600 mt-2">Loading...</div>
                )}
            </form>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: VITE_GOOGLE_API_KEY,
})(CreateJobSiteForm)
