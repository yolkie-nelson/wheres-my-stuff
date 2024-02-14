import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateContractMutation } from './app/apiSlice'
import { useGetEquipmentQuery, useGetJobSiteQuery } from './app/apiSlice'

const CreateContractForm = () => {
    const [formData, setFormData] = useState({
        equipment_id: '',
        job_site_id: '',
        start_date: '',
        end_date: '',
        description: '',
    })
    const [showSuccess, setShowSuccess] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { data: equipment } = useGetEquipmentQuery()
    const { data: jobSites } = useGetJobSiteQuery()

    const [createContract, { isLoading }] = useCreateContractMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createContract(formData).unwrap()
            setFormData({
                equipment_id: '',
                job_site_id: '',
                start_date: '',
                end_date: '',
                description: '',
            })
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        } catch (err) {
            console.error('Failed to create contract:', err)
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Contract</h1>
            {showSuccess && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Success!</p>
                    <p>Yay! We are making Money!</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="equipment_id" className="block text-gray-600 text-sm font-semibold mb-2">
                        Equipment
                    </label>
                    <select
                        id="equipment_id"
                        name="equipment_id"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.equipment_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Equipment</option>
                        {equipment &&
                            equipment.map((equip) => (
                                <option key={equip.id} value={equip.id}>
                                    {` ${equip.id} - ${equip.model_name} - ${equip.serial_number} `}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="job_site_id" className="block text-gray-600 text-sm font-semibold mb-2">
                        Job Site
                    </label>
                    <select
                        id="job_site_id"
                        name="job_site_id"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.job_site_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Job Site</option>
                        {jobSites &&
                            jobSites.map((site) => (
                                <option key={site.id} value={site.id}>
                                    {`Job-site ${site.job_name} - ${site.id}`}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="start_date" className="block text-gray-600 text-sm font-semibold mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.start_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="end_date" className="block text-gray-600 text-sm font-semibold mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.end_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-600 text-sm font-semibold mb-2">
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Create Contract
                </button>
            </form>
        </div>
    )
}

export default CreateContractForm
