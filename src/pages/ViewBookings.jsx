import { useState } from 'react';
import FetchProvisionalBookings from '../components/FetchProvisionalBookings';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import moment from 'moment-timezone';


export default function ViewBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function formatDate(d) {
        const date = moment.utc(d); // Create a moment object in UTC
        const formattedDate = date.format('DD-MMM-yy'); // Convert to specified timezone and format
    
        return formattedDate; // Outputs date in the specified timezone
    }

    const handleBooking = async (bookingId, status) => {

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Not token found')
                localStorage.removeItem('token')
                navigate('/login')
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/handle/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ booking_status: status })
            });

            const data = await response.json();

            if (response.ok) {
                navigate(0)
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login', { state: { errorMsg: 'Session expired, please login' } });
            }
            else {
                console.log('Update failed', data);
            }        
        } catch (error) {
            console.error('Error', error);
        }

    }

    
    return (
        <>
            <AdminNav />
            <FetchProvisionalBookings setBookings={setBookings} setLoading={setLoading} />
            {!loading ? (
                bookings.length > 0 ? (
                    <div className="overflow-x-auto max-w-6xl mx-auto px-10">
                        <h1 className="text-3xl text-center py-10">Booking Requests</h1>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="text-sm px-2 py-2">Date</th>
                                    <th className="text-sm px-2 py-2">Slot</th>
                                    <th className="text-sm px-2 py-2">First Name</th>
                                    <th className="text-sm px-2 py-2">Last Name</th>
                                    <th className="text-sm px-2 py-2">Email</th>
                                    <th className="text-sm px-2 py-2">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id}
                                        onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                                        className="hover:bg-slate-100 hover:cursor-pointer"
                                    >
                                        <td className="border px-2 py-2 whitespace-nowrap">{formatDate(booking.date)}</td>
                                        <td className="border px-2 py-2 whitespace-nowrap">{booking.slot === 'A' ? '2-6pm' : '7-11pm'}</td>
                                        <td className="border px-2 py-2">{booking.first_name}</td>
                                        <td className="border px-2 py-2">{booking.last_name}</td>
                                        <td className="border px-2 py-2">{booking.email}</td>
                                        <td className="border px-2 py-2 ">{booking.attendance}</td>
                                        <td className="border p-1 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button
                                                className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBooking(booking._id, 'confirmed')}
                                                }
                                                >
                                                Accept
                                                </button>
                                                <button
                                                    className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleBooking(booking._id, 'cancelled')}
                                                    }
                                                >
                                                    Decline
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No provisional bookings available</div>
                )
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}