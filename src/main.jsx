import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookingForm from './components/BookingForm.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UserCalendar from './pages/UserCalendar.jsx'

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
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
