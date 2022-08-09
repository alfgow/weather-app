function createDOM(string) {
	const parser = new DOMParser();
	const HTML = parser.parseFromString(string, "text/html");
	const HTMLelement = HTML.body.firstChild;
	return HTMLelement;
}
export { createDOM };
