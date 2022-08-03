function geolocationSupport() {
	return "geolocation" in navigator;
}

function getCurrentPosition() {
	if (!geolocationSupport())
		throw new Error(
			"No hay soporte de Geolocalización en tu navegador"
		);

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const long = position.coords.longitude;
				resolve({ lat, long });
			},
			() => {
				reject("No hemos podido obtener tu ubicación");
			}
		);
	});
}

export { getCurrentPosition };
