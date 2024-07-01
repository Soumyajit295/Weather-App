
let inputArea = document.querySelector('#inputArea')
const search = document.querySelector('#search')
let detailsContainer = document.querySelector('.details_container')


function getTimeDetails() {
    const currentDate = new Date();

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.getDay();
    const dayOfMonth = currentDate.getDate();


    console.log("Current year: ", year);
    console.log("Today is: ", dayNames[dayOfWeek]);
    console.log("Current month: ", monthNames[month - 1]);
    console.log("Day of the month: ", dayOfMonth);

    return [year,dayNames[dayOfWeek], monthNames[month - 1],dayOfMonth]

}
async function fetchData(city, callback) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=daa38aabc10583757596768e8576f2a7`);
    const data = await response.json()
    callback(data)
}

function displayData(data) {
    console.log(data)
    let time = getTimeDetails()

    if(data.cod === "404"){
        detailsContainer.innerHTML =`
            <div class="city_not_found">
                <h1>${"City not found 😢"}</h1>
            </div>
        `
    }
    else{
        detailsContainer.innerHTML = `
        <div class="weather_icon" style="background: url('http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png') center center no-repeat; background-size: contain;">
        </div>
        <div class="weather_condition">
            <h1 class="City">${data.name}</h1>
            <div class="date_time">
                <div class="day">${time[1]}</div>
                <div class="date">${time[3]}</div>
                <div class="month">${time[2]}</div>
                <div class="year">${time[0]}</div>
            </div>
            <p class="condition">${data.weather[0].main}</p>
            <h1 class="temp">${Math.floor(data.main.temp-273.15)}⁰C</h1>
        </div>
        <div class="boxes">
            <div class="box">
                <p class="temp_type" style="font-weight: 700; font-size: 1.4rem;">Humidity</p>
                <div class="icon">
                    <i class="fa-solid fa-droplet"></i>
                </div>
                <p class="humidity_percentage">${data.main.humidity}%</p>
            </div>
            <div class="box">
                <p class="temp_type"  style="font-weight: 700; font-size: 1.4rem;">Wind</p>
                <div class="icon">
                    <i class="fa-solid fa-wind"></i>
                </div>
                <p class="humidity_percentage">${data.wind.speed} kmph</p>
            </div>
            <div class="box">
                <p class="temp_type" style="font-weight: 700; font-size: 1.4rem;">Visibility</p>
                <div class="icon">
                    <i class="fa-solid fa-eye"></i>
                </div>
                <p class="humidity_percentage">${data.visibility*0.001} km</p>
            </div>
        </div>`
        
    }
}

search.addEventListener('click', (e) => {
    e.preventDefault()
    fetchData(inputArea.value, displayData)
})