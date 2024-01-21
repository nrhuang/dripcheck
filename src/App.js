import React, { useState, useEffect, Component } from 'react';
import Switch from "react-switch";
import { Loader } from "@googlemaps/js-api-loader"
import './App.css';

const loader = new Loader({
  apiKey: process.env.REACT_APP_MAP_API_KEY,
  version: "weekly",
  libraries: ["places"]
});

function App() {
  const [location, setLocation] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);

  const [mapLocation, setMapLocation] = useState(0);
  const [hasMapLocation, setHasMapLocation] = useState(false);

  const [weather, setWeather] = useState(null);
  const [hasWeather, setHasWeather] = useState(false);

  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  const [currLocation, setCurrLocation] = useState(null);

  const [placeholderText, setPlaceholderText] = useState('');
  const [googleMapState, setGoogleMapState] = useState(null);
  const [checked, setChecked] = useState(false);
  const [hasWindow, setHasWindow] = useState(null);
  const [clicked, setClicked] = useState(false);

  let googleMapDiv;

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

  useEffect(()=> {
    getWeatherGoogle();
  },[mapLocation, clicked])
  
  function handleSubmit() {
    if(hasImage) {
      setHasImage(false);
    }
    getOutfitRec();
    setClicked(true);
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({latitude, longitude});
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
  
  function getOutfitRec() {
    var input = document.getElementById('searchBar').value;
    var prompt = `Here are the current weather conditions: ${weather.weather[0].description}, Temperature: ${weather.main.temp} degrees celsius. ` + input + ` . Tell me what to wear.`
    fetch(`http://localhost:8000/api/chatgpt/${prompt}`)
      .then(res => res.json())
      .then(data => setImage(data.message))
      .then(data => setHasImage(true))
  }

  function getWeatherGoogle() {
    if(!hasMapLocation) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${mapLocation.latitude}&lon=${mapLocation.longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        setHasWeather(true);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if(window.google) {
      setHasWindow("one");
    }
  })

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
          let latitude = e.latLng.lat();
          let longitude = e.latLng.lng();
          setMapLocation({latitude, longitude});
          console.log(mapLocation);
          setHasMapLocation(true);
        })
        setGoogleMapState({
            google: google,
            map: map
        });
      });
  },[location])

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
        <p id>{checked ? "Lat: "+ Math.round(location.latitude * 1000000) / 1000000 + "Long: "+ Math.round(location.longitude * 1000000) / 1000000: "Lat: "+ Math.round(mapLocation.latitude * 1000000) / 1000000 + "Long: "+ Math.round(mapLocation.longitude * 1000000) / 1000000} </p>
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
        <button id='getDrip' onClick={handleSubmit} disabled={!hasLocation && !hasWeather && !hasMapLocation}>Get My Drip</button>
      </div>

      <div className='dripImage'> 
        {clicked && !hasImage && <img id= 'loading' src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="filler"></img>}
        {(hasLocation || hasMapLocation) && hasWeather && hasImage && <img id= 'drip' src={image} alt="filler"></img>}
      </div>

    </div>
  );
}

export default App;