import React, { useState, useRef } from 'react'
import { useCreateStorageSiteMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

import { Map, GoogleApiWrapper } from 'google-maps-react'

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const CreateStorageSiteForm = ({ google }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        warehouse_number: '',
        location_address: '',
        point_of_contact: '',
    })
    const [formattedAddresses, setFormattedAddresses] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const dropdownRef = useRef(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

        if (e.target.name === 'location_address') {
            validateAddress(e.target.value)
        }
    }

    const [createStorageSite, { isLoading, isError }] =
        useCreateStorageSiteMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createStorageSite(formData)
        } catch (err) {
            console.error('Failed to create storage site:', err)
        }
    }

    const validateAddress = async (address) => {
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
    }

    const handleAddressSelect = (selectedAddress) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            location_address: selectedAddress,
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
            <h1 className="text-2xl font-bold mb-6">
                Create a New Storage Site
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="warehouse_number"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Warehouse Number
                    </label>
                    <input
                        type="number"
                        id="warehouse_number"
                        name="warehouse_number"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.warehouse_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="location_address"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Location Address
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="location_address"
                            name="location_address"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={formData.location_address}
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
                        htmlFor="point_of_contact"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Point of Contact
                    </label>
                    <input
                        type="text"
                        id="point_of_contact"
                        name="point_of_contact"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.point_of_contact}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    disabled={isLoading}
                >
                    Create Storage Site
                </button>
                {isError && (
                    <div className="text-red-500 mt-2">
                        Error creating storage site
                    </div>
                )}{' '}
                {isLoading && (
                    <div className="text-gray-600 mt-2">Loading...</div>
                )}{' '}
            </form>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: VITE_GOOGLE_API_KEY,
})(CreateStorageSiteForm)
