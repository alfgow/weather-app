const optionsDate = {
	day: "numeric",
	weekday: "long",
	month: "long",
};

function formatDate(date, options = optionsDate) {
	return new Intl.DateTimeFormat("es", options).format(date);
}

function formatTemp(temp) {
	const temprRound = Math.round(temp);
	return `${temprRound}°`;
}

export { formatDate, formatTemp };
