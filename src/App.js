import React, { useState, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import './App.css';

const loader = new Loader({
  apiKey: {REACT_APP_MAP_API_KEY}
});

loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});


function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [hasWeather, setHasWeather] = useState(false);
  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');

  useEffect(() => {
    generateRandomPlaceholder();
  },[])

  function generateRandomPlaceholder(){
    const items = ["Give me something stylish...","What should I wear to a red carpet event?",
                  "I want to try something new...", "It's raining but I still want to look good."];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setPlaceholderText(randomItem);
  }
  
  useEffect(() => {
    getLocation();
  },[]);

  useEffect(()=> {
    getWeather();
  },[location])
  
  function handleSubmit() {
    getInput();
    createPrompt();
  }
  
  function getLocation() {
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
  }
  
  function getWeather() {
    if(!hasLocation) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        setHasWeather(true);
      })
      .catch(error => console.log(error));
  }

  function getInput() {
    setHasImage(true);
    var input = document.getElementById("searchBar");
    console.log(input.value);
    if(input.value === 'meow') setImage("https://media1.tenor.com/m/Jc9jT66AJRwAAAAd/chipi-chipi-chapa-chapa.gif");
    else if(input.value === 'gojo') setImage("https://i.redd.it/s85ejs5xxz4c1.gif");
    else if(input.value === 'gullible') setImage("https://media1.tenor.com/m/DABdHr-IoaAAAAAC/cat-gullible.gif");
  }
  
  function createPrompt() {
    console.log(location);
    console.log(weather);
  }
  
  return (
    <div className="App">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/dripcheck.ico" />
        <title>Drip Check</title>
      </head>
      <img id="logo" src="dripcheck.png" alt= "logo"/>  
      <div className='Title'>
        <h1 id='header'> Check The Drip &#9748;</h1>
      </div>
      <div className='Location'>
        <input id="searchBar" placeholder={placeholderText}></input>
        <button id='getDrip' onClick={handleSubmit} disabled={!hasLocation && !hasWeather}>Get My Drip</button>
      </div>
      <div className='dripImage'> 
        {hasLocation && hasWeather && hasImage && <img id= 'drip' src={image} alt="filler"></img>}
      </div>
    </div>
  );
}

export default App;