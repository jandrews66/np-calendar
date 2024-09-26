import { useEffect } from 'react'

export default function FetchBookings({setBookings, setLoading}) {


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/bookings`)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [setBookings, setLoading]);
}