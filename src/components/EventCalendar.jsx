import { eachDayOfInterval, endOfMonth, startOfMonth, getDay, format, isAfter, addMonths, eachMonthOfInterval } from "date-fns";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FetchBookings from './fetchBookings'

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EventCalendar() {
    const [date, setDate] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const startingDayIndex = getDay(firstDayOfMonth);
    const currentDate = new Date();
    const navigate = useNavigate();

    console.log(bookings)
  // Create an array of each day in the month with slots A and B properties
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    }).map(day => {
        const slotAEvent = bookings.find(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && event.slot === 'A');
        const slotBEvent = bookings.find(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && event.slot === 'B');
    return {
        date: day,
        slotA: slotAEvent ? slotAEvent : null,
        slotB: slotBEvent ? slotBEvent : null,
    };
    });

    function handleClick(date, slot) {
        console.log(`Click on ${slot} slot of date ${format(date, 'yyyy-MM-dd')}`);
        navigate('/create', { state: { date, slot } })
    }

    const handleChange = (e) => {
        setDate(new Date(e.target.value));
    };

    // get next 6 months for month dropdown menu
    const next6Months = eachMonthOfInterval({
        start: new Date(),  
        end: addMonths(new Date(), 6),
    });

    return (
        <div className="container mx-auto p-8 min-w-[350px] max-w-[860px]">
            <FetchBookings setBookings={setBookings} setLoading={setLoading} />
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
            <>
                <div className="text-center mb-6">
                    <select value={date.toISOString()} onChange={handleChange}>
                        {next6Months.map((month, index) => (
                        <option key={index} value={month.toISOString()}>{format(month, 'MMMM yyyy')}</option>
                                ))}
                    </select>
                </div>
                    <div className="grid grid-cols-7 gap-2">
                            {weekdays.map((day) => (
                                <div key={day} className="font-semi-bold text-center">{day}</div>
                            ))}
                            {Array.from({ length: startingDayIndex }).map((_, index) => (
                                <div key={`empty-${index}`}></div>
                            ))}
                            {daysInMonth.map((dayObj, index) => (
                                <div key={index} className={`border rounded-md text-center`}>
                                    <div className="bg-slate-100 p-1">{format(dayObj.date, "d")}</div>
                                    <div>
                                        {dayObj.slotA ? (
                                            <div className="border-t text-sm p-2 bg-red-100">Unavailable</div>
                                        ) : (
                                            isAfter(dayObj.date, currentDate) ? (
                                                <button onClick={() => handleClick(dayObj.date, 'A')} className="bg-green-200 w-full h-full border-t text-sm p-2 hover:bg-green-400">2-6pm</button>
                                            ) : (
                                                <div className="border-t text-sm p-2 bg-red-100">Unavailable</div>
                                            )
                                        )}
                                    </div>
                                    <div>
                                        {dayObj.slotB ? (
                                            <div className="border-t text-sm p-2 bg-red-100">Unavailable</div>
                                        ) : (
                                            isAfter(dayObj.date, currentDate) ? (
                                                <button onClick={() => handleClick(dayObj.date, 'B')} className="bg-green-200 w-full h-full border-t text-sm p-2 hover:bg-green-400">7-11pm</button>
                                            ) : (
                                                <div className="border-t text-sm p-2 bg-red-100">Unavailable</div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
            </>
            )}
        </div>
  );
}
