// const submitBtn = document.getElementById("submitBtn");
// const cityName = document.getElementById("cityName");
// const countryName = document.getElementById("countryName");
// const city_name = document.getElementById("city_name");
// const temp_status = document.getElementById("temp_status");
// const temp = document.getElementById("temp");
// const sunset = document.getElementById("sunset");

// let cityVal = cityName.value || "Dhaka";
// let region = countryName.value || "BD";

// const getInfo = async (event) => {
//   event.preventDefault();
//   let cityVal = cityName.value || "Dhaka";
//   let region = countryName.value || "BD";

//   try {
//     const api = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal},${region}&appid=c2f5597a21f1ae1e24446376b631f722`;

//     const response = await fetch(api);
//     const data = await response.json();
//     const arrData = [data];

//     const deg = (arrData[0].main.temp - 273).toFixed(2);
//     temp.innerHTML = `<span>${deg}</span><sup>o</sup>C</span>`;
//     sunset.innerHTML = `Max temp : <span>${(
//       arrData[0].main.temp_max - 273
//     ).toFixed(2)}</span><sup>o</sup>C</span> || Min temp :  <span>${(
//       arrData[0].main.temp_min - 273
//     ).toFixed(2)}</span><sup>o</sup>C</span>`;
//     //   temp_status.innerText = arrData[0].weather[0].main;

//     city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;

//     //   Condition to check weather //
//     const tempMode = arrData[0].weather[0].main;

//     if (tempMode == "Clear") {
//       temp_status.innerHTML =
//         "<i class='fas fa-sun' style='color:#eccc68;'></i>";
//     } else if (tempMode == "Clouds") {
//       temp_status.innerHTML =
//         "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
//     } else if (tempMode == "Rain") {
//       temp_status.innerHTML =
//         "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
//     } else {
//       temp_status.innerHTML =
//         "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
//     }
//   } catch (err) {
//     city_name.innerHTML = `Plz write the city name properly`;
//   }
// };

// submitBtn.addEventListener("click", getInfo);
// window.addEventListener("load", getInfo);
// window.addEventListener("keypress", function (e) {
//   if (e.keyCode === 13) {
//     getInfo(e);
//   }
// });

const day = document.getElementById("day");
let today_date = document.getElementById("today_date");
let time = document.getElementById("time");

const tempStatus = "Clouds";
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
let periods = "AM";
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
