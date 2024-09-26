import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';

export default function AdminNav() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                localStorage.removeItem('token');
                navigate('/login');
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/search?q=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
    
            if (response.ok) {
                navigate('/admin/search', { state: { bookings: data } })
                console.log('Search result', data);
            } else {
                console.log('Search failed', data);
            }
        } catch (error) {
            console.error('Error', error);
        }
    }
    
    function handleLogout(){
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/admin/dashboard" className="text-white">Dashboard</Link>
                    <Link to="/admin/bookings" className="text-white">Booking Requests</Link>

                </div>
                <div className="flex items-center gap-5">
                    <form className="flex"onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="w-full border-2 rounded-md px-2 rounded-r-none focus:outline-none focus:border-indigo-400" 
                            id="searchBar" 
                            onChange={(e)=> setQuery(e.target.value)}
                        >
                        </input>
                        <button 
                            className="bg-indigo-700 text-white py-1 px-4 rounded-r-md"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                    <Link to="/admin/settings">
                        <SettingsIcon sx={{ color: '#FFFFFF', cursor: 'pointer'}}/>
                    </Link>
                    <button 
                        className= "text-white pr-2 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}