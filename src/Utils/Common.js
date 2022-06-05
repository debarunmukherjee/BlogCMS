const formatDateYYYYMMDD = (date) => {
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1;
	let dd = date.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	return yyyy + '-' + mm + '-' + dd;
}

const getErrorMessage = (errors) => {
  	let msg = "";
	if (!errors) {
		msg = "An unexpected error occurred";
	} else if (Array.isArray(errors)) {
		msg = "<ul>";
		errors.forEach((error) => {
			msg += `<li>${error.msg}</li>`;
		})
		msg += "</ul>";
	} else if (typeof errors === 'string') {
		msg = errors;
	}
	return msg;
}
export {
	formatDateYYYYMMDD,
	getErrorMessage
}
