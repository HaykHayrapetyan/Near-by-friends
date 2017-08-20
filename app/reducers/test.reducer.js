export default (text = '', action) => {
	switch (action.type) {
		case "CHANGE":
			return action.text;
		default:
			return text;
	}
}