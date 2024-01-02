import React, { useState} from 'react';
import './App.css'
import background from "/Users/macbook/Documents/VScode/WeatherApp/src/mountain.jpg";

export default function App() {
  const apiKey = 'ea26cfee538bb72c30bb7fcddcd51e16' //store api as a string
  const [weatherData, setWeatherData] = useState([{}]) //initialize state to an array containing an empty object
  const[city, setCity] = useState('') //city = the user input in the city input box

  const getWeather = (event) => {
if(event.key == 'Enter'){ //fetch data when the enter key is pressed
  //IMPORTANT: use `: above tab button, not quotes to fetch url
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`).then(
    response => response.json() //JSON is commonly used for exchanging data between a server and a web application, as well as for configuration files and data storage.
  ).then(
    data => {
      setWeatherData(data)
      console.log(data)
    }
  )
}
  }
  return(
    <div className='background' style={{ backgroundImage: `url(${background})`, backgroundSize:"cover",  imageResolution:"300dpi"}}>
		<div className='container'>
      <input className='input' placeholder='Enter City...' 
onChange={e => setCity(e.target.value)} //When the input value changes, this function will be called. 
//Inside the function, e.target.value is used to get the new value of the input. 
//This value is then passed to the setCity function.

value={city} //sets the value of value to the value of city
onKeyPress={getWeather}/>

      {typeof weatherData.main === 'undefined' ? ( //if we havent searched a city yet or we dont have th data
        <div>
          <p>Welcome to the weather app! Enter a city to get its weather.</p>
        </div>
      ):
      <div className='weather-data'>
        <p className='city'>{weatherData.name}, {weatherData.sys.country}</p> 
        <p className='temp'>{weatherData.main.temp} °C</p> 
        <p className='feel'>Feels like {weatherData.main.feels_like} °C</p>
        <p className='descr'>{weatherData.weather[0].description}</p> 
        <p className='wind'>Wind: {weatherData.wind.speed} m/s</p>
      </div>
      }
       
    </div>
    </div>
  );
}