import React, { useState, useEffect ,useContext } from 'react';
import '../Styling/Footer.css';
import LastBookContext from './LastBookContext';

function Footer() {
    const [events, setEvents] = useState([
      { id: 1001, status: 'on', received_at: '2023-11-17 10:00:00' },
      { id: 1002, status: 'off', received_at: '2023-11-17 10:15:00' },
      { id: 1003, status: 'on', received_at: '2023-11-17 10:30:00' },
      { id: 1004, status: 'off', received_at: '2023-11-17 10:45:00' },
      { id: 1005, status: 'on', received_at: '2023-11-17 11:00:00' }
  ]);

  const [data, setData] = useState([]);
  const [lastBook, setLastBook] = useState([]);
  const [last_book_element, setLastElementBook] = useState(null);
  const { setLastBookElement } = useContext(LastBookContext);
  

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//         fetch("http://localhost:8000/api/books/")
//             .then(response => response.json())
//             .then(data => {
//                 let parsedData = JSON.parse(data);
//                 if (parsedData.length > 0) {
//                     const lastElement = parsedData.slice(-1)[0];
//                     const lastFive = parsedData.slice(-5);
//                     setLastBook(lastFive);
//                     setLastBookElement(lastElement);
//                     console.log("Last book Element : ",lastElement);
//                 } else {
//                     console.log("No books received");
//                 }
//             })
//             .catch(error => console.error("Error fetching data:", error));
//     }, 2000);

//     return () => clearInterval(intervalId);
// }, []);

useEffect(() => {
    const intervalId = setInterval(() => {
        fetch("http://localhost:8000/api/spindication/")
            .then(response => response.json())
            .then(data => {
                let parsedData = JSON.parse(data);
                if (parsedData.length > 0) {
                    const lastFive = parsedData.slice(-5);
                    // setLastBook(lastFive);
                } else {
                    console.log("No books received");
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, 2000);

    return () => clearInterval(intervalId);
}, []);

useEffect(() => {
    const intervalId = setInterval(() => {
        fetch("http://localhost:8000/api/Controls/")
            .then(response => response.json())
            .then(data => {
                let parsedData = JSON.parse(data);
                if (parsedData.length > 0) {
                    const lastElement = parsedData.slice(-1)[0];
                    // const lastFive = parsedData.slice(-5);
                    // setLastBook(lastFive);
                    console.log("lastELE",lastElement);
                    setLastBookElement(lastElement);
                } else {
                    console.log("No books received");
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, 2000);

    return () => clearInterval(intervalId);
}, []);

useEffect(() => {
    const intervalId = setInterval(() => {
        fetch("http://localhost:8000/api/fetchEvent/")
            .then(response => response.json())
            .then(data => {
                console.log("data",data);
                // let parsedData = JSON.parse(data);
                if (data.length > 0) {
                    // const lastFive = data.slice(-5);
                    setLastBook(data);
                } else {
                    console.log("No books received");
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, 2000);

    return () => clearInterval(intervalId);
}, []);




    return (
        <div className="footer">
            {lastBook && lastBook.length > 0 ? (
                <table className="footer-table">
                    <thead>
                    <tr>
                        <th className="col-id">ID</th>
                        <th className="col-timestamp">TimeStamp</th>
                        <th className="col-description"> Description</th>
                        <th className="col-address">Address</th>
                        <th className="col-value">Value</th>
                        <th className="col-topic">topic</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...lastBook].map((book, index) => (
                        <tr key={index}>
                            <td>{book.id ?? 'No ID available'}</td>
                            <td>{book.timestamp ?? 'No timestamp available'}</td>
                            <td>{book.description ?? 'No description available'}</td>
                            <td>{book.ioa ?? 'No ioa available'}</td>
                            <td>{book.value ?? 'No value available'}</td>
                            <td>{book.topic ?? 'No topic available'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>


    );
}

export default Footer;
