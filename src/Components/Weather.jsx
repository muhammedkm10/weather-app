import React from 'react'
import './weather.css'
import clear_icon from '../assets/images/clear.png'
import humidity from '../assets/images/humidity.png'
import drizzle from '../assets/images/drizzle.png'
import rain from '../assets/images/rain.png'
import snow from '../assets/images/snow.png'
import wind from '../assets/images/wind.png'
import { useState } from 'react'
import { useEffect } from 'react'


function Weather() {

    const [cityName,setcityName] = useState("")
    const [fulldata,setFulldata] = useState({})
    const [show,setshow] = useState(false)
    
   

    const get_data =  () =>{
        if (cityName == ""){
            alert("Enter some place name")
            return 
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`)
        .then((reponse)=>{
            if(reponse.status == 404){
                alert("Enter a correct detination...")
            }
            
            else{
            setshow(true)
            const data = reponse.json()
            return data


            }


            
           
            
        })
        .then((data)=>{
            setFulldata({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temp:Math.floor(data.main.temp),
                location:data.name,
                icon:data.weather[0].icon

            })
        })
        .catch((error)=>{
            console.log(error);
            
        })
        
    }
  return (
    <div className='weather'>
        <div className='search_bar'>
            <input type="text" onChange={(e)=>setcityName(e.target.value)} placeholder="search for a city..." data={cityName} className="search_input" />
            <button onClick ={()=>get_data()}className='search_button'>search</button>
        </div>
        {show &&
        <div>
        <div className='weather_wrapper'>
            {fulldata.icon ? <img src={`https://openweathermap.org/img/wn/${fulldata.icon}@2x.png`} alt="" className='weather_icon'/>:<img src={clear_icon} alt="" className='weather_icon'/>}
            <p className='weather_details'>{fulldata.temp} °C</p>
            <p className='place'>{fulldata.location}</p>
        </div>

        <div className="other_details">
            <div className="row ">
                <div className="col-6 first_part">
                    <img src={humidity} alt="" className='hum_img' />
                    <div className="detaill">
                      <p  className='numbers'>{fulldata.humidity} %</p>
                      <p className='name_of'>Humidity</p>
                    </div>
                </div>
                <div className="col-6 second_part" >
                <img src={wind} alt="" className='hum_img'/>
                  <div className="detaill">
                    <p className='numbers'>{fulldata.windspeed} Km/h</p>
                    <p className='name_of'>Wind speed</p>
                    </div>
                </div>
            </div>
            
        </div>
        </div>}
        
    </div>
  )
}

export default Weather