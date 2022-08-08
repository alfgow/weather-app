async function getCurrentWeather(lat, long, apiKey, baseAPI) {
	const response = await fetch(
		`${baseAPI}weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
	);
	if (!response.ok)
		return {
			data: null,
			error: true,
		};
	const data = await response.json();
	return {
		data,
		error: false,
	};
}

async function getWeeklyWeather(lat, long, apiKey, baseAPI) {
	const response = await fetch(
		`${baseAPI}forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
	);
	if (!response.ok)
		return {
			data: null,
			error: true,
		};
	const data = await response.json();
	return {
		data,
		error: false,
	};
}

export { getCurrentWeather, getWeeklyWeather };
