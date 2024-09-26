import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import AdminNav from '../components/AdminNav';

export default function AdminCreateBooking(){
    const location = useLocation();
    const { date, slot } = location.state || {};
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [attendance, setAttendance] = useState('')
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [bookingStatus, setBookingStatus] = useState('provisional')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format date to 'yyyy-MM-dd' for consistency
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');

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
            status: bookingStatus 
        };        
        const token = localStorage.getItem('token')

        const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/admin-create`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
              body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            navigate('/admin/dashboard')

            } else if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login', { state: { errorMsg: 'Session expired, please login' } });
            
            } else {
            console.log('booking failed', data);
            // Extract the array of error messages
            const extractedErrors = data.errors.map(error => `${error.message}`);
            setErrors(extractedErrors);
            }
    }


    return (
        <>
        <AdminNav />
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
            <p className="font-medium text-gray-700 mb-2">Date: {date ? format(date, 'dd MMMM yyyy') : 'No date selected'}</p>
            <p className="font-medium text-gray-700 mb-4">Slot: {slot === 'A' ? '2-6pm' : '7-11pm'}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setFirstName(e.target.value)}
                        maxLength="30"
                        required />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setLastName(e.target.value)}
                        maxLength="30"
                        required />
                </div>
                <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone:</label>
                    <input
                        type="tel"
                        id="telephone"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setTelephone(e.target.value)}
                        />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength="50"
                        required />
                </div>
                <div>
                    <label htmlFor="attendance" className="block text-sm font-medium text-gray-700">Number of Guests:</label>
                    <input
                        type="number"
                        id="attendance"
                        min="1"
                        max="60"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setAttendance(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Event</label>
                    <input
                        type="text"
                        id="reason"
                        maxLength="50"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setReason(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <input
                        type="text"
                        id="notes"
                        maxLength="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setNotes(e.target.value)}
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
                    >
                        <option value="provisional">Provisional</option>
                        <option value="confirmed">Confirmed</option>
                    </select>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Submit</button>
                {errors.length > 0 && (
                        <div className="text-red-600 mt-4 space-y-2">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
            </form>
        </div>
        </>
    );
}