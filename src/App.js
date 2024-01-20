import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

class MyHeader extends React.Component {
  render () {
    const mystyle = {
      color: "blue",
      backgroundColor: "blue",
      padding: "10px",
      fontFamily: "Arial"
    };
    return (
      <div>
        <h1> Drip Check</h1>
      </div>
    )
  }
}


function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  
  
  function handleSubmit() {
    
  }
  
  return (
    <div className="App">
      <img id="logo" src="dripcheck.png" alt= "logo"/>  
      <div className='Title'>
        <h1> Check The Drip &#9748;</h1>
      </div>
      <div className='Location'>
        <input></input>
        <button onClick={handleSubmit}>Get Location</button>
      </div>
    </div>
  );
}

export default App;
