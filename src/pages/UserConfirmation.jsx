import { useLocation } from 'react-router-dom';

export default function UserConfirmation() {
    const location = useLocation();
    const { booking } = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-lg p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-semibold mb-4">Booking Request Received</h1>
                <p className="mb-4">{booking.first_name}, thank you for your booking request!</p>
                <p className="mb-4">
                    We have sent an email with instructions to confirm your booking to {booking.email}.
                </p>
                <p className="mb-4">If you have any questions, please don't hesitate to contact us at <strong>events@northpointbrewing.com</strong>.</p>
                <p className="text-blue-600 hover:underline cursor-pointer mt-6"></p>
            </div>
        </div>
    );
}
