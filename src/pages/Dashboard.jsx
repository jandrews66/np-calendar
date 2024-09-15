import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FetchBookings from "../components/FetchBookings.jsx";
import Calendar from "../components/Calendar";
import AdminNav from "../components/AdminNav";

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function handleClick(date, slot) {
        //admin is creating booking so status is confirmed
        navigate('/admin/create', { state: { date, slot } })
    }

    function handleEdit(booking){
        console.log(booking)
        navigate(`/admin/bookings/${booking._id}`);

    }

    const duplicateBookings = bookings.filter((booking, _, allBookings) => {
        const { date, slot } = booking;
        // Count how many bookings share the same date
        const count = allBookings.filter(b => b.date === date && b.slot === slot).length;
        // Return only bookings where the count is more than 1
        return count > 1;
      });

    function handleNavigate(id){
        navigate(`/admin/bookings/${id}`)

    }

    return (
        <>
            <AdminNav />
            <FetchBookings setBookings={setBookings} setLoading={setLoading} />
            {duplicateBookings.length > 0 ? 
                <div className="text-center my-8">
                    <h2 className="text-lg font-semibold text-gray-800">Duplicate Bookings</h2>
                    <div className="space-y-4">
                        {duplicateBookings.map((booking) => (
                            <button 
                                onClick={() => handleNavigate(booking._id)} 
                                key={booking._id} 
                                className="bg-red-500 text-white px-4 py-2 rounded-md mx-1 hover:bg-red-600"
                            >
                                {booking.last_name} - {new Date(booking.date).toLocaleDateString()}
                            </button>
                        ))}
                    </div>
                </div> 
                : <div></div>}
            {bookings.length > 0 && !loading ?
            <Calendar bookings={bookings} loading={loading} handleClick={handleClick} handleEdit={handleEdit} showNames={true} />
                : <div className="text-center">Unable to fetch availability</div>
            }
        </>
    );
}
