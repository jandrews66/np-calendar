import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FetchBookings from "../components/FetchBookings.jsx";
import Calendar from "../components/Calendar.jsx";

export default function UserCalendar() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    function handleClick(date, slot) {
        navigate('/create', { state: { date, slot } })
    }

    return (
        <>
            <FetchBookings setBookings={setBookings} setLoading={setLoading} />
            {bookings.length > 0 && !loading ?
                <Calendar bookings={bookings} loading={loading} handleClick={handleClick} showNames={false} />
                : <div className="text-center">Fetching availability...</div>
            }
        </>
    );
}
