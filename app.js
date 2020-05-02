window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let feelsLikeDegree = document.querySelector('.temperature-degree-feel');
  let cityName = document.querySelector('.city');
  let photographerName = document.querySelector('.photographerName');
  let photoLink = document.querySelector('.photoLink')

  let tempDiv = document.querySelector('.temperature');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let startDate = new Date("4/27/2020");
      let today = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      let dayNum = Math.round(Math.abs((today - startDate) / oneDay));

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=22cb4215a18ff315d2f8fd62a12e6b3c`
      const pexelAuth = `https://api.pexels.com/v1/curated?per_page=1&page=${dayNum}`

      var testReload = (localStorage.getItem("bgPhoto") == null || localStorage.getItem("bgPhotoCredit") == null || localStorage.getItem("bgPhotoLink") == null || localStorage.getItem("bgPhotoNumber") == null);

      if(testReload || localStorage.getItem("dayNumLocal") != dayNum) {

        if(localStorage.getItem("dayNumLocal") == null || localStorage.getItem("dayNumLocal") != dayNum) {
          localStorage.setItem("dayNumLocal", dayNum);
        }

        fetch(pexelAuth, {
          headers: {
            'Authorization': '563492ad6f9170000100000103878760a95c43b69b650c65a5c80d7b'
          }
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log("Pexel API Request");

          photographerName.textContent = "Credit to " + data.photos[0].photographer;
          photoLink.href = data.photos[0].photographer_url;

          document.body.style.backgroundImage = "url(" + data.photos[0].src.original + ")";

          localStorage.setItem("bgPhoto", data.photos[0].src.original);
          localStorage.setItem("bgPhotoCredit", data.photos[0].photographer);
          localStorage.setItem("bgPhotoLink", data.photos[0].photographer_url);
          localStorage.setItem("bgPhotoNumber", data.photos[0].photographer_id);
        })
      } else {
        console.log(localStorage.getItem("bgPhotoLink"));

        photographerName.textContent = "Credit to " + localStorage.getItem("bgPhotoCredit");
        photoLink.href = localStorage.getItem("bgPhotoLink");

        document.body.style.backgroundImage = "url(" + localStorage.getItem("bgPhoto") + ")";
      }

      console.log(dayNum + " - " + localStorage.getItem("dayNumLocal"));

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log("OpenWeatherMap API Request");

          // Set DOMs
          temperatureDegree.textContent = data.main.temp;
          feelsLikeDegree.textContent = data.main.feels_like;
          cityName.textContent = data.name;

          if(data.weather.length > 1) {
            for(var i = 0; i < data.weather.length; i++) {
              if(i == data.weather.length-1) {
                temperatureDescription.textContent += data.weather[i].description;
              } else {
                temperatureDescription.textContent += data.weather[i].description + " / ";
              }
            }
          } else {
              temperatureDescription.textContent = data.weather[0].description;
          }

          // Show data
          tempDiv.classList.remove("HideMe");
        })
    })
  }else{
    h1.textContent="Please Enable Geolocation";
  }


});
