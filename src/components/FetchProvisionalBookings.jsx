import { useEffect } from 'react'

export default function FetchProvisionalBookings({setBookings, setLoading}) {


    useEffect(() => {
        fetch('https://np-calendar-api-production.up.railway.app/bookings/provisional')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
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