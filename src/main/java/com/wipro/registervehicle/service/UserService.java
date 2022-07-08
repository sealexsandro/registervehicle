package com.wipro.registervehicle.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.registervehicle.model.User;
import com.wipro.registervehicle.model.VehicleRecord;
import com.wipro.registervehicle.model.enums.RecordVehicleStatus;
import com.wipro.registervehicle.model.enums.UserType;
import com.wipro.registervehicle.repository.UserRepository;
import com.wipro.registervehicle.repository.VehicleRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private VehicleRepository vehicleRepository;

	private Long initialRecordIndex = 100000L;

	public User findUser(String username, String password) {
		return userRepository.findUserByUsernameAndPassword(username, password);
	}

	public VehicleRecord saveVehicleRegistrationRequest(String username, VehicleRecord vehicleRecord) {

		User user = userRepository.findByUsername(username);

		if (user != null) {
			Long requestId = initialRecordIndex;

			Long lastRecordIndex = vehicleRepository.findLastRecordIndex();

			if (lastRecordIndex != null) {
				requestId += lastRecordIndex;
			}

			vehicleRecord.setRequestId(requestId);
			user.addRecord(vehicleRecord);
			return updateUserRecords(user);
		} else {
			return null;
		}

	}

	public VehicleRecord updateUserRecords(User user) {

		User updatedUser = userRepository.save(user);

		int lastRecordIndex = updatedUser.getRecords().size() - 1;
		return updatedUser.getRecords().get(lastRecordIndex);
	}

	public List<VehicleRecord> findAllRecordsRequests(String username) {

		User user = userRepository.findByUsername(username);
		return user.getRecords();
	}

	public List<VehicleRecord> findAllRecordByStatusAndOffice(String status, String rtoOffice) {

		return vehicleRepository.findAllRecordByStatusAndOffice(status, rtoOffice);
	}

	public VehicleRecord findRecordPending(String username) {
		User user = userRepository.findByUsername(username);
		String status = RecordVehicleStatus.PENDING.toString();
		return vehicleRepository.findLastRecordPending(status, user.getId());
	}

}
