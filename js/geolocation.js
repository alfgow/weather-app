function geolocationSupport() {
	return "geolocation" in navigator;
}

const defaultOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 1000000,
};

function getCurrentPosition(options = defaultOptions) {
	if (!geolocationSupport())
		throw new Error(
			"Tu navegador no tiene soporte para geolocalización"
		);

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;

				resolve(position);
			},
			() => {
				reject("No hemos podido obtener tu ubicación");
			},
			options
		);
	});
}

async function getLatLon(options = defaultOptions) {
	try {
		const {
			coords: { latitude: lat, longitude: lon },
		} = await getCurrentPosition(options);
		return { lat, lon, isError: false };
	} catch {
		return { isError: true, lat: null, lon: null };
	}
}

export { getCurrentPosition, getLatLon };
