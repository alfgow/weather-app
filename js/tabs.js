const $tabContainer = document.querySelector("#tabs");
const $tabList = $tabContainer.querySelectorAll(".tab");

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

function nextDay(today) {
	if (today === 6) {
		return 0;
	}
	return today + 1;
}

$tabList.forEach(($tab, index) => {
	if (index === 0) {
		$tab.textContent = "Hoy";
		today = nextDay(today);
		return false;
	}
	$tab.textContent = week[today];
	today = nextDay(today);
});
