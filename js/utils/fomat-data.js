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

function formatWeekList(rawData) {
	let dayList = [];
	const weekList = [];
	rawData.forEach((item, index) => {
		dayList.push(item);
		if ((index + 1) % 8 === 0) {
			weekList.push(dayList);
			dayList = [];
		}
	});
	return weekList;
}

export { formatDate, formatTemp, formatWeekList };
