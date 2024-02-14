import { useState } from 'react'
import {
    useCreateEquipmentMutation,
    useGetStorageSiteQuery,
    useGetEquipmentTypeQuery,
} from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

const CreateEquipmentForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        model_name: '',
        description: '',
        serial_number: '',
        storage_site_id: '',
        date_serviced: '',
        photo: '',
        equipment_type_id: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { data: storageSites } = useGetStorageSiteQuery()
    const { data: equipmentTypes } = useGetEquipmentTypeQuery()

    const [createEquipment, { isLoading }] =
        useCreateEquipmentMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createEquipment(formData)
            navigate('/equipment')
        } catch (err) {
            console.error('Failed to create equipment:', err)
        }
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Equipment</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="model_name"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Model Name
                    </label>
                    <input
                        type="text"
                        id="model_name"
                        name="model_name"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.model_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="serial_number"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Serial Number
                    </label>
                    <input
                        type="text"
                        id="serial_number"
                        name="serial_number"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.serial_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="date_serviced"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Date Serviced
                    </label>
                    <input
                        type="date"
                        id="date_serviced"
                        name="date_serviced"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.date_serviced}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="photo"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Photo
                    </label>
                    <input
                        type="text"
                        id="photo"
                        name="photo"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.photo}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="storage_site_id"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Storage Site
                    </label>
                    <select
                        id="storage_site_id"
                        name="storage_site_id"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.storage_site_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Storage Site</option>
                        {storageSites &&
                            storageSites.map((site) => (
                                <option key={site.id} value={site.id}>
                                    {`Warehouse No. ${site.warehouse_number} - ${site.location_address}`}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="equipment_type_id"
                        className="block text-gray-600 text-sm font-semibold mb-2"
                    >
                        Equipment Type
                    </label>
                    <select
                        id="equipment_type_id"
                        name="equipment_type_id"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.equipment_type_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Equipment Type</option>
                        {equipmentTypes &&
                            equipmentTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Create Equipment
                </button>
            </form>
        </div>
    )
}

export default CreateEquipmentForm
