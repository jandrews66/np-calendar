import { useEffect } from 'react'

export default function FetchBookings({setBookings, setLoading}) {


    useEffect(() => {
        fetch('https://np-calendar-api-production.up.railway.app/bookings')
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [setBookings, setLoading]);
}