import { useState } from 'react'
import {addDays, subDays} from "date-fns"
import EventCalendar from "./components/EventCalendar"
import './index.css'

function App() {

  return (
    <>
      <div>
        <EventCalendar/>
      </div>
    </>
  )
}

export default App
