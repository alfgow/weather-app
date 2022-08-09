import { API_KEY, BASE_API, weatherConditionsCodes } from "./constants.js";
import { getCurrentPosition } from "./geolocation.js";
import { getCurrentWeather } from "./services/weather.js";
import { formatDate, formatTemp } from "./utils/fomat-data.js";

//? Función principal
function configCurrentWeather(weather) {
	const {
		name: city,
		main: datos,
		weather: actualWeather,
		sys,
	} = weather;
	//! Loader
	setTimeout(() => {
		showCurrentWeather();
	}, 500);
	//! date
	setCurrentDate();
	//! city
	setCurrentCity(city);
	//! temp
	setCurrentTemperature(datos);
	//! background
	setBackground(actualWeather, solarStatus(sys));
}

//? Funciones auxiliares
function showCurrentWeather() {
	const $loading = document.querySelector("#loading");
	const $app = document.querySelector("#app");
	$loading.hidden = true;
	$app.hidden = false;
}

function setCurrentCity(city) {
	const $currentWeatherCity = document.querySelector(
		"#current-weather-city"
	);
	$currentWeatherCity.textContent = city;
}

function setCurrentDate() {
	const $currentWeatherDate = document.querySelector(
		"#current-weather-date"
	);
	const date = new Date();
	const formattedDate = formatDate(date);
	$currentWeatherDate.textContent = formattedDate;
}

function setCurrentTemperature(datos) {
	const $currentWeatherTemp = document.querySelector(
		"#current-weather-temp"
	);
	const temp = datos.temp;
	$currentWeatherTemp.textContent = formatTemp(temp);
}

function setBackground(actualWeather, solarStatus) {
	const $app = document.querySelector("#app");
	const actualId = String(actualWeather[0].id).charAt(0);
	const actual = weatherConditionsCodes[actualId];
	const size = window.matchMedia("(-webkit-min-device-pixel-ratio: 2)")
		.matches
		? "@2x"
		: "";
	$app.style.backgroundImage = `url(./images/${solarStatus}-${actual}${size}.jpg)`;
}

function solarStatus(sys) {
	const sunriseTime = new Date(sys.sunrise * 1000).getHours();
	const sunsetTime = new Date(sys.sunset * 1000).getHours();
	const currentHour = new Date().getHours();
	if (currentHour > sunsetTime || currentHour < sunriseTime) {
		return "night";
	}
	return "morning";
}

export default async function currentWeather() {
	try {
		const { lat, long } = await getCurrentPosition();
		const { error: fetchError, data: weather } =
			await getCurrentWeather(lat, long, API_KEY, BASE_API);
		if (fetchError)
			return Swal.fire({
				icon: "error",
				title: "Ups...",
				text: "Ha ocurrido un error obteniendo los datos del clima",
			});
		configCurrentWeather(weather);
	} catch (error) {
		return Swal.fire({
			icon: "warning",
			title: "Espera...",
			text: `${error}`,
		});
	}
}
