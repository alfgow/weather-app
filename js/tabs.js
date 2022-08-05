const $tabContainer = document.querySelector("#tabs");
const $tabList = $tabContainer.querySelectorAll(".tab");
const $tabPanelContainer = document.querySelector("#tabPanelContainer");

const date = new Date();
let today = date.getDay();

const week = [
	"Domingo",
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
];

const climas = [1, 2, 3, 4, 5, 6, 7, 8];

function nextDay(today) {
	if (today === 6) {
		return 0;
	}
	return today + 1;
}

function generadorTabs(index) {
	let xd = index;
	const tabPanel = document.createElement("div");
	tabPanel.classList.add("tabPanel");
	tabPanel.tabIndex = xd;
	tabPanel.setAttribute("aria-labelledby", `tab-${xd}`);
	if (xd != 0) {
		tabPanel.hidden = "true";
	}
	$tabPanelContainer.appendChild(tabPanel);

	const dayWeather = document.createElement("div");
	dayWeather.classList.add("dayWeather");
	dayWeather.id = "dayWeather";
	tabPanel.appendChild(dayWeather);

	const dayWeatherList = document.createElement("ul");
	dayWeatherList.classList.add("dayWeather-list");
	dayWeatherList.id = "dayWeather-list-0";
	dayWeather.appendChild(dayWeatherList);

	climas.forEach((clima) => {
		//! Horarios
		const dayWeatherItem = document.createElement("li");
		dayWeatherItem.classList.add("dayWeather-item", "is-selected");
		dayWeatherList.appendChild(dayWeatherItem);

		const span = document.createElement("span");
		span.classList.add("dayWeather-time");
		span.textContent = "1 a.m.";
		dayWeatherItem.appendChild(span);

		const img = document.createElement("img");
		img.classList.add("dayWeather-icon");
		img.src = "https://openweathermap.org/img/wn/10n@2x.png";
		img.setAttribute("alt", "moderate");
		img.setAttribute("rain", "");
		dayWeatherItem.appendChild(img);

		const spanTemp = document.createElement("span");
		spanTemp.classList.add("dayWeather-temp");
		spanTemp.textContent = "14°";
		dayWeatherItem.appendChild(spanTemp);
	});
}

function handleSelectTabClick(event) {
	const $tabSelected = event.target;
	const $idSelected = $tabSelected.id;
	const $tabActive = document.querySelector('.tab[aria-selected="true"]');
	const $idActive = $tabActive.id;

	if ($idSelected != $idActive) {
		$tabActive.removeAttribute("aria-selected");
		$tabSelected.setAttribute("aria-selected", "true");
		const $tabPanel = document.querySelector(
			`[aria-labelledby=${$idSelected}]`
		);
		const $tabPanelSelected = document.querySelector(
			".tabPanel:not([hidden])"
		);
		$tabPanel.hidden = false;
		$tabPanelSelected.hidden = true;
	}
}

$tabList.forEach(($tab, index) => {
	generadorTabs(index);
	$tab.addEventListener("click", handleSelectTabClick);
	if (index === 0) {
		$tab.textContent = "Hoy";
		today = nextDay(today);
		return false;
	}
	$tab.textContent = week[today];
	today = nextDay(today);
});
