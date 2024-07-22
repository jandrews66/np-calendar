import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { format, parseISO } from "date-fns";
import DeleteDialog from '../components/DeleteDialog.jsx'

export default function BookingPage() {
    const [booking, setBooking] = useState({});
    const [originalBooking, setOriginalBooking] = useState({});
    const { bookingId } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [attendance, setAttendance] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:3000/booking/${bookingId}`, {
            mode: 'cors',
            dataType: 'json',
        })
        .then((response) => response.json())
        .then((data) => {
            setBooking(data);
            setOriginalBooking(data); // Store the original booking data
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setTelephone(data.telephone);
            setEmail(data.email);
            setAttendance(data.attendance);
            setBookingStatus(data.booking_status);
        })
        .catch((error) => console.error(error));
    }, [bookingId]);

    const handleEditClick = () => {
        if (!disabled) {
            // If canceling, reset the form fields to the original values
            setFirstName(originalBooking.first_name);
            setLastName(originalBooking.last_name);
            setTelephone(originalBooking.telephone);
            setEmail(originalBooking.email);
            setAttendance(originalBooking.attendance);
            setBookingStatus(originalBooking.booking_status);
        }
        setDisabled(!disabled);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { 
            firstName, 
            lastName, 
            telephone, 
            email, 
            attendance, 
            bookingStatus
        };

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('No token found')
                localStorage.removeItem('token')
                navigate('/login')
            }
            const response = await fetch(`http://localhost:3000/booking/${bookingId}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Post updated', data);
                navigate(0)
            } else {
                console.log('Update failed', data)
            }
        } catch (error) {
            console.error('Error', error)
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            const response = await fetch(`http://localhost:3000/booking/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Booking deleted successfully');
                navigate('/admin/dashboard');
            } else {
                console.log('Delete failed');
            }
        } catch (error) {
            console.error('Error deleting booking', error);
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
            <p className="font-medium text-gray-700 mb-2">Date: {booking.date ? format(parseISO(booking.date), 'dd MMMM yyyy') : 'Loading...'}</p>
            <p className="font-medium text-gray-700 mb-4">Slot: {booking.slot === 'A' ? '2-6pm' : '7-11pm'}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone:</label>
                    <input
                        type="tel"
                        id="telephone"
                        value={telephone}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="attendance" className="block text-sm font-medium text-gray-700">Number of Guests:</label>
                    <input
                        type="number"
                        id="attendance"
                        value={attendance}
                        min="1"
                        max="60"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setAttendance(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="booking_status" className="block text-sm font-medium text-gray-700">Booking Status:</label>
                    <select
                        id="booking_status"
                        value={bookingStatus}
                        onChange={(e) => setBookingStatus(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        required
                        disabled={disabled}
                    >
                        <option value="provisional">Provisional</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <button
                    type="button"
                    onClick={handleEditClick}
                    className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-md ${disabled ? 'bg-emerald-600  hover:bg-emerald-700 ' : 'bg-red-600  hover:bg-red-700 '} `}
                >
                    {disabled ? 'Edit' : 'Cancel'}
                </button>
                {!disabled && (
                    <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md shadow-md hover:bg-emerald-700 ">
                        Save
                    </button>
                )}
                {booking.booking_status === "cancelled" && (
                    <DeleteDialog handleDelete={handleDelete} />
                )}
            </form>
        </div>
    );
}
