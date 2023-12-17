
let loc = "kanigiri";

let btn = document.body.querySelector('button');
let input = document.body.querySelector('input');

let place = document.getElementById('place');

btn.onclick = () =>{
    loc = input.value;
    console.log("Location value : " + loc);
    place.textContent = loc;
    console.log("Place text : " + place);
    fetchData(loc);
};

// const url = `api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=`;


async function fetchData(loc) {
    const apiKey = ''; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      temp.textContent = Math.round(data.main.temp - 273.15);
      high.textContent = Math.round(data.main.temp_max - 273.15);
      console.log(data.main.temp_max);
      low.textContent = Math.round(data.main.temp_min - 273.15);
      humidity.textContent = data.main.humidity;
      speed.textContent = data.wind.speed * 3.06;

      let srise = data.sys.sunrise;
      let sunrisetime = new Date(srise * 1000);
      const rhours = sunrisetime.getHours();
      const rminutes = sunrisetime.getMinutes();
      const formattedSunrise = `${rhours}:${rminutes}`;
      sunrise.textContent = formattedSunrise;
      console.log(formattedSunrise);
      
      let sset = data.sys.sunset;
      let sunsettime = new Date(sset * 1000);
      const shours = sunsettime.getHours();
      const sminutes = sunsettime.getMinutes();
      const formattedSunset = `${shours}:${sminutes}`;
      sunset.textContent = formattedSunset;
      console.log(formattedSunset);
      pressure.textContent = data.main.pressure;
    } catch (error) {
      console.error(error);
    }
    finally{
        console.log("Data fetched...");
    }
}

setInterval(fetchData(loc),100000);
