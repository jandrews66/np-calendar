import { useState } from 'react'
import { format, addMonths, eachMonthOfInterval } from "date-fns";


export default function MonthSelect(){
    const [month, setMonth] = useState(format(new Date(), 'MMMM'))

    const handleChange = (e) => {
        setMonth(e.target.value)
    }
    const next6Months = eachMonthOfInterval({
        start: new Date(),
        end: addMonths(new Date(), 6)
      })
    
    return (
        <div>
            <select value={month} onChange={(handleChange)}>
            {next6Months.map((month) => (
                <option key={month} value={month}>{format(month, 'MMMM')}</option>
            ))}
            </select>

        </div>
    )
}