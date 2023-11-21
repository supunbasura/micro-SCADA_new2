// Example content of Events.js
const Events = () => {
    const events = [
      { id: 1, message: 'Event 1 occurred' },
      // ... more events
    ];
  
    return (
      <div className="events">
        {events.map(event => (
          <div key={event.id}>{event.message}</div>
        ))}
      </div>
    );
  };
  
  export default Events;