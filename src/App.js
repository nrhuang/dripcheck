import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  
  function handleSubmit() {
    
  }
  
  return (
    <div className="App">
      <h1>Drip Check</h1>
    </div>
  );
}

export default App;
