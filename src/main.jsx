import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookingForm from './components/BookingForm.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UserCalendar from './pages/UserCalendar.jsx'
import BookingPage from './pages/BookingPage.jsx'
import ViewBookings from './pages/ViewBookings.jsx';
import SearchResults from './pages/SearchResults.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserCalendar />,
  },
  {
    path: "/create",
    element: <BookingForm />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
