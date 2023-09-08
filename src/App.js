import './App.css';
import React, { useEffect, useState } from "react";
//import Weather from './components/weather';
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_WEATHER_API_URL,
} from "./../env.config.js";
export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    await fetch(`${REACT_APP_WEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_WEATHER_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setData(result)
      console.log(result);
    });
  }

  useEffect(() => {

    fetchData();
  }, [lat,long])
  return (
    <div className="App">
    </div>
  );
}
