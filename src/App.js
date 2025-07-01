import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 10), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = ms % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  return (
    <div className="app">
      <h1>Stopwatch</h1>
      <div className="stopwatch-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap} disabled={!isRunning}>Lap</button>
      </div>
      <div className="laps">
        <h2>Laps</h2>
        {laps.length === 0 ? (
          <p>No laps recorded</p>
        ) : (
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;