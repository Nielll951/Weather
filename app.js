const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const mainDesc = document.createElement('section');
const desc = document.createElement('section');
let actualMinute = '';
let actualMonth = '';

(function getActualMinute(){
    let minute = new Date().getMinutes();
    if(minute < 10) actualMinute = '0' + minute;
    else actualMinute = minute;
    return actualMinute;
}());

(function getActualMonth(){
    let monthNumber = new Date().getMonth();
    actualMonth = month[monthNumber];
    return actualMonth;
}());

class City{
    constructor(city, humidity, pressure, wind, temp, feelLike, cloud, img, parent) {
        this.city = city;
        this.humidity = humidity;
        this.pressure = pressure;
        this.wind = wind;
        this.temp = temp;
        this.feelLike = feelLike;
        this.cloud = cloud;
        this.img = img;
        this.parent = document.querySelector(parent);
    }
    render() {
        mainDesc.classList.add('main-desc');
        mainDesc.innerHTML = `<div class="main-desk__inner">
        <div class="main-desc__title">
            <img src="https://openweathermap.org/img/w/${this.img}.png" alt="weather" class="main-desc__title-img">
            <p class="main-desc__title-text">${this.city}</p>
            <p class="main-desc__title-degree">${Math.ceil(this.temp)}&#8451;</p>
        </div>
        <div class="main-desc__item">
            <p class="main-desc__item-text">${new Date().getDate()} ${actualMonth}</p>
        </div>
        </div>`;

        desc.classList.add('desc');
        desc.innerHTML = `
        <div class="desc__inner">
        <ul class="desc__list">
            <li class="desc__item">
                <p class="desc__item-text"><span>Humidity:</span> ${this.humidity}%</p>
                <p class="desc__item-text"><span>Pressure</span> ${this.pressure} hPa</p>
                <p class="desc__item-text"><span>Wind:</span> ${this.wind} km/h SSE</p>
            </li>
            <li class="desc__item">
                <p class="desc__item-text desc__item-text--min"> ${new Date().getHours()}:${actualMinute}</p>
            </li>
            <li class="desc__item">
                <p class="desc__item-text"><span>Temp:</span> ${Math.ceil(this.temp)} &#8451;</p>
                <p class="desc__item-text"><span>Feel like:</span>  ${Math.ceil(this.feelLike)} &#8451;</p>
                <p class="desc__item-text"><span>Cloudy: </span> ${this.cloud}%</p>
            </li>
        </ul>
    </div>`;

    this.parent.append(mainDesc);
    this.parent.append(desc);
    }
}

function getDate(city = 'KHARKOV') {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else {
            alert('Please, type exact name of the city');
            getDate();
        }
    })
    .then(data => {
        console.log(data);
        new City(
            data.name,
            data.name.humidity,
            data.main.pressure,
            data.wind.speed,
            data.main.temp,
            data.main.feels_like,
            data.clouds.all,
            data.weather[0].icon,
            '.wrapper'
        ).render();
    })
    .catch(err => {
        console.warn(err);
    });
}
getDate();

const form = document.forms['form'];
const input = form.elements['text'];

form.addEventListener('submit', onSubmitFormHandler);

function onSubmitFormHandler(e){
    e.preventDefault();
    if(input.value === ''){
        alert('Please, enter the city');
        return;
    }
    mainDesc.remove();
    desc.remove();
    cityTitle = input.value.toUpperCase();
    form.reset();
    getData(cityTitle);
}