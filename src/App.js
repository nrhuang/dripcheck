import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [image, setImage] = useState(null);
  
  function handleSubmit() {
    getLocation();
  }
  
  function getLocation() {
    getInput();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setHasLocation(true);
        },
        (error) => {
          console.log('Error getting current location: ', error);
        });
    } else {
      console.log("Geolocation not supported");
    }
    console.log(location);
  }

  function getInput() {
    var input = document.getElementById("searchBar");
    console.log(input.value);
    if(input.value === 'meow') setImage("https://media1.tenor.com/m/Jc9jT66AJRwAAAAd/chipi-chipi-chapa-chapa.gif");
    else if(input.value === 'gojo') setImage("https://i.redd.it/s85ejs5xxz4c1.gif");
    else if(input.value === 'gullible') setImage("https://media1.tenor.com/m/DABdHr-IoaAAAAAC/cat-gullible.gif");
  }
  
  return (
    <div className="App">
      <img id="logo" src="dripcheck.png" alt= "logo"/>  
      <div className='Title'>
        <h1> Check The Drip &#9748;</h1>
      </div>
      <div className='Location'>
        <input id="searchBar"></input>
        <button id='getLocation' onClick={handleSubmit}>Get Location</button>
      </div>
      <div className='dripImage'> 
        {hasLocation && <img id= 'drip' src={image} alt="filler"></img>}
      </div>
    </div>
  );
}

export default App;
