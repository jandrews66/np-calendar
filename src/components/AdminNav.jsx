import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminNav() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(query);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                localStorage.removeItem('token');
                navigate('/login');
            }
            const response = await fetch(`http://localhost:3000/bookings/search?q=${encodeURIComponent(query)}`, {
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
    
    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/admin/dashboard" className="text-white">Dashboard</Link>
                    <Link to="/admin/bookings" className="text-white">Booking Requests</Link>

                </div>
                <div className="flex items-center gap-5">
                    <form onSubmit={handleSubmit}>
                        <input 
                            id="searchBar" 
                            onChange={(e)=> setQuery(e.target.value)}
                        >
                        </input>
                        <button 
                            className="bg-slate-300 px-2 "
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                    <button className= "text-white px-2 rounded">Logout</button>
                </div>
            </div>
        </nav>
    )
}