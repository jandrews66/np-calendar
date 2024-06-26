import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from "date-fns";

export default function BookingForm(){
    const location = useLocation();
    const { date, slot } = location.state || {};
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [attendees, setAttendees] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        const formData = { date, slot, firstName, lastName, telephone, email, attendees }
        console.log(formData)
    }


    return (
        <div>
            <p>Selected Date: {date ? format(date, 'yyyy-MM-dd') : 'No date selected'}</p>
            <p>Selected Slot: {slot === 'A' ? `2-6pm` : '7-11pm'}</p>
            <form onSubmit={handleSubmit}>  
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label htmlFor="telephone">Telephone:</label>
                <input
                    type="tel"
                    id="telephone"
                    onChange={(e) => setTelephone(e.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="attendees">Number of Guests:</label>
                <input
                    type="number"
                    id="attendees"
                    onChange={(e) => setAttendees(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}