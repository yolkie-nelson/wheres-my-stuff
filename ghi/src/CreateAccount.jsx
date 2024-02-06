import { useCreateAccountMutation } from "./app/apiSlice"

const CreateAccount = () => {
    const { data: createAccount } = useCreateAccountMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(createAccount(formData)).unwrap()
        } catch (e) {
            console.error('Failed to create account:', e)
        }
    }

    return(
         <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Your Account</h1>
             <form onSubmit={handleSubmit}></form>
            <form action="#" method="post">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-600 text-sm font-semibold mb-2">Username Name</label>
                    <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                    <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                </div>
                <a href="/" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Create Account</a>
            </form>
        </div>
    )
}

export default CreateAccount
