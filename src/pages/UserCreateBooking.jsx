import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from "date-fns";

export default function UserCreateBooking() {
    const location = useLocation();
    const { date, slot } = location.state || {};
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [attendance, setAttendance] = useState('');
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
            status: "provisional"
        };

        console.log("Submitting form data:", formData);

        try {
            const response = await fetch('http://localhost:3000/booking/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Response received:', data);

            if (response.ok) {
                console.log('Booking created successfully:', data);
                navigate('/confirmation', { state: { booking: data } });
            } else {
                console.log('Booking failed:', data);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };


    return (
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
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone:</label>
                    <input
                        type="tel"
                        id="telephone"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
                        required
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Submit</button>
            </form>
        </div>
    );
}