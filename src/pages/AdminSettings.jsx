import AdminNav from '../components/AdminNav';
import { useState, useEffect } from 'react'

export default function AdminSettings(){

    const [email, setEmail] = useState('')
    const [allEmails, setAllEmails] = useState([])

    useEffect(() => {
        fetch('https://np-calendar-api-production.up.railway.app/staff')
            .then((response) => response.json())
            .then((data) => {
                setAllEmails(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setAllEmails]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://np-calendar-api-production.up.railway.app/staff/create', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
              body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok){
            setAllEmails((prevEmails) => [...prevEmails, data]);
            setEmail(''); // Clear the input

        } else {
            console.log("Failed to add email")
        }
    }

    const handleDelete = async (id) => {
        console.log(id)

        const response = await fetch(`https://np-calendar-api-production.up.railway.app/staff/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok){
            setAllEmails(allEmails.filter((email) => email._id !== id));
        } else {
            console.log("Failed to delete email" + data)
        }
    }
    return(
        <>
        <AdminNav/>
        <div className="flex p-6 items-center justify-center">
            <form className="p-8 rounded-lg shadow-md flex flex-col min-w-80" onSubmit={handleSubmit}>
                <label htmlFor="email">Enter email:</label>
                <input
                    className="w-full p-1 border border-gray-300 rounded"
                    type="email"
                    id="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white my-1 p-1 rounded hover:bg-blue-600 transition duration-200 px-4 mb-4 ">Add</button>
            </form>
        </div>
        <div className="container mx-auto p-4">
        {allEmails.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                {allEmails.map((email, index) => (
                <div 
                    className="max-w-fit bg-gray-100 text-sm p-2 m-1 border rounded flex items-center justify-between" 
                    key={index}>{email.email}
                    <button 
                        onClick={() => handleDelete(email._id)}
                        className="bg-red-600 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full ml-2">
                        ×                    
                    </button>
                </div>

            ))}
            </div>

        ) : (<p>There are no emails</p>)
        }
        </div>

        </>
    )
}