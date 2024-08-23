import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import FetchBookings from "../components/FetchBookings.jsx";
import Calendar from "../components/Calendar.jsx";

export default function UserCalendar() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    function handleClick(date, slot) {
        console.log(`Click on ${slot} slot of date ${format(date, 'yyyy-MM-dd')}`);
        //user created booking so status is provisional
        navigate('/create', { state: { date, slot } })
    }

    return (
        <>
            <FetchBookings setBookings={setBookings} setLoading={setLoading} />
            <img src="https://e65fa1923424da4ae037.cdn6.editmysite.com/uploads/b/e65fa1923424da4ae03716979c9b8e45ca9d11b00591046b78f81ff742dc7e1c/NPstack_1640802669.png" 
                alt="North Point Brewing Logo" 
                width="200"
                className="mx-auto p-4">
            </img>
            <div className="text-center text-sm p-2">To request a time slot outside of these hours please contact us at events@northpointbrewing.com </div>

            <Calendar bookings={bookings} loading={loading} handleClick={handleClick} showNames={false} />
        </>
    );
}
