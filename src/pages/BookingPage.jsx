import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import DeleteDialog from '../components/DeleteDialog.jsx'
import AdminNav from '../components/AdminNav';

export default function BookingPage() {
    const [booking, setBooking] = useState({});
    const [originalBooking, setOriginalBooking] = useState({});
    const { bookingId } = useParams();
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [attendance, setAttendance] = useState('');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    function formatDate(d) {
        const date = moment.utc(d); // Create a moment object in UTC
        const formattedDate = date.format('YYYY-MM-DD'); // Convert to specified timezone and format
    
        return formattedDate; // Outputs date in the specified timezone
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
            mode: 'cors',
            dataType: 'json',
        })
        .then((response) => response.json())
        .then((data) => {
            setBooking(data);
            setOriginalBooking(data); // Store the original booking data
            setDate(formatDate(data.date))
            setSlot(data.slot)
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setTelephone(data.telephone);
            setEmail(data.email);
            setAttendance(data.attendance);
            setReason(data.reason);
            setNotes(data.notes);
            setBookingStatus(data.booking_status);
        })
        .catch((error) => console.error(error));
    }, [bookingId]);

    const handleEditClick = () => {
        if (!disabled) {
            // If canceling, reset the form fields to the original values
            setDate(formatDate(originalBooking.date))
            setSlot(originalBooking.slot)
            setFirstName(originalBooking.first_name);
            setLastName(originalBooking.last_name);
            setTelephone(originalBooking.telephone);
            setEmail(originalBooking.email);
            setAttendance(originalBooking.attendance);
            setReason(originalBooking.reason);
            setNotes(originalBooking.notes);
            setBookingStatus(originalBooking.booking_status);
        }
        setDisabled(!disabled);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(date).toISOString()
        const formData = { 
            date: formattedDate,
            slot,
            firstName, 
            lastName, 
            telephone, 
            email, 
            attendance,
            reason,
            notes, 
            bookingStatus
        };

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('No token found')
                localStorage.removeItem('token')
                navigate('/login')
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                navigate(0)
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login', { state: { errorMsg: 'Session expired, please login' } });
            } else {
                console.log('Update failed', data)
                setError(data.error);
            }    
        }
         catch (error) {
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Booking deleted successfully');
                navigate('/admin/dashboard');
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login', { state: { errorMsg: 'Session expired, please login' } });
            }
            else {
                console.log('Delete failed');
            }
        } catch (error) {
            console.error('Error deleting booking', error);
        }
    };
    
    return (
        <>
        <AdminNav />
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setDate(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="slot" className="block text-sm font-medium text-gray-700">Slot:</label>
                    <select
                        id="slot"
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        required
                        disabled={disabled}
                    >
                        <option value="A">2-6pm</option>
                        <option value="B">7-11pm</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
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
                        className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
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
                        className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setTelephone(e.target.value)}
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
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
                        className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setAttendance(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Event</label>
                        <input
                            type="text"
                            id="reason"
                            value={reason} 
                            minLength="3"
                            maxLength="20"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            onChange={(e) => setReason(e.target.value)}
                            disabled={disabled}

                        />
                </div>
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <input
                            type="notes"
                            id="notes"
                            value={notes} 
                            maxLength="50"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={disabled}

                        />
                </div>
                <div>
                    <label htmlFor="booking_status" className="block text-sm font-medium text-gray-700">Booking Status:</label>
                    <select
                        id="booking_status"
                        value={bookingStatus}
                        onChange={(e) => setBookingStatus(e.target.value)}
                        className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        required
                        disabled={disabled}
                    >
                        <option value="provisional">Provisional</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
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
        </>
    );
}
