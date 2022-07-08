package com.wipro.registervehicle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.registervehicle.model.VehicleRecord;
import com.wipro.registervehicle.repository.VehicleRepository;

@Service
public class VehicleRecordService {

	@Autowired
	private VehicleRepository vehicleRepository;

	public VehicleRecord updateRecord(VehicleRecord vehicleRecord) {
		return vehicleRepository.save(vehicleRecord);
	}

	public String generatePlateNumber(String rtoOffice) {

		VehicleRecord vehicleRecord = vehicleRepository.findLastRecord();

		// Exemplo: TN-11–1000
		String stateLetters = getLettersOfState(rtoOffice);
		String officeLetters = rtoOfficeLetters(rtoOffice);
		String plateNumber = stateLetters + "-" + officeLetters;
		int lastPlateNumber = 0;

		if (vehicleRecord != null && vehicleRecord.getPlateNumber() != null
				&& !vehicleRecord.getPlateNumber().equalsIgnoreCase("-")) {
			String plateNumberText = vehicleRecord.getPlateNumber().substring(6);

			lastPlateNumber = Integer.parseInt(plateNumberText);
			lastPlateNumber += 1;
		} else {
			lastPlateNumber = 1000;
		}
		plateNumber += "-" + lastPlateNumber;
		return plateNumber;
	}

	public String getLettersOfState(String rtoOffice) {

		if (rtoOffice.equalsIgnoreCase("Chennai")) {
			return "TN";
		} else if (rtoOffice.equalsIgnoreCase("Hyderabad")) {
			return "AP";
		} else if (rtoOffice.equalsIgnoreCase("Délhi")) {
			return "DL";
		} else if (rtoOffice.equalsIgnoreCase("Pune")) {
			return "MH";
		} else if (rtoOffice.equalsIgnoreCase("Bangalore")) {
			return "KA";
		}
		return "";
	}

	public String rtoOfficeLetters(String rtoOffice) {

		if (rtoOffice.equalsIgnoreCase("Chennai")) {
			return "11";
		} else if (rtoOffice.equalsIgnoreCase("Hyderabad")) {
			return "42";
		} else if (rtoOffice.equalsIgnoreCase("Délhi")) {
			return "03";
		} else if (rtoOffice.equalsIgnoreCase("Pune")) {
			return "54";
		} else if (rtoOffice.equalsIgnoreCase("Bangalore")) {
			return "15";
		}
		return "";
	}
}
