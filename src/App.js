import React from 'react'
import "./index.css"
import hotbg from './images/hotbg.jpg'
import Description from './components/Description';
import axios from 'axios';
import { useState } from 'react';


function App() {

    const [data, setData] = useState({
        description: '',
        temp: 0,
        name: '',
        humidity: 0,
        temp_max: 0,
        temp_min: 0,
        country: ''
    })

    const [city, setCity] = useState('');
    const [error, setError] = useState('');


    const handleClick = () => {
        if (city.trim() === "") {
            setError("Please enter a city name.");
            setTimeout(() => {
                setError('');
            }, 1000);
        }else{
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3dda2145ca1a8afb56c571fb70adde0f`
            axios.get(apiUrl)

                .then(response => {
                    const { weather, main, sys, name } = response.data;

                    setData({
                        ...data,
                        temp: (main.temp - 273.15).toFixed(),
                        name: name,
                        humidity: main.humidity,
                        temp_max: (main.temp_max - 273.15).toFixed(),
                        temp_min: (main.temp_min - 273.15).toFixed(),
                        description: weather[0].description,
                        country: sys.country
                    })
                    setError('');
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError("Invalid City Name")
                        setTimeout(()=>{
                            setError(''); 
                        }, 1000)
                    } else {
                        setError('');
                    }
                })


        }
    }





    return (

        <div className="app" style={{ backgroundImage: `url(${hotbg})` }}>
            <div className="overlay">
                <div className="container">
                    <div className="section section_inputs">
                        <input type="text" value={city} placeholder='Enter your city....' onChange={e => setCity(e.target.value)} />
                        <button type='sumbit' onClick={handleClick} >GET WEATHER</button>
                    </div>
                    <div className="error" style={{ color: 'white' }}>
                        <h1>{error}</h1>
                    </div>
                    {/* second Part */}

                    <div className="section section_temperature">
                        <div className="icon">
                            <h1>{data.name} {data.country}</h1>
                            
                            <img src="https://cdn-icons-png.flaticon.com/128/1163/1163661.png" alt="weatherIcon" />
                            <h1>{data.description}</h1>
                        </div>

                        {/* 2ndpart right */}
                        <div className="temperature">
                            <h1>{data.temp}°C</h1>


                        </div>

                    </div>

                    {/* 3rdpart */}

                    <Description
                        temp_min={data.temp_min}
                        temp_max={data.temp_max}
                        humidity={data.humidity} />

                </div>
            </div>
        </div>


    )
}

export default App
