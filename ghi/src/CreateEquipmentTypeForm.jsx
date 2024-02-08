import { useState } from 'react'
import { useCreateEquipmentTypeMutation } from "./app/apiSlice"


const CreateEquipmentTypeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const [createEquipmentType, { isLoading, isError }] = useCreateEquipmentTypeMutation()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createEquipmentType(formData)
            setFormData({ name: '' });
            setIsSuccess(true);
        } catch (err) {
            console.error('Failed to create equipment type:', err);
            setIsSuccess(false);
        }
    }
    if (isLoading){
         return <div>Loading...</div>
        }
    return(
         <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Equipment Type</h1>
            {isError && (<div className='container mx-auto mt-8 p-8 bg-red-500 text-white max-w-md rounded shadow-md'>
                <p>Unable to create equipment type</p>
                </div>)}
            {isSuccess && ( <div className='container mx-auto mt-8 p-8 bg-green-500 text-white max-w-md rounded shadow-md'>
                    <p>Equipment type created successfully!</p>
                </div>)}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="Equipment type" className="block text-gray-600 text-sm font-semibold mb-2">Equipment Type Name</label>
                        <input
                        type="text"
                        id="Equipment type"
                        name="name"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.name}
                        onChange={handleChange}/>
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >Create Equipment Type</button>
                </form>
        </div>
    )
}

export default CreateEquipmentTypeForm;
