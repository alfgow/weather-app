function setViewportSize($el) {
	const viewportBlockSize = getViewport();
	$el.style.blockSize = `${viewportBlockSize}px`;
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

export { getViewport, onViewportResize, offViewportResize, viewportSize };
