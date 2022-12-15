let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let backgroundimg = document.getElementById("background-image");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
let day = document.getElementById("day");
let date = document.getElementById("date");
let time = document.getElementById("time");
let hum = document.getElementById("humidity");
let wspeed = document.getElementById("wind-speed");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let d = new Date();

let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async (city) => {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=714f5ba6756b95e6fb9712580cb40223`,
            { mode: 'cors' }
        );

        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=32ba0bfed592484379e51106cef3f204`,
            { mode: 'cors' }
        );
        const weatherData = await response.json();
        const data = await response2.json();

        console.log(data);

        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id } = weatherData.weather[0];
        const { humidity } = weatherData.main;
        const { speed } = weatherData.wind;
        const { main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        hum.textContent = humidity;
        tempvalue.textContent = Math.round(feels_like - 273);
        wspeed.textContent = Math.round(speed );




        if (id < 300 && id >= 200) {
            tempicon.src = "https://w7.pngwing.com/pngs/618/88/png-transparent-thunderstorm-lightning-weather-thunderstorm-s-cloud-weather-forecasting-thunder.png";
        }
        else if (id < 400 && id >= 300) {
            tempicon.src = "https://img.favpng.com/19/25/5/cloud-rain-drizzle-wet-season-clip-art-png-favpng-5GaygjihcDHJTsuu71ZbuJCQv.jpg";
        }
        else if (id < 600 && id >= 500) {
            tempicon.src = "https://www.clipartmax.com/png/middle/233-2338932_nube-lluvia-cloud-rain-raincloud-rain-cloud-weather-symbol.png";
        }

        else if (id < 700 && id >= 600) {
            tempicon.src = "https://cdn-icons-png.flaticon.com/512/1247/1247131.png";
        }
        else if (id < 800 && id >= 700) {
            tempicon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        }
        else if (id == 800) {
            tempicon.src = "https://www.pngmart.com/files/20/Summer-Sun-PNG.png";
        }
        else if (id < 900 && id > 800) {
            tempicon.src = "https://www.citypng.com/public/uploads/preview/black-outline-cloud-icon-transparent-png-11639648372dqmqmmpuqr.png";
        }





        for (i = 1; i < 8; i++) {
            document.getElementById("day" + (i) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°C";

        }

        for (i = 1; i < 8; i++) {
            document.getElementById("day" + (i) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(1) + "°C";
        }

        for (i = 1; i < 8; i++) {
            document.getElementById("img" + (i)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
        }



 
        function CheckDay(day) {
            if (day + d.getDay()+1 > 6) {
                return day + d.getDay()+1 - 7;
            }
            else {
                return day + d.getDay()+1;
            }
        }

        for (i = 0; i < 7; i++) {
            document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
        }



    }

    catch (error) {
        alert('City not founded');
    }
};










window.addEventListener("load", () => {
    let long;
    let lat;
    const proxy = "https://cors-anywhere.herokuapp.com/";


    if (navigator.geolocation) {
        {


            navigator.geolocation.getCurrentPosition((position) => {


                long = position.coords.longitude;
                lat = position.coords.latitude;
                const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=714f5ba6756b95e6fb9712580cb40223`
                fetch(api).then((response) => {
                    return response.json();
                })

                    .then(data => {
                        const { name } = data;
                        const { bb } = data.main;
                        const { feels_like } = data.main;
                        const { id } = data.weather[0];
                        const { humidity } = data.main;
                        const { speed } = data.wind;
                        const { main } = data.weather[0];

                        loc.textContent = name;
                        climate.textContent = main;
                        hum.textContent = humidity;
                        climate.textContent = main;
                        wspeed.textContent = Math.round(speed );
                        tempvalue.textContent = Math.round(feels_like - 273);

                        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=32ba0bfed592484379e51106cef3f204')
                            .then(response => response.json())
                            .then(data1 => {
                                for (i = 1; i < 8; i++) {
                                    document.getElementById("day" + (i) + "Min").innerHTML = "Min: " + Number(data1.list[i].main.temp_min - 273.15).toFixed(1) + "°C";

                                }

                                for (i = 1; i < 8; i++) {
                                    document.getElementById("day" + (i) + "Max").innerHTML = "Max: " + Number(data1.list[i].main.temp_max - 273.15).toFixed(1) + "°C";
                                }

                                for (i = 1; i < 8; i++) {
                                    document.getElementById("img" + (i)).src = "http://openweathermap.org/img/wn/" + data1.list[i].weather[0].icon + ".png";
                                }

                            })




                        function CheckDay(day) {
                            if (day + d.getDay()+1 > 6) {
                                return day + d.getDay()+1 - 7;
                            }
                            else {
                                return day + d.getDay()+1;
                            }
                        }

                        for (i = 0; i < 7; i++) {
                            document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
                        }


                        if (id < 300 && id >= 200) {
                            tempicon.src = "https://w7.pngwing.com/pngs/618/88/png-transparent-thunderstorm-lightning-weather-thunderstorm-s-cloud-weather-forecasting-thunder.png";
                        }
                        else if (id < 400 && id >= 300) {
                            tempicon.src = "https://img.favpng.com/19/25/5/cloud-rain-drizzle-wet-season-clip-art-png-favpng-5GaygjihcDHJTsuu71ZbuJCQv.jpg";
                        }
                        else if (id < 600 && id >= 500) {
                            tempicon.src = "https://www.clipartmax.com/png/middle/233-2338932_nube-lluvia-cloud-rain-raincloud-rain-cloud-weather-symbol.png";
                        }

                        else if (id < 700 && id >= 600) {
                            tempicon.src = "https://cdn-icons-png.flaticon.com/512/1247/1247131.png";
                        }
                        else if (id < 800 && id >= 700) {
                            tempicon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
                        }
                        else if (id == 800) {
                            tempicon.src = "https://www.pngmart.com/files/20/Summer-Sun-PNG.png";
                        }
                        else if (id < 900 && id > 800) {
                            tempicon.src = "https://www.citypng.com/public/uploads/preview/black-outline-cloud-icon-transparent-png-11639648372dqmqmmpuqr.png";
                        }


                        for (i = 1; i < 8; i++) {
                            document.getElementById("day" + (i) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(2) + "°C";

                        }

                        for (i = 1; i < 8; i++) {
                            document.getElementById("day" + (i) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°C";
                        }

                        for (i = 1; i < 8; i++) {
                            document.getElementById("img" + (i)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
                        }
                    }
                    )
            }
            )
        }

    }
}
)





time = new Date().toLocaleTimeString();

document.getElementById("time").textContent = time;
date = new Date().toLocaleDateString();
document.getElementById("date").textContent = date;






day = new Date().getDay();

if (day == 0) {
    document.getElementById("day").textContent = "Sunday";
}
else if (day == 2) {
    document.getElementById("day").textContent = "Tuesday";
}
else if (day == 3) {
    document.getElementById("day").textContent = "Wednesday";
}
else if (day == 4) {
    document.getElementById("day").textContent = "Thursday";
}
else if (day == 5) {
    document.getElementById("day").textContent = "Friday";
}
else if (day == 6) {
    document.getElementById("day").textContent = "saturday";
}
else if (day == 1) {
    document.getElementById("day").textContent = "Monday";
}






function refreshTime() {
    let timeDisplay = document.getElementById("time");
    let timeString = new Date().toLocaleTimeString();
    let formattedString1 = timeString.replace(", ", " - ");
    let dateDisplay = document.getElementById("date");
    let dateString = new Date().toLocaleDateString();


    timeDisplay.textContent = formattedString1;

}
setInterval(refreshTime, 10);


