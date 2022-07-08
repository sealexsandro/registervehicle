package com.wipro.registervehicle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.registervehicle.model.User;
import com.wipro.registervehicle.model.VehicleRecord;
import com.wipro.registervehicle.service.UserService;
import com.wipro.registervehicle.service.VehicleRecordService;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private VehicleRecordService recordService;

	@GetMapping("login/moveon/{username}/{password}")
	public ResponseEntity<User> login(@PathVariable String username, @PathVariable String password) {
		User user = userService.findUser(username, password);
		return ResponseEntity.ok().body(user);
	}
	
	@PostMapping("/newRegistration/{username}")
	public ResponseEntity<VehicleRecord> saveVehicleRegistrationRequest(@PathVariable String username,
			@RequestBody VehicleRecord vehicleRecord) {
		return ResponseEntity.ok().body(userService.saveVehicleRegistrationRequest(username, vehicleRecord));
	}

	@GetMapping("/newRegistration/findRecordPending/{username}")
	public ResponseEntity<VehicleRecord> findRecordPending(@PathVariable String username) {
		return ResponseEntity.ok().body(userService.findRecordPending(username));
	}

	@GetMapping("/myRequests/{username}")
	public ResponseEntity<List<VehicleRecord>> getAllRequests(@PathVariable String username) {

		List<VehicleRecord> records = userService.findAllRecordsRequests(username);

		return ResponseEntity.ok().body(records);
	}

	@GetMapping("/adminHome/{status}/{rtoOffice}")
	public ResponseEntity<List<VehicleRecord>> getAllRequestsByStatusAndOffice(@PathVariable String status,
			@PathVariable String rtoOffice) {

		List<VehicleRecord> records = userService.findAllRecordByStatusAndOffice(status, rtoOffice);
		return ResponseEntity.ok().body(records);
	}

	@GetMapping("/reqValidate/newPlateNumber/{rtoOffice}")
	public ResponseEntity<String> getPlateNumber(@PathVariable String rtoOffice) {

		String plateNumber = recordService.generatePlateNumber(rtoOffice);

		return ResponseEntity.ok().body(plateNumber);
	}

	@PutMapping("/reqValidate/updateVehicleRecord")
	public ResponseEntity<VehicleRecord> updateRecord(@RequestBody VehicleRecord vehicleRecord) {
		return ResponseEntity.ok().body(recordService.updateRecord(vehicleRecord));
	}

}
