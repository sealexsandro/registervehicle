
const url = window.location.href;

const customerLogged = JSON.parse(localStorage.getItem('customer'));

const numbersRegex = /[0-9]/;
const lettersRegex = /[aA-zZ]+/;

var divErr = document.getElementById('errors');

function showMsg(text) {
	divErr.style.display = 'block';
	divErr.textContent = text;
}


function saveVehicleRecord() {

	let formMap = new Map();

	formMap.set("name", $('#name').val().trim());
	formMap.set("address", $('#address').val().trim());
	formMap.set("gender", $('#gender').val().trim());
	formMap.set("age", $('#age').val().trim());

	let selectedRtoOffice = $('#RTOOffice').val();
	formMap.set("rtoOffice", selectedRtoOffice);

	formMap.set("insuranceNumber", $('#insuranceNumber').val().trim());

	let selectedVehicleType = $('#vehicleType').val();
	formMap.set("vehicleType", selectedVehicleType);

	formMap.set("engineNumber", $('#engineNo').val().trim());
	formMap.set("model", $('#model').val().trim());
	formMap.set("make", $('#make').val().trim());
	formMap.set("dlNumber", $('#DLNumber').val().trim());


	if (isInputEmpty(formMap)) {
		showMsg("Invalid Input");
		return;
	}

	if (isInvalid(formMap)) {
		showMsg("Invalid Input");
		return;
	}
	showMsg("");
	saveVehicleRecordRequest(formMap);


}

function isInputEmpty(formMap) {
	for (const [key, value] of formMap.entries()) {

		if (value.length <= 0) {
			return true;
		}
	}
	return false;
}

function isInvalid(formMap) {

	for (const [key, value] of formMap.entries()) {

		if (key == "name") {
			if (checkSize(value, 0, 25) || numbersRegex.test(value)) {
				return true;
			}
		} else if (key == "address") {
			if (checkSize(value, 0, 100)) {
				return true;
			}
		} else if (key == "age") {
			if ((value < 18) || (value > 50)) {
				return true;
			}
		} else if (key == "gender") {
			if (checkSize(value, 0, 8) || numbersRegex.test(value)) {
				return true;
			}
		} else if (key == "insuranceNumber") {
			if (checkSize(value, 6, 10) || !isAlphanumeric(value)) {
				return true;
			}
		} else if (key == "engineNumber") {
			if (checkSize(value, 8, 10) || !isAlphanumeric(value)) {
				return true;
			}
		} else if (key == "model") {
			if (checkSize(value, 0, 25) || numbersRegex.test(value)) {
				return true;
			}
		} else if (key == "make") {
			if (checkSize(value, 0, 25) || numbersRegex.test(value)) {
				return true;
			}
		} else if (key == "dlNumber") {
			if (checkSize(value, 8, 15) || !isAlphanumeric(value)) {
				return true;
			}
		}
	}
}


function checkSize(value, minimumSize, maximumSize) {
	return value.length < minimumSize || value.length > maximumSize;
}

function isAlphanumeric(value) {
	return numbersRegex.test(value) && lettersRegex.test(value);
}

function saveVehicleRecordRequest(formMap) {
	const vehicleRecordJson = JSON.stringify(Object.fromEntries(formMap));

	const url_api = `${url}/${customerLogged}`;

	$.ajax({
		type: "POST",
		url: url_api,
		data: vehicleRecordJson,
		contentType: "application/json"

	}).done(function(data) {

		if (data) {
			showMsg("Registration Successful");
			$('#register').attr("disabled", true);
			$('#register').addClass("offButtons");

		} else {
			showMsg("Could not save");
		}

	});
}

function keepDataSavedOnPage() {


	const url_api = `${url}/findRecordPending/${customerLogged}`;


	$.ajax({
		type: "GET",
		url: url_api,
	}).done(function(data) {

		if (Object.entries(data).length > 0) {
			const vehicleRecordSaved = data;

			showMsg("Registration Successful");

			$('#name').val(vehicleRecordSaved.name);
			$('#address').val(vehicleRecordSaved.address);
			$('#gender').val(vehicleRecordSaved.gender);
			$('#age').val(vehicleRecordSaved.age);

			$("#RTOOffice").val($(`option:contains(${vehicleRecordSaved.rtoOffice})`).val());

			$('#insuranceNumber').val(vehicleRecordSaved.insuranceNumber);

			$("#vehicleType").val($(`option:contains(${vehicleRecordSaved.vehicleType})`).val());

			$('#engineNo').val(vehicleRecordSaved.engineNumber);
			$('#model').val(vehicleRecordSaved.model);
			$('#make').val(vehicleRecordSaved.make);
			$('#DLNumber').val(vehicleRecordSaved.dlNumber);

			$('#register').attr("disabled", true);
			$('#register').addClass("offButtons");
		} else {
			showMsg("");
			$('#register').attr("disabled", false);
			$('#register').removeClass("offButtons");
		}
	})

}

//keepDataSavedOnPage();








