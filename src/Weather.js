import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
//useState
const [weatherData, setWeatherData] = useState({ready: false});
//the response of the API
function handleResponse(response) {
    setWeatherData ({
        ready: true,
        temperature: response.data.temperature.current,
        city:response.data.city,
        description:response.data.condition.description,
        wind:response.data.wind.speed,
        humidity:response.data.temperature.humidity,
        time: "Wednesday, 07:00",
        iconUrl:"https://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
    });
}
//conditional rendering
if(weatherData.ready){
    return ( 
    <div className="Weather">
    <form>
    <div className="row">
        <div className="col-9">
            <input type="search" 
            placeholder="Enter a city..."
            className="form-control"
            autoFocus="on"/>
        </div>

        <div className="col-3">
            <input type="submit" value="Search" className="btn btn-primary w-100" />
        </div>
    </div>
    </form>
    <h1> {weatherData.city} </h1>
        <ul>            
            <li> {weatherData.time}</li>
            <li className="text-capitalize"> {weatherData.description} </li>  
        </ul>

        <div className="row">
            <div className="col-6">
                <img src={weatherData.iconUrl} alt={weatherData.description} />
                <span className="temperature"> {Math.round(weatherData.temperature)} </span>
                <span className="unit"> °C </span> 
            </div>
            <div className="col-6">
                <ul>
                    <li> Humidity: {weatherData.humidity} </li>
                    <li> Wind: {weatherData.wind} km/h </li>
                </ul>
            </div>
        </div>
    </div>
    );
} else {
    const apiKey = "4bfb73a00210a185tacffd8o47774b6a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;

    //making AJAX call
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
}
};