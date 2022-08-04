function geolocationSupport() {
	return "geolocation" in navigator;
}

const defaultOptions = {
	enableHigAccuracy: true,
	tineout: 5000,
	maxiumAge: 100000,
};

function getCurrentPosition(options = defaultOptions) {
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
			},
			options
		);
	});
}

export { getCurrentPosition };
