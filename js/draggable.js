const defaultConfig = {
	open: true,
	debug: true,
	animatable: true,
};
function draggable($element, config = defaultConfig) {
	if (!($element instanceof HTMLElement)) {
		return console.warn(
			`Elemento inválido se esperaba un HTMLElement y se recibió ${$element}`
		);
	}

	let isOpen = config.open;
	let isDragging = false;
	const elementRect = $element.getBoundingClientRect();
	const ELEMENT_BLOCK_SIZE = elementRect.height;
	const $marker = $element.querySelector("[data-marker]");
	const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height;

	const VISIBLE_Y_POSITION = 0;
	const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE;
	let widgetPosition = VISIBLE_Y_POSITION;
	isOpen ? open() : close();
	let startY = 0;

	$marker.addEventListener("click", handleClick);
	$marker.addEventListener("pointerdown", handlePointerDown);
	$marker.addEventListener("pointerup", handlePointerUp);
	$marker.addEventListener("pointerout", handlePointerOut);
	$marker.addEventListener("pointercancel", handlePointerCancel);
	$marker.addEventListener("pointermove", handlePointerMove);

	if (config.animatable) {
		setAnimations();
	}

	function handlePointerDown(event) {
		logger("pointer down");
		startDrag(event);
	}

	function handlePointerUp() {
		logger("pointer up");
		dragEnd();
	}

	function handlePointerOut() {
		logger("pointer out");
		dragEnd();
	}

	function handlePointerCancel() {
		logger("pointer cancel");
		dragEnd();
	}

	function handlePointerMove(event) {
		logger("pointer move");
		drag(event);
	}

	function handleClick(event) {
		logger("click");
		toggle();
	}

	function pageY(event) {
		return event.pageY || event.touches[0].pageY;
	}

	function startDrag(event) {
		isDragging = true;
		startY = pageY(event);
	}

	function bounce() {
		if (widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
			return open();
		}
		return close();
	}

	function dragEnd() {
		logger("drag End");
		isDragging = false;
		bounce();
	}

	function setAnimations() {
		$element.style.transition = "margin-bottom .3s";
	}

	function toggle() {
		if (!isDragging) {
			if (!isOpen) {
				return open();
			}
			return close();
		}
	}

	function logger(message) {
		if (config.debug) {
			console.info(message);
		}
	}

	function open() {
		logger("Modulo abiero");
		isOpen = true;
		widgetPosition = VISIBLE_Y_POSITION;
		setWidgetPosition(widgetPosition);
	}

	function close() {
		logger("Modulo cerrado");
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
		logger(movementY);
		startY = cursorY;
		if (widgetPosition > HIDDEN_Y_POSITION) {
			return false;
		}
		setWidgetPosition(widgetPosition);
	}
}

export { draggable };
