import { useState } from 'react';
import FetchProvisionalBookings from '../components/FetchProvisionalBookings';
import { format, parseISO } from "date-fns";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';

export default function ViewBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const confirmBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Not token found')
                localStorage.removeItem('token')
                navigate('/login')
            }
            const response = await fetch(`http://localhost:3000/booking/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookingStatus: 'confirmed' })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Booking updated', data);
                navigate(0)
            } else {
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
                        <h1 className="text-4xl text-center py-10">Booking Requests</h1>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2">Date</th>
                                    <th className="px-2 py-2">Slot</th>
                                    <th className="px-2 py-2">First Name</th>
                                    <th className="px-2 py-2">Last Name</th>
                                    <th className="px-2 py-2">Telephone</th>
                                    <th className="px-2 py-2">Email</th>
                                    <th className="px-2 py-2">Attendance</th>
                                    <th className="px-2 py-2">Status</th>
                                    <th className="px-2 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td className="border px-2 py-2">{format(parseISO(booking.date), 'dd/MM/yy')}</td>
                                        <td className="border px-2 py-2">{booking.slot === 'A' ? '2-6pm' : '7-11pm'}</td>
                                        <td className="border px-2 py-2">{booking.first_name}</td>
                                        <td className="border px-2 py-2">{booking.last_name}</td>
                                        <td className="border px-2 py-2">{booking.telephone}</td>
                                        <td className="border px-2 py-2">{booking.email}</td>
                                        <td className="border px-2 py-2 ">{booking.attendance}</td>
                                        <td className="border px-2 py-2">{booking.booking_status}</td>
                                        <td className="border px-2 py-2">
                                            {booking.booking_status === 'provisional' && (
                                                <button
                                                    className="bg-green-600 text-white px-2 py-1 rounded"
                                                    onClick={() => confirmBooking(booking._id)}
                                                >
                                                    Confirm
                                                </button>
                                            )}
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