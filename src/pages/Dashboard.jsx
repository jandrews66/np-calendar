import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FetchBookings from "@/components/FetchBookings.jsx";
import Calendar from "@/components/Calendar";
import AdminNav from "@/components/AdminNav";

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

    return (
        <>
            <AdminNav />
            <FetchBookings setBookings={setBookings} setLoading={setLoading} />
            <Calendar bookings={bookings} loading={loading} handleClick={handleClick} handleEdit={handleEdit} showNames={true} />
        </>
    );
}
