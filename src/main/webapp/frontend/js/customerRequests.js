
const url = window.location.href;  

var divErr = document.getElementById('errors');

function showMsg(text) {
	divErr.style.display = 'block';
	divErr.textContent = text;
}


function getAllVehicleRecords() {

	clearTable();

	let customerLogged = JSON.parse(localStorage.getItem('customer'));

	const url_api = `${url}/${customerLogged}`;

	$.ajax({
		type: "GET",
		url: url_api,
	}).done(function(data) {
		if (data.length > 0) {
			showDataTable(data);
		}else{
			showMsg("No vehicles registered yet");
		}
	})
}

function showDataTable(records){
	
	let divTable = document.getElementById('boxDataTable');
	divTable.style.display = 'block';
	
	let table = document.getElementById('dataTable');
	
	records.forEach(function(record, index){
		var tr = document.createElement('tr');
		
		var tdRequestId = document.createElement('td');
		tdRequestId.innerHTML = record.requestId;
		tdRequestId.setAttribute("id","requestId" + (index+1));
		
		var tdName = document.createElement('td');
		tdName.innerHTML = record.name;
		tdName.setAttribute("id","name" + (index+1));
		
		var tdMake = document.createElement('td');
		tdMake.innerHTML = record.make;
		tdMake.setAttribute("id","make" + (index+1));
		
		var tdModel = document.createElement('td');
		tdModel.innerHTML = record.model;
		tdModel.setAttribute("id","model" + (index+1));
		
		var tdRtoOffice = document.createElement('td');
		tdRtoOffice.innerHTML = record.rtoOffice;
		tdRtoOffice.setAttribute("id","RTOOffice" + (index+1));
		
		var tdPlateNumber = document.createElement('td');
		tdPlateNumber.innerHTML = record.plateNumber;
		tdPlateNumber.setAttribute("id","plateNo" + (index+1));
		
		var tdStatus = document.createElement('td');
		tdStatus.innerHTML = record.recordStatus;
		tdStatus.setAttribute("id","status" + (index+1));
		
		tr.appendChild(tdRequestId);
		tr.appendChild(tdName);
		tr.appendChild(tdMake);
		tr.appendChild(tdModel);
		tr.appendChild(tdRtoOffice);
		tr.appendChild(tdPlateNumber);
		tr.appendChild(tdStatus);
		
		table.appendChild(tr);		
	})	
}

function clearTable(){
  let table = document.getElementById('dataTable');
  var linhas = table.rows;
  
  for (var i = linhas.length-1; i > 0; i--){
    table.deleteRow(i);
  }
  document.getElementById('boxDataTable').style.display = 'none';

}


getAllVehicleRecords();








