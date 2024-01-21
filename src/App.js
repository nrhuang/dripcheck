import React, { useState, useEffect, Component } from 'react';
import Switch from "react-switch";
import { Loader } from "@googlemaps/js-api-loader"
import './App.css';

const loader = new Loader({
  apiKey: process.env.REACT_APP_MAP_API_KEY,
  version: "weekly",
  libraries: ["maps"]
});

function App() {
  const [location, setLocation] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);

  const [mapLocation, setMapLocation] = useState([49.262152, -123.244766]);
  const [hasMapLocation, setHasMapLocation] = useState(false);

  const [weather, setWeather] = useState(null);
  const [hasWeather, setHasWeather] = useState(false);

  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  const [currLocation, setCurrLocation] = useState(null);

  const [placeholderText, setPlaceholderText] = useState('');
  const [googleMapState, setGoogleMapState] = useState(null);
  const [checked, setChecked] = useState(false);

  let googleMapDiv;

  useEffect(() => {
        const defaultMapOptions = {
            center: {
                lat: 49.262152,
                lng: -123.244766
            },
            zoom: 15
        };
        loader.load().then((google) => {
            const map = new google.maps.Map(
                googleMapDiv,
                defaultMapOptions);
            map.addListener("click", (e) => {
              console.log(e.latLng.lat() + " " + e.latLng.lng());
              var lat = e.latLng.lat();
              var lng = e.latLng.lng();
              setMapLocation([lat, lng]);
              setHasMapLocation(true);
            })
            setGoogleMapState({
                google: google,
                map: map
            });
        });
  },[weather])

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
    if(checked) {
      setCurrLocation(location);
    } else {
      setCurrLocation(mapLocation);
    }
    console.log("current location is: " + currLocation);
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currLocation.latitude}&lon=${currLocation.longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`)
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
    console.log(currLocation);
    console.log(weather);
  }

  function handleLocation() {
    if(hasLocation) {
      setChecked(false);
      setCurrLocation(mapLocation);
      setHasLocation(false);
      setHasMapLocation(true);
    } else {
      setChecked(true);
      setCurrLocation(location);
      setHasLocation(true);
      setHasMapLocation(false);
    }
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

      <div className="Map" ref={(ref) => { googleMapDiv = ref }}
        style={{ height: '35vh', width: '67vh' }}>
      </div>

      <div className='CurrPos'>
        <p id>{checked ? "Lat: "+ Math.round(location[0] * 1000000) / 1000000 + "Long: "+ Math.round(location[1] * 1000000) / 1000000: "Lat: "+ Math.round(mapLocation[0] * 1000000) / 1000000 + "Long: "+ Math.round(mapLocation[1] * 1000000) / 1000000} </p>
      </div>

      <div className='Switch'>
        <span id='switch'>{checked? "Reading Current Location: ":" Reading Map Location: "}</span>
        <Switch 
          className='toggleSwitch'
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          onChange={handleLocation} 
          checked={checked}/>
      </div>

      <div className='Location'>
        <input id="searchBar" placeholder={placeholderText}></input>
        <button id='getDrip' onClick={handleSubmit} disabled={!hasLocation && !hasWeather}>Get My Drip</button>
      </div>

      <div className='dripImage'> 
        {(hasLocation || hasMapLocation) && hasWeather && hasImage && <img id= 'drip' src={image} alt="filler"></img>}
      </div>

    </div>
  );
}

export default App;