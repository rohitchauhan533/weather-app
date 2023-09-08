import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_WEATHER_API_URL,
} from "./../env.config.js";
import { Dimmer, Loader } from "semantic-ui-react";
export default function App() {
  const [lat, setLat] = useState("28.8978");
  const [long, setLong] = useState("76.6297");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    const weatherUrl =  `${REACT_APP_WEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_WEATHER_API_KEY}`;

    await fetch(
      weatherUrl
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  useEffect(() => {
    fetchData();
  }, [lat, long]);
  return (
    <div className="App">
      {(typeof data.main != "undefined") ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
