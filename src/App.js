import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  
  
  function handleSubmit() {
    
  }
  
  return (
    <div className="App">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/dripcheck.ico" />
        <title>Drip Check</title>
      </head>
      <img id="logo" src="dripcheck.png" alt= "logo"/>  
      <div className='Title'>
        <h1> Check The Drip &#9748;</h1>
      </div>
      <div className='Location'>
        <input id="searchBar"></input>
        <button id='getLocation' onClick={handleSubmit}>Get Location</button>
      </div>
      <div className='dripImage'> 
        <img id= 'drip' src="https://media1.tenor.com/m/Jc9jT66AJRwAAAAd/chipi-chipi-chapa-chapa.gif" alt="filler"></img>
      </div>
    </div>
  );
}

export default App;
