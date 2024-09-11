import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UserCalendar from './pages/UserCalendar.jsx'
import BookingPage from './pages/BookingPage.jsx'
import ViewBookings from './pages/ViewBookings.jsx';
import SearchResults from './pages/SearchResults.jsx';
import UserCreateBooking from './pages/UserCreateBooking.jsx'
import AdminCreateBooking from './pages/AdminCreateBooking.jsx'
import UserConfirmation from './pages/UserConfirmation.jsx';
import AdminSettings from './pages/AdminSettings.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserCalendar />,
  },
  {
    path: "/create",
    element: <UserCreateBooking />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/confirmation",
    element: <UserConfirmation />,
  },
  {
    path: "/admin/create",
    element: <AdminCreateBooking />
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />
  },
  {
    path: "/admin/bookings/:bookingId",
    element: <BookingPage />
  },
  {
    path: "/admin/bookings",
    element: <ViewBookings />
  },
  {
    path: "/admin/search",
    element: <SearchResults />
  },
  {
    path: "/admin/settings",
    element: <AdminSettings />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
