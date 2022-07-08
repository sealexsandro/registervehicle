package com.wipro.registervehicle.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.wipro.registervehicle.model.enums.RecordVehicleStatus;

@Entity
@Table(name = "tb_vehicles")
public class VehicleRecord implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "request_id")
	private Long requestId;
	private String name;
	private String address;
	private String gender;
	private Integer age;
	@Column(name = "rto_office")
	private String rtoOffice;
	
	@Column(name = "insurance_number")
	private String insuranceNumber;
	
	@Column(name = "vehicle_type")
	private String vehicleType;
	
	@Column(name = "engine_number")
	private String engineNumber;
	private String model;
	private String make;
	
	@Column(name = "dl_number")
	private String dlNumber;
	
	@Column(name = "plate_number")
	private String plateNumber;
	
	@Column(name = "record_status")
	@Enumerated(EnumType.STRING)
	private RecordVehicleStatus recordStatus;

	public VehicleRecord() {
		setPlateNumber("-");
		setRecordStatus(RecordVehicleStatus.PENDING);
	}

	public Long getId() {
		return id;
	}

	public Long getRequestId() {
		return requestId;
	}

	public String getName() {
		return name;
	}

	public String getAddress() {
		return address;
	}

	public String getGender() {
		return gender;
	}

	public int getAge() {
		return age;
	}

	public String getRtoOffice() {
		return rtoOffice;
	}

	public String getInsuranceNumber() {
		return insuranceNumber;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public String getEngineNumber() {
		return engineNumber;
	}

	public String getModel() {
		return model;
	}

	public String getMake() {
		return make;
	}

	public String getDlNumber() {
		return dlNumber;
	}

	public String getPlateNumber() {
		return plateNumber;
	}

	public RecordVehicleStatus getRecordStatus() {
		return recordStatus;
	}

	public void setRecordStatus(RecordVehicleStatus recordStatus) {
		this.recordStatus = recordStatus;
	}

	public void setPlateNumber(String plateNumber) {
		this.plateNumber = plateNumber;
	}

	public void setRequestId(Long requestId) {
		this.requestId = requestId;
	}

	@Override
	public String toString() {
		return "VehicleRecord [id=" + id + ", requestId=" + requestId + ", name=" + name + ", address=" + address
				+ ", gender=" + gender + ", age=" + age + ", rtoOffice=" + rtoOffice + ", insuranceNumber="
				+ insuranceNumber + ", vehicleType=" + vehicleType + ", engineNumber=" + engineNumber + ", model="
				+ model + ", make=" + make + ", dlNumber=" + dlNumber + ", plateNumber=" + plateNumber + "]";
	}

}
