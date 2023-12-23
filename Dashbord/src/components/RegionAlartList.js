import React, { useState, useEffect } from 'react';

function RegionAlartList() {
    const [lastBook, setLastBook] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch("http://localhost:8000/api/fetch_single_data/")
                .then(response => response.json())
                .then(data => {
                    let parsedData = JSON.parse(data);
                    console.log("data", parsedData);
                    if (parsedData.length > 0) {
                        setLastBook(parsedData);
                    } else {
                        console.log("No data received");
                    }
                })
                .catch(error => console.error("Error fetching data:", error));
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            margin: '20px',
            justifyContent: 'center'
        }}>
            {lastBook.map((book, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: book.fields.value === "1" ? '#4CAF50' : 'rgba(241, 244, 243, 0.5)',
                        color: book.fields.value === "1" ? 'white' : 'black',
                        width: 'calc(50% - 5px)',
                        // padding: '10px',
                        paddingleft:'-5px',
                        padding:'5px',
                        boxSizing: 'border-box',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease-in-out',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.fontWeight = 'bold'; 
                  }}
                  onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.fontWeight = 'normal'; // revert to normal weight
                  }}
              >
                    {book.fields.description}
                </div>
            ))}
        </div>
    );
}

export default RegionAlartList;
