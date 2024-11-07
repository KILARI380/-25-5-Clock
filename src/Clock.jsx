// src/Clock.jsx
import React, { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('Session');

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            toggleMode();
            return mode === 'Session' ? breakLength * 60 : sessionLength * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, breakLength, sessionLength, mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'Session' ? 'Break' : 'Session'));
  };

  const reset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setMode('Session');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="clock">
      <h1>25 + 5 Clock</h1>
      <div className="timer-container">
        <h2 id="timer-label">{mode}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="length-controls">
        <div>
          <h3>Break Length</h3>
          <button onClick={() => setBreakLength((prev) => Math.min(prev + 1, 60))}>+</button>
          <span>{breakLength}</span>
          <button onClick={() => setBreakLength((prev) => Math.max(prev - 1, 1))}>-</button>
        </div>
        <div>
          <h3>Session Length</h3>
          <button onClick={() => setSessionLength((prev) => Math.min(prev + 1, 60))}>+</button>
          <span>{sessionLength}</span>
          <button onClick={() => setSessionLength((prev) => Math.max(prev - 1, 1))}>-</button>
        </div>
      </div>
    </div>
  );
}

export default Clock;
