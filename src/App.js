import React, { useState } from 'react';

import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  
  function handleSubmit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation, error);
    } else {
      console.log("Geolocation not supported");
    }
  }
  
  function getLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f1fd5922d1b9618b48fa043483a37ba1&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }
  
  return (
    <div className="App">
      <h1>Drip Check</h1>
      <div>
        <button onClick={handleSubmit}>Get Location</button>
      </div>
    </div>
  );
}

export default App;
