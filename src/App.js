import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let myInterval;
    if (start) {
      myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(myInterval)
            } else {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } 
      }, 1000)
    }
    return ()=> {
      clearInterval(myInterval);
    };
  }, [start, hours, minutes, seconds]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setHours(Number(hours));
    setMinutes(Number(minutes));
    setSeconds(Number(seconds));
    setStart(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <label>
            Hours:
            <input
              type='number'
              value={hours}
              onChange={e => setHours(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Minutes:
            <input
              type='number'
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Seconds:
            <input
              type="number"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              required
            />
          </label>
          <br />
          <input type='submit' value="Start Timer" />
        </form>
        { hours === 0 && minutes === 0 && seconds === 0
            ? null
            : <h1> Time Remaining: {hours}:{minutes < 10 ?  `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
