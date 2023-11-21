import React, { useState, useEffect } from 'react';
import '../Styling/Footer.css'

function Footer() {
    const [events, setEvents] = useState([
      { id: 1001, status: 'on', received_at: '2023-11-17 10:00:00' },
      { id: 1002, status: 'off', received_at: '2023-11-17 10:15:00' },
      { id: 1003, status: 'on', received_at: '2023-11-17 10:30:00' },
      { id: 1004, status: 'off', received_at: '2023-11-17 10:45:00' },
      { id: 1005, status: 'on', received_at: '2023-11-17 11:00:00' }
  ]);

  const [data, setData] = useState([]);
  const [lastBook, setLastBook] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
        fetch("http://localhost:8000/api/books/")
            .then(response => response.json())
            .then(data => {
                let parsedData = JSON.parse(data);
                if (parsedData.length > 0) {
                    const lastElement = parsedData.slice(-1)[0];
                    const lastFive = parsedData.slice(-5);
                    setLastBook(lastFive);
                    console.log("Last Element:", lastFive);
                } else {
                    console.log("No books received");
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, 2000); // Refresh every 2000 

    return () => clearInterval(intervalId); // Cleanup on unmount
}, []);




    return (
        <div className="footer">
            {lastBook && lastBook.length > 0 ? (
                <table className="footer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Received At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...lastBook].reverse().map((book, index) => (
                            <tr key={index}>
                                <td>{book.pk ?? 'No ID available'}</td>
                                <td>{book.fields.status ?? 'No status available'}</td>
                                <td>{book.fields.received_at ? new Date(book.fields.received_at).toLocaleString() : 'No date available'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Event to display</p>
            )}
        </div>


    );
}

export default Footer;
