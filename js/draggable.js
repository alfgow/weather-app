const defaultConfig = {
	open: true,
	debug: true,
	animatable: true,
};

function draggable($element, config = defaultConfig) {
	if (!($element instanceof HTMLElement)) {
		return console.warn(`Elemento Invalido en Draggable`);
	}

	let isOpen = config.open;
	let isDragging = false;
	let startY = 0;
	const elementRect = $element.getBoundingClientRect();
	const ELEMENT_BLOCK_SIZE = elementRect.height;
	const $marker = $element.querySelector("[data-marker]");
	const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height;

	const VISIBLE_Y_POSITION = 0;
	const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE;
	let widgetPosition = VISIBLE_Y_POSITION;

	console.log(HIDDEN_Y_POSITION);

	isOpen ? open() : close();

	$marker.addEventListener("click", handleClick);
	$marker.addEventListener("pointerdown", handlePointerDown);
	$marker.addEventListener("pointerup", handlePointerUp);
	$marker.addEventListener("pointerout", handlePointerOut);
	$marker.addEventListener("pointercancel", handlePointerCancel);
	$marker.addEventListener("pointermove", handlePointerMove);

	function handleClick(event) {
		logger("click");
		toggle();
	}
	function handlePointerDown(event) {
		logger("Pointer Down");
		startDrag(event);
	}
	function handlePointerUp(event) {
		logger("Pointer Up");
	}
	function handlePointerOut(event) {
		logger("Pointer Out");
	}
	function handlePointerCancel(event) {
		logger("Pointer Cancel");
	}
	function handlePointerMove(event) {
		logger("Pointer Move");
		drag(event);
	}

	function pageY(event) {
		return event.pageY || event.touches[0].pageY;
	}

	function startDrag(event) {
		isDragging = true;
		startY = pageY(event);
	}

	function toggle() {
		if (!isDragging) {
			if (!isOpen) return open();
			return close();
		}
	}

	function logger(msj) {
		if (config.debug) {
			console.info(msj);
		}
	}

	function open() {
		logger("Abrir Widget");
		isOpen = true;
		widgetPosition = VISIBLE_Y_POSITION;
		setWidgetPosition(widgetPosition);
	}

	function close() {
		logger("Cerrar Widget");
		isOpen = false;
		widgetPosition = HIDDEN_Y_POSITION;
		setWidgetPosition(widgetPosition);
	}

	function setWidgetPosition(value) {
		$element.style.marginBottom = `-${value}px`;
	}

	function drag(event) {
		const cursorY = pageY(event);
		const movementY = cursorY - startY;
		widgetPosition = widgetPosition + movementY;
		startY = cursorY;
		setWidgetPosition(widgetPosition);
	}
}

export { draggable };
