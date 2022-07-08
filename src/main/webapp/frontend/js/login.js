
const url = window.location.href;  

var divErr = document.getElementById('errors');

function homeViewRequest() {
	const url_api = `${url}/homeadmin`;

	$.ajax({
		type: "GET",
		url: url_api
	});
}

function loginRequest(username, password) {

	let url_api;
	let newUrl = url.substring(0, (url.length - 6 ));
	newUrl = newUrl+"/login";
	
	console.log(url);
	console.log(newUrl);
	
	if(url == newUrl){
		url_api = `${url}/moveon/${username}/${password}`;
	}else{
		url_api = `${url}/login/moveon/${username}/${password}`;
	}
//	
	$.ajax({
		type: "GET",
		url: url_api,
	}).done(function(data) {
		if (data) {
			const user = data;
			document.getElementById("userID").value = "";
			document.getElementById("password").value = "";

			if (user.userType === "ADMIN") {
				localStorage.setItem('admin', JSON.stringify(user.username));

				window.location.href = "adminHome";
			} else if (user.userType === "CUSTOMER") {
				localStorage.setItem('customer', JSON.stringify(user.username));
				window.location.href = "newRegistration";
			}
		} else {
			showErr("Invalid username or password");
		}
	})
}


function login() {

	var inputUsername = document.getElementById("userID").value.trim();
	var inputPassword = document.getElementById("password").value.trim();

	if (inputUsername.length <= 0 || inputPassword.length <= 0) {
		showErr("Invalid Input");
	} else if (inputUsername.length < 8 || inputUsername.length > 16) {
		showErr("Invalid Input");
	} else if (inputPassword.length < 8 || inputPassword.length > 16) {
		showErr("Invalid Input");
	} else {
		loginRequest(inputUsername, inputPassword);
	}
}

function showErr(text) {
	divErr.style.display = 'block'
	divErr.textContent = text;
}

function clearStorage() {
	localStorage.clear();
}

clearStorage();
