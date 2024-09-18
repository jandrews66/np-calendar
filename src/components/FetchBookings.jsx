import { useEffect } from 'react'

export default function FetchBookings({setBookings, setLoading}) {


    useEffect(() => {
        fetch('https://np-calendar-api-production.up.railway.app/bookings')
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