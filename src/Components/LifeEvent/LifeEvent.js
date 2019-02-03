import React from 'react';

const LifeEvent = ({ event, onEventHighlight }) => {
  return (
    <div>
      <button onClick={() => onEventHighlight(event.id)}>{event.title}</button>
    </div>
  );
};

export default LifeEvent;
