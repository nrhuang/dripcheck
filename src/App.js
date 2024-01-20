import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [placeholderText, setPlaceholderText] = useState('');

  useEffect(() => {
    generateRandomPlaceholder();
  },[])

  function generateRandomPlaceholder(){
    const items = ["Give me something stylish...","What should I wear to a red carpet event?"];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setPlaceholderText(randomItem);
  }
  
  function handleSubmit() {
    getLocation()
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.log('Error getting current location: ', error);
        });
    } else {
      console.log("Geolocation not supported");
    }
    console.log(location);
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
        <input id="searchBar" placeholder={placeholderText}></input>
        <button id='getLocation' onClick={handleSubmit}>Get Location</button>
      </div>
    </div>
  );
}

export default App;
