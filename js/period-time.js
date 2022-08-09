import { createDOM } from "./utils/dom.js";
import { formatDate, formatTemp } from "./utils/fomat-data.js";

function periodTimeTemplate(weather) {
	//! Temp
	//! icon
	//! date
	//! description

	const dateOptions = {
		hour: "numeric",
		hour12: true,
	};

	const config = {
		temp: weather.main.temp,
		date: weather.dt,
		icon: weather.weather[0].icon,
		description: weather.weather[0].description,
	};

	const { temp, date, icon, description } = config;

	return createDOM(`
        <li class="dayWeather-item is-selected">
                <span class="dayWeather-time">${formatDate(
			new Date(date * 1000),
			dateOptions
		)}</span>
                <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
                <span class="dayWeather-temp">${formatTemp(temp)}</span>
              </li>
    `);
}

export { periodTimeTemplate };
