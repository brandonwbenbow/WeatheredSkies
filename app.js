window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let feelsLikeDegree = document.querySelector('.temperature-degree-feel');
  let cityName = document.querySelector('.city');

  let tempDiv = document.querySelector('.temperature');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/"
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=22cb4215a18ff315d2f8fd62a12e6b3c`
      const pexelAuth = `${proxy}https://api.pexels.com/v1/curated?per_page=1&page=1`


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
        console.log(data.photos[0].src.landscape);

        document.body.style.backgroundImage = "url(" + data.photos[0].src.landscape + ")";
      })

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

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
