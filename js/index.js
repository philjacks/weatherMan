// FETCH DATA FROM WEATHER API 
const getWeather = () => {
  // GET USER LOCATION
  let lat = null;
  let long = null;

  window.navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    long = position.coords.longitude,
      (err) => {
        console.log(err)
      }

    // GET WEATHER DATA
    const getData = async () => {
      const response = await fetch(`https://dark-sky.p.rapidapi.com/${lat},${long}?units=auto&lang=en`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "dark-sky.p.rapidapi.com",
          "x-rapidapi-key": "154d28321dmshef816df30582daep125366jsne132ed97e91c"
        }
      })
      const data = await response.json()
      return data.daily.data
    }

    // DISPLAY WEATHER DATA IN DOM
    const displayData = async () => {
      const test = await getData()
      console.log(test[0].temperatureHigh)
    }
    displayData()
  })
}

getWeather()