import { eachDayOfInterval, endOfMonth, startOfMonth, getDay, format, isAfter, addMonths, eachMonthOfInterval } from "date-fns";
import { useState } from 'react';

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EventCalendar({ events }) {
    const [date, setDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const startingDayIndex = getDay(firstDayOfMonth);
    const currentDate = new Date();
  // Create an array of each day in the month with slots A and B properties
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    }).map(day => {
        const slotAEvent = events.find(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && event.slot === 'a');
        const slotBEvent = events.find(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && event.slot === 'b');
    return {
        date: day,
        slotA: slotAEvent ? slotAEvent : null,
        slotB: slotBEvent ? slotBEvent : null,
    };
    });

    function handleClick(dayObj, slot) {
        console.log(`Click on ${slot} slot of date ${format(dayObj.date, 'yyyy-MM-dd')}`);
    }

    const handleChange = (e) => {
        setDate(new Date(e.target.value));
    };

    const next6Months = eachMonthOfInterval({
        start: new Date(),  
        end: addMonths(new Date(), 6),
    });

    return (
        <div className="container mx-auto p-4">
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
                    <div className="border-t text-sm p-2 bg-gray-100">{dayObj.slotA.guest}</div>
                ) : (
                    isAfter(dayObj.date, currentDate) ? (
                    <div onClick={() => handleClick(dayObj, 'A')} className="bg-green-200 border-t text-sm p-2">2-6pm</div>
                    ) : (
                    <div className="bg-red-100 border-t p-2 min-h-8"></div>
                    )
                )}
                </div>
                <div>
                {dayObj.slotB ? (
                    <div className="border-t text-sm p-2 bg-gray-100">{dayObj.slotB.guest}</div>
                ) : (
                    isAfter(dayObj.date, currentDate) ? (
                    <div onClick={() => handleClick(dayObj, 'B')} className="bg-green-200 border-t text-sm p-2">7-11pm</div>
                    ) : (
                    <div className="bg-red-100 border-t p-2 min-h-8"></div>
                    )
                )}
                </div>
            </div>
            ))}
            </div>
        </div>
  );
}
