import { API_KEY, BASE_API } from "./constants.js";
import { getCurrentPosition } from "./geolocation.js";
import { getWeeklyWeather } from "./services/weather.js";
import { formatWeekList } from "./utils/fomat-data.js";

function configWeeklyWeather(weather) {}

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
		configWeeklyWeather(weather);
	} catch (error) {
		return Swal.fire({
			icon: "warning",
			title: "Espera...",
			text: `${error}`,
		});
	}
}

export { weeklyWeather };
