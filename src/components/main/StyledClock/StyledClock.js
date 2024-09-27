import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyledClock.css';

const StyledClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Etc/UTC');
        const currentTime = new Date(response.data.datetime);
        setTime(currentTime.toLocaleTimeString()); // Get the formatted local time
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    // Fetch time initially and every second
    fetchTime();
    const intervalId = setInterval(fetchTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="styled-clock">
      <p>{time}</p>
    </div>
  );
};

export default StyledClock;
