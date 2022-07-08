
const url = window.location.href;  

let vehicleRecord = JSON.parse(localStorage.getItem('editRecord'));

var divErr = document.getElementById('errors');

function showMsg(text) {
	divErr.style.display = 'block';
	divErr.textContent = text;
}


function loadData() {

	if (vehicleRecord !== undefined) {

		$('#name').val(vehicleRecord.name);
		$('#address').val(vehicleRecord.address);
		$('#gender').val(vehicleRecord.gender);
		$('#age').val(vehicleRecord.age);

		$("#RTOOffice").val(vehicleRecord.rtoOffice);

		$('#insuranceNumber').val(vehicleRecord.insuranceNumber);

		$("#vehicleType").val(vehicleRecord.vehicleType);
		$('#engineNo').val(vehicleRecord.engineNumber);
		$('#model').val(vehicleRecord.model);
		$('#make').val(vehicleRecord.make);
		$('#DLNumber').val(vehicleRecord.dlNumber);
		
		if(vehicleRecord.recordStatus == "APPROVED" || vehicleRecord.recordStatus == "REJECTED"){
			$('#plateNo').val(vehicleRecord.plateNumber);
			offButtons();
		}
	} 
}



function approveVehicleRecord() {
	
	let rtoOffice = vehicleRecord.rtoOffice;
	let plateNumber;

	const url_api = `${url}/newPlateNumber/${rtoOffice}`;

	$.ajax({
		type: "GET",
		url: url_api,
	}).done(function(data) {
		if (data.length > 0) {
			plateNumber = data;
			$('#plateNo').val(plateNumber);
			vehicleRecord.plateNumber = plateNumber;
			vehicleRecord.recordStatus = "APPROVED";
			updateVehicleRecord();
		}
	})
}

function rejectVehicleRecord(){
	vehicleRecord.plateNumber = "-";
	vehicleRecord.recordStatus = "REJECTED";
	updateVehicleRecord();
	$('#plateNo').val(vehicleRecord.plateNumber);
}

function updateVehicleRecord() {
	
	const url_api = `${url}/updateVehicleRecord`;
	const vehicleRecordJson = JSON.stringify(vehicleRecord);

	$.ajax({
		type: "PUT",
		url: url_api,
		data: vehicleRecordJson,
		contentType: "application/json"
	}).done(function(data) {
		if (data) {
			showMsg("Request Processed Successfully");		
			offButtons();
			localStorage.setItem('editRecord', JSON.stringify(vehicleRecord));
		}
	})
}

function offButtons(){
	$('#approve').attr("disabled", true);
	$('#approve').addClass("offButtons");
	
	$('#reject').attr("disabled", true);
	$('#reject').addClass("offButtons");
}

loadData();