import { useEffect, useState } from 'react';
import { useLoginMutation } from './app/apiSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ login, loginStatus, isLoading ] = useLoginMutation();

    useEffect(() => {
        if (loginStatus.isSuccess) navigate('/');
        if (loginStatus.isError) {
            setErrorMessage(loginStatus.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStatus])

    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            username,
            password
        });
    }
    if (isLoading) return <div>Loading...</div>
    return(
         <div className="container mx-auto mt-8 p-8 bg-white max-w-md rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            {errorMessage && <div className='container mx-auto mt-8 p-8 bg-red-500 text-white max-w-md rounded shadow-md'>
                <p>Incorrect username or password</p>
            </div>}
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Submit</button>
            </form>
        </div>
    )
}

export default Login
