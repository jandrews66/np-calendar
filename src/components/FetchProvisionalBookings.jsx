import { useEffect } from 'react'

export default function FetchProvisionalBookings({setBookings, setLoading}) {


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/bookings/provisional`)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [setBookings, setLoading]);
}