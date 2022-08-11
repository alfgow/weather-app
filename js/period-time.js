import { createDOM } from "./utils/dom.js";
import { formatDate, formatTemp } from "./utils/fomat-data.js";

function periodTimeTemplate({ temp, date, icon, description }, id) {
	const selected = id.indexDay === 0 ? " is-selected" : "";
	return `
        <li class="dayWeather-item${selected}" id="summary-${id.index}${id.indexDay}">
            <span class="dayWeather-time">${date}</span>
            <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" title="${description}" rain="">
            <span class="dayWeather-temp">${temp}</span>
        </li>
    `;
}

function createPeriodTime(weather, id) {
	const dateOptions = {
		hour: "numeric",
		hour12: true,
	};

	const temp = formatTemp(weather.main.temp);
	const date = formatDate(new Date(weather.dt * 1000), dateOptions);

	const config = {
		temp,
		date,
		icon: weather.weather[0].icon,
		description: weather.weather[0].description,
	};

	return createDOM(periodTimeTemplate(config, id));
}

export { periodTimeTemplate, createPeriodTime };
