
const url = window.location.href;  


let divErr = document.getElementById('errors');
let allRecords;

function showMsg(text) {
	divErr.style.display = 'block';
	divErr.textContent = text;
}

function clearTable() {
	let table = document.getElementById('dataTable');
	let linhas = table.rows;

	for (let i = linhas.length - 1; i > 0; i--) {
		table.deleteRow(i);
	}
	document.getElementById('boxDataTable').style.display = 'none';
}

function searchRecordsRequests() {

	showMsg();
	clearTable();

	let recordStatus = $('#status').val();
	let rtoOffice = $('#RTOOffice').val();

	const url_api = `${url}/${recordStatus}/${rtoOffice}`;

	$.ajax({
		type: "GET",
		url: url_api,
	}).done(function(data) {
		if (data.length > 0) {
			allRecords = data;
			showDataTable(data);
		} else {
			showMsg("No records found");
		}
	})

}

function showDataTable(records) {

	let divTable = document.getElementById('boxDataTable');
	divTable.style.display = 'block';

	let table = document.getElementById('dataTable');

	records.forEach(function(record, index) {
		var tr = document.createElement('tr');

		var tdRequestId = document.createElement('td');
		var link = document.createElement('a');
		link.href = "reqValidate";
		link.innerHTML = record.requestId;
		link.setAttribute('onclick', "saveVehicleRegistration(" + index + ")");
		tdRequestId.appendChild(link);

		var tdName = document.createElement('td');
		tdName.innerHTML = record.name;
		tdName.setAttribute("id", "name" + (index + 1));

		var tdMake = document.createElement('td');
		tdMake.innerHTML = record.make;
		tdMake.setAttribute("id", "make" + (index + 1));

		var tdModel = document.createElement('td');
		tdModel.innerHTML = record.model;
		tdModel.setAttribute("id", "model" + (index + 1));

		var tdRtoOffice = document.createElement('td');
		tdRtoOffice.innerHTML = record.rtoOffice;
		tdRtoOffice.setAttribute("id", "RTOOffice" + (index + 1));

		var tdStatus = document.createElement('td');
		tdStatus.innerHTML = record.recordStatus;
		tdStatus.setAttribute("id", "status" + (index + 1));


		tr.appendChild(tdRequestId);
		tr.appendChild(tdName);
		tr.appendChild(tdMake);
		tr.appendChild(tdModel);
		tr.appendChild(tdRtoOffice);
		tr.appendChild(tdStatus);
		table.appendChild(tr);
	})
}

function saveVehicleRegistration(recordIndex) {

	if (allRecords.length > 0) {
		let vehicleRecord = allRecords[recordIndex];
		localStorage.setItem('editRecord', JSON.stringify(vehicleRecord));
	}
}




