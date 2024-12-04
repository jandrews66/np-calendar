import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

export default function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    // on component mount check if any errors passed (used for expired jwts )
    useEffect(() => {
        if (location.state?.errorMsg) {
            setErrors([{ msg: location.state.errorMsg }]);
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const loginData = { username, password }

        const response = await fetch (`${import.meta.env.VITE_API_URL}/users/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful login
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.user._id)
            setLoading(false)
            navigate('/admin/dashboard')
    
            } else {
            // Handle login error
            setErrors([{msg: data.message}] || [{ msg: 'An error occurred' }])
            setLoading(false)
            }
    }
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-5/6 sm:w-1/4 flex flex-col">
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2" >Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                disabled={loading}
                />
            </div>
            <button 
                type="submit" 
                className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 px-4 mb-4 max-w-fit"
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
            {errors.length > 0 && (
            <div className="mb-4">
                {errors.map((error, index) => (
                <div key={index} className="text-red-500 text-sm mb-2">
                    {error.msg}
                </div>
                ))}
            </div>
            )}
            </form>

    </div>
    )
}