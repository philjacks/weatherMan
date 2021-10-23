// DOM SELECTORS
const title = document.querySelector("#d1 h2");
const nowTempDisplay = document.querySelector("#d1 span");
const icon = document.getElementById("icon");
const summary = document.querySelector("#d1 .summary");
const todayHigh = document.querySelector("#d1 .high");
const todayLow = document.querySelector("#d1 .low");

// GET WEATHER DATA FOR USER LOCATION
window.navigator.geolocation.getCurrentPosition(
  (position) => {
    const getWeatherData = async () => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      const response = await fetch(
        `https://dark-sky.p.rapidapi.com/${lat},${long}?units=auto&lang=en`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key":
              "154d28321dmshef816df30582daep125366jsne132ed97e91c"
          }
        }
      );
      const data = await response.json();

      console.log(data.currently);
      console.log(data.daily.data[0]);
      const now = data.currently;
      const today = data.daily.data[0];

      // GET & SET DATE
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const todayDate = new Date();
      const day = todayDate.getDay();
      const date = todayDate.getDate();

      // SET CORRECT LETTERS FOR DATE
      let dateEnd = `th`;
      if (date.toString().slice(-1) === "1") {
        dateEnd = `st`;
      } else if (date.toString().slice(-1) === "2") {
        dateEnd = `nd`;
      } else if (date.toString().slice(-1) === "3") {
        dateEnd = `rd`;
      }

      // INPUT DATA TO DOM
      title.innerHTML = `${days[day]} ${date}${dateEnd}`;
      nowTempDisplay.innerHTML = `${Math.round(now.temperature)}°C`;
      icon.setAttribute("src", `../img/${now.icon}.svg`);
      icon.setAttribute("alt", `${now.icon} icon`);
      summary.innerHTML = `${now.summary}`;
      todayHigh.innerHTML = `High | ${Math.round(today.temperatureHigh)}°C`;
      todayLow.innerHTML = `Low | ${Math.round(today.temperatureLow)}°C`;
    };
    getWeatherData();
  },
  (err) => console.log(err.message)
);
