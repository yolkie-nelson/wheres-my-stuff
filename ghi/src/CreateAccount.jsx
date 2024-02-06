import { useState } from 'react'
import { useCreateAccountMutation } from "./app/apiSlice"
import { useNavigate } from 'react-router-dom';


const CreateAccount = () => {
    const navigate = useNavigate();
    const [createAccount, { isLoading, isError }] = useCreateAccountMutation()
    const [formData, setFormData] = useState({
    username: '',
    password: '',
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await (createAccount(formData))
        } catch (err) {
            console.error('Failed to create account:', err)
        }
        navigate('/token')
    }
    if (isLoading) return <div>Loading...</div>
    return(
         <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Your Account</h1>
            {isError && <div className='container mx-auto mt-8 p-8 bg-red-500 text-white max-w-md rounded shadow-md'>
                <p>Unable to create account</p>
                </div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 text-sm font-semibold mb-2">Username Name</label>
                        <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.username}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={formData.password}
                        onChange={handleChange}/>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Create Account</button>
                </form>
        </div>
    )
}

export default CreateAccount;
