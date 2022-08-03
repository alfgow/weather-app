function geolocationSupport() {
	return "geolocation" in navigator;
}

function getCurrentPosition() {
	if (!geolocationSupport())
		throw new Error(
			"No hay soporte de Geolocalización en tu navegador"
		);
	navigator.geolocation.getCurrentPosition((position) => {
		const lat = position.coords.latitude;
		const long = position.coords.longitude;
	});
}

export { getCurrentPosition };
