import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

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
        <nav className="bg-gray-800 p-2 sm:p-4">
            <div className="flex gap-2 justify-between">
                <div className="flex items-center gap-2 sm:gap-6">
                    <Link to="/admin/dashboard" className="text-white text-sm sm:text-base">Dashboard</Link>
                    <Link to="/admin/bookings" className="text-white text-sm sm:text-base">Requests</Link>

                </div>
                <div className="flex items-center gap-2 sm:gap-5">
                    <form className="flex"onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="w-full border-2 rounded-md px-2 rounded-r-none focus:outline-none focus:border-indigo-400" 
                            id="searchBar" 
                            onChange={(e)=> setQuery(e.target.value)}
                        >
                        </input>
                        <button 
                            className="bg-indigo-700 text-white py-1 px-2 rounded-r-md"
                            type="submit"
                        >
                            <SearchIcon sx={{ color: '#FFFFFF', cursor: 'pointer'}}/>

                        </button>
                    </form>
                    <Link to="/admin/settings">
                        <SettingsIcon sx={{ color: '#FFFFFF', cursor: 'pointer'}}/>
                    </Link>
                    <button 
                        className= "text-white pr-2 rounded"
                        onClick={handleLogout}
                    >
                        <LogoutIcon sx={{ color: '#FFFFFF', cursor: 'pointer'}}/>

                    </button>
                </div>
            </div>
        </nav>
    )
}