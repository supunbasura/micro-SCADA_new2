import React, { useState, useEffect } from 'react';
import '../Styling/EventViewer.css';


function EventViewer(){
  const [lastBook, setLastBook] = useState([]);

    useEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;  
      document.body.style.overflow = 'hidden';
      return () => document.body.style.overflow = originalStyle;
    }, []);
    useEffect(() => {
      const handleWheel = (event) => {
          if (event.ctrlKey === true) {
              event.preventDefault();
          }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
          window.removeEventListener('wheel', handleWheel, { passive: false });
      };
  }, []);



  useEffect(() => {
    const intervalId = setInterval(() => {
        fetch("http://localhost:8000/api/Event/")
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
      <div className='EventViewer'>
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
export default EventViewer;