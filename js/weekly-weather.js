import { API_KEY, BASE_API } from "./constants.js";
import { getCurrentPosition } from "./geolocation.js";
import { periodTimeTemplate } from "./period-time.js";
import { getWeeklyWeather } from "./services/weather.js";
import { createDOM } from "./utils/dom.js";
import { formatWeekList } from "./utils/fomat-data.js";

function tabPanelTemplate(id) {
	return `
        <div style='color: white' class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
          <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}">
            </ul>
          </div>
        </div>
    `;
}

function createTabPanel(id) {
	const $panel = createDOM(tabPanelTemplate(id));
	if (id != 0) {
		$panel.hidden = true;
	}
	return $panel;
}

function configWeeklyWeather(weeklist) {
	const $container = document.querySelector(".tabs");
	weeklist.forEach((day, index) => {
		const $panel = createTabPanel(index);
		$container.append($panel);
		day.forEach((weather, indexweather) => {
			$panel.querySelector(".dayWeather-list").append(
				periodTimeTemplate(weather)
			);
		});
	});
}

async function weeklyWeather() {
	try {
		const { lat, long } = await getCurrentPosition();
		const { error: fetchError, data: weather } =
			await getWeeklyWeather(lat, long, API_KEY, BASE_API);
		if (fetchError)
			return Swal.fire({
				icon: "error",
				title: "Ups...",
				text: "Ha ocurrido un error obteniendo el pronósito del clima",
			});
		const weeklist = formatWeekList(weather.list);
		configWeeklyWeather(weeklist);
	} catch (error) {
		return Swal.fire({
			icon: "warning",
			title: "Espera...",
			text: `${error}`,
		});
	}
}

export { weeklyWeather };
