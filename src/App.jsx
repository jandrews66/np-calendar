import { useState } from 'react'
import {addDays, subDays} from "date-fns"
import EventCalendar from "./components/EventCalendar"
import './index.css'

function App() {

  const events = [
    { date: addDays(new Date(), 5), slot: "b", guest: "Susan"},
    { date: addDays(new Date(), 7), slot: "a", guest: "Bill"},
    { date: addDays(new Date(), 3), slot: "a", guest: "Jez"},

  ]
  return (
    <>
      <div>
        <EventCalendar 
        events={events}
        />
      </div>
    </>
  )
}

export default App
