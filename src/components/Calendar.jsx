import { eachDayOfInterval, endOfMonth, startOfMonth, getDay, format, isAfter, addMonths, eachMonthOfInterval, startOfDay } from "date-fns";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ bookings, loading, handleClick, handleEdit, showNames }) {
    const [date, setDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const startingDayIndex = getDay(firstDayOfMonth);
    const currentDate = (new Date());

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    }).map(day => {
        const utcDay = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate())); //format date to UTC to match mongodb timezone
        const formattedDay = utcDay.toISOString(); // Get the ISO string in the format "YYYY-MM-DDT00:00:00.000Z" to compare against mongodb dates  

        const slotAEvent = bookings.find(
            event => event.date === formattedDay && event.slot === 'A'
        );
        const slotBEvent = bookings.find(
            event => event.date === formattedDay && event.slot === 'B'
        );      
        return {
            date: day,
            slotA: slotAEvent ? slotAEvent : null,
            slotB: slotBEvent ? slotBEvent : null,
        };
    });

    const handleChange = (e) => {
        setDate(startOfDay(new Date(e.target.value)));
    };

    const next6Months = eachMonthOfInterval({
        start: new Date(),  
        end: addMonths(new Date(), 6),
    });

    return (
        <div className="container mx-auto p-8 min-w-[350px] max-w-[860px]">
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
                                            <div className={`border-t text-sm p-2 ${dayObj.slotA.booking_status === "provisional" ?  'bg-yellow-200' : 'bg-red-100' }`}>
                                                {showNames ? <button onClick={() => handleEdit(dayObj.slotA)}>{dayObj.slotA.last_name}</button> : <p>Unavailable</p>}
                                            </div>    
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
                                            <div className={`border-t text-sm p-2 ${dayObj.slotB.booking_status === "provisional" ?  'bg-yellow-200' : 'bg-red-100' }`}>
                                                {showNames ? <button onClick={() => handleEdit(dayObj.slotB)}>{dayObj.slotB.last_name}</button> : <p>Unavailable</p>}
                                            </div>
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
