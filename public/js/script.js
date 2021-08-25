// Openweathermap API. Do not share it publicly.
const api = "7bf41286bd1da6e1c6115aa733eb588b";
// get Dom Element for current Weather
let currentCondition = document.querySelector(".main_header");
console.log(currentCondition);
// get Dom Element for 5 days forecast
let forecastDiv = document.getElementById("fivedayforecast");
// declar week day array for forecast day name

const searchlocation = document.getElementById("searchlocation");

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const s__value = searchlocation.value;
    console.log(s__value);

    const current = `https://api.openweathermap.org/data/2.5/weather?q=${s__value}&appid=${api}`;
    console.log(current);

    getcurrent(current);

    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${s__value}&appid=${api}`;

    getForcast(forecast);
});

window.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        const s__value = searchlocation.value;
        console.log(s__value);

        const current = `https://api.openweathermap.org/data/2.5/weather?q=${s__value}&appid=${api}`;
        console.log(current);

        getcurrent(current);

        const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${s__value}&appid=${api}`;

        getForcast(forecast);
    }
});

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
];

window.addEventListener("load", (e) => {
    let long, lat;
    // Accesing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const current = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`;
            console.log(current);

            getcurrent(current);

            const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api}`;

            getForcast(forecast);
        });
    }
});

// Function to get current Data //

async function getcurrent(current) {
    let fetchData = await fetch(current);
    let response = await fetchData.json();
    console.log(response);
    let { name } = response;
    let { country } = response.sys;
    console.log(name);
    let { temp } = response.main;
    let { description, icon } = response.weather[0];
    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    let celsius = temp - 273.15;

    let html = ` 
    <div class="row">
      <div class="col-md-10 col-12 mx-auto">
        
       

          <div class="tempInformation">
          <h2 class="tempHead">Current Conditions</h2>
              <div class="top_layer">
                  <p id="day">Tuesday</p>
                 
                  <p id="today_date">13 OCT</p>
              </div>
              <div class="main_layer">
                  <p id="city_name">${name} , ${country}</p>
                  <p id="time">Time</p>
              <div class="middle_layer">   
                  <p id="temp"><span>${celsius.toFixed(
                      2
                  )}</span><sup>o</sup>C</p>
                  <p id="temp_status"><div id="temp_datas"><img src="${iconUrl}"/> </> </p>
              </div>
             
              </div>
          </div>

      </div>
    </div>
 `;

    currentCondition.innerHTML = html;

    // let temp_status = document.getElementById("temp_datas");

    // if (icons == "Clear") {
    //     temp_status.innerHTML =
    //         "<i class='fas fa-sun' style='color:#eccc68;'></i>";
    //     console.log("1");
    // } else if (icons == "Clouds") {
    //     temp_status.innerHTML =
    //         "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
    //     console.log("2");
    // } else if (icons == "Rain") {
    //     temp_status.innerHTML =
    //         "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
    //     console.log("3");
    // } else {
    //     temp_status.innerHTML =
    //         "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
    //     console.log("not found");
    // }

    const day = document.getElementById("day");
    let today_date = document.getElementById("today_date");
    let time = document.getElementById("time");

    const week__Days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thrusday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let now = new Date();
    let month, year;
    month = months[now.getMonth()];
    year = now.getFullYear();
    date = now.getDate();

    day.innerHTML = week__Days[now.getDay()];
    today_date.innerHTML = `${date}  ${month}`;

    setInterval(() => {
        let now = new Date();
        let hours, mins, secs;
        let periods = "AM";

        hours = now.getHours();
        mins = now.getMinutes();
        secs = now.getSeconds();

        if (hours > 11) {
            periods = "PM";
            if (hours > 12) {
                hours -= 12;
            }
        }
        if (hours < 10) {
            hours = "0" + hours;
        }

        if (mins < 10) {
            mins = "0" + mins;
        }

        if (secs < 10) {
            secs = "0" + secs;
        }
        time.innerHTML = `${hours} : ${mins} : ${secs} ${periods}`;
    }, 1000);
}

// Function to get 5 Days Forecast //

async function getForcast(forecast) {
    let fetchData = await fetch(forecast);
    let response = await fetchData.json();

    let forecastHtml = "";
    let dayHtml = "";
    let headingCondition = true;
    let currentDay = weekDays[new Date(response.list[0].dt_txt).getDay()];

    for (let i = 0; i < response.list.length; i++) {
        let { temp_min, temp_max } = response.list[i].main; // get min and max tempreature
        let { description, icon } = response.list[i].weather[0]; // get description and icon from array
        let dt_txt = response.list[i].dt_txt; // date and time of this forecaset
        let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`; // create icon url
        let celsius_min = temp_min - 273.15; // convert kelvin to celsius
        let celsius_max = temp_max - 273.15; // convert kelvin to celsius
        // Generate Time from date time
        let date = new Date(dt_txt);
        let day = weekDays[date.getDay()];
        let hour =
            date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minute =
            date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes();
        let second =
            date.getSeconds() < 10
                ? "0" + date.getSeconds()
                : date.getSeconds();

        // for heading if first day is same as current day
        if (currentDay == day && headingCondition) {
            forecastHtml += '<h3 class="dayHeading">' + day + "</h3>";
            forecastHtml += '<div class="forecast">';
            headingCondition = false;
        }

        // Add html in forecastHtml if day change
        if (currentDay != day) {
            forecastHtml += dayHtml;
            forecastHtml += "</div>";
            dayHtml = "";
            headingCondition = true;
            currentDay = day;
        }
        // create html for each forecast dyanamically
        dayHtml +=
            '<div class="day">' +
            "<h3>" +
            hour +
            ":" +
            minute +
            ":" +
            second +
            "</h3>" +
            '<img src="' +
            iconUrl +
            '" />' +
            '<div class="description">' +
            description +
            "</div>" +
            '<div class="temp">' +
            '<span class="high">' +
            celsius_min.toFixed(2) +
            '℃</span>/<span class="low">' +
            celsius_max.toFixed(2) +
            "℃</span>" +
            "</div>" +
            "</div>";
    }
    forecastHtml += dayHtml;
    forecastHtml += "</div>";
    forecastDiv.innerHTML = forecastHtml;
}
