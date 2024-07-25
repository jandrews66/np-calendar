import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from "date-fns";
import AdminNav from '../components/AdminNav';

export default function SearchResults(){
    const location = useLocation();
    const { bookings } = location.state || {};
    const navigate = useNavigate();

    function handleClick(id){
        navigate(`/admin/bookings/${id}`)
    }
    return (
        <>
            <AdminNav />
            <h1 className="text-3xl text-center py-6">Search Results</h1>
            <div className="container mx-auto p-6 max-w-4xl">
            {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div className="grid grid-cols-5 p-2 border rounded my-2" key={booking._id}>
                        <p className="">{booking.first_name} {booking.last_name}</p>
                        <p>{format(parseISO(booking.date), 'dd MMMM yyyy')}</p>
                        <p>{booking.slot === 'A' ? '2-6pm' : '7-11pm'}</p>
                        <p>{booking.booking_status}</p>
                        <button onClick={()=> handleClick(booking._id)} className="text-blue-700">View</button>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
        </>

    )
}