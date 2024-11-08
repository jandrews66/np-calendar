import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import '../PhoneInputCustom.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (telephone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(telephone));
    } catch (error) {
      return false;
    }
};

export default function UserCreateBooking() {
    const location = useLocation();
    const { date, slot } = location.state || {};
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [attendance, setAttendance] = useState('');
    const [reason, setReason] = useState('');
    const [errors, setErrors] = useState([]);
    const [minSpend, setMinSpend] = useState('');
    const [rentalFee, setRentalFee] = useState('');

    const isValid = isPhoneValid(telephone);
    const phoneInputRef = useRef(null); // Create a ref for the PhoneInput


    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault(); 
        if (!isValid){
            setErrors(["Please enter a valid telephone number and try again"])
            phoneInputRef.current.focus(); // Focus on PhoneInput if validation fails
            return
        }
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
            minSpend,
            rentalFee
        };

        try {
            console.log(formData)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/user-create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                navigate('/confirmation', { state: { booking: data } });
            } else {
                console.log('Booking failed:', data);
                setErrors(data.error ? [data.error] : ["An unexpected error occurred."]); // Improved error handling

            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    function navigateBack(){
        window.history.back();
    }

    function calculateFees(){
        // Thur-Sun evening slots in December have a $1750 min spend
        if (slot === 'B' && date.getMonth() === 11 && (date.getDay() > 3 || date.getDay() === 0)){
            setMinSpend('1750')
            setRentalFee('500')
        } else if (slot === 'B'){
            setMinSpend('1500')
            setRentalFee('500')
        } else {
            setMinSpend('1000')
            setRentalFee('500')
        }     
    }

    useEffect(()=> {
        calculateFees();
    })
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md flex justify-start">
                <button 
                    className="bg-white font-medium text-gray-700 shadow-sm rounded-md text-sm px-2 mb-4 py-1 hover:bg-emerald-600 hover:text-white hover:shadow-md"
                    onClick={navigateBack}
                >
                    <ArrowBackIcon />
                </button>
            </div>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">Submit Your Booking Request</h2>
                <p className="mt-2 text-lg text-gray-600">Please fill in the details below</p>
            </div>

            <div className="w-full max-w-md bg-white px-8 py-6 shadow-lg rounded-lg">
                <div className="text-center bg-emerald-600 py-2">
                <p className="text-white font-light">Date: <span className="font-medium">{date ? format(date, 'dd MMMM yyyy') : 'No date selected'} </span></p>
                <p className="text-white font-light">Time slot: <span className="font-medium">{slot === 'A' ? '2-6pm' : '7-11pm'}</span></p>
                <p className="text-white font-light">Minimum spend: <span className="font-medium">${minSpend}</span></p>
                <p className="text-white font-light">Rental fee: <span className="font-medium">${rentalFee}</span></p>

                </div>
                <hr className="my-4"></hr>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => setFirstName(e.target.value)}
                            maxLength="30"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => setLastName(e.target.value)}
                            maxLength="30"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
                        <PhoneInput
                            defaultCountry="ca"
                            id="telephone"
                            value={telephone}
                            onChange={(telephone) => setTelephone(telephone)}
                            inputClassName="w-full !h-10 !text-base "
                            className="my-1 "
                            ref={phoneInputRef}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength="50"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="attendance" className="block text-sm font-medium text-gray-700">Number of Guests</label>
                        <input
                            type="number"
                            id="attendance"
                            min="10"
                            max="60"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => setAttendance(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Event</label>
                        <input
                            type="text"
                            id="reason"
                            minLength="3"
                            maxLength="50"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                required
                                control={<Checkbox color="primary" />}
                                label={
                                    <a href="https://www.northpointbrewing.com/event-terms" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">
                                        I have read and I accept the event terms and conditions found here.
                                    </a>
                                }
                            />
                        </FormGroup>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                        Submit
                    </button>
                    {errors.length > 0 && (
                        <div className="text-red-600 mt-4 space-y-2">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
