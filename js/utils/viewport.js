function setViewportSize($el) {
	const viewPortBlockSize = getViewport();
	$el.style.blockSize = `${viewPortBlockSize}px`;
}

function getViewport() {
	return window.innerHeight;
}

function onViewportResize(callback) {
	window.addEventListener("resize", callback);
}

function offViewportResize(callback) {
	window.removeEventListener("resize", callback);
}

function viewportSize($el) {
	setViewportSize($el);
	onViewportResize(() => setViewportSize($el));
}

export {
	setViewportSize,
	getViewport,
	onViewportResize,
	offViewportResize,
	viewportSize,
};
