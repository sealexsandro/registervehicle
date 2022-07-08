package com.wipro.registervehicle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wipro.registervehicle.model.VehicleRecord;


@Repository
public interface VehicleRepository extends JpaRepository<VehicleRecord, Long> {

	@Query(value = "SELECT MAX(id) FROM tb_vehicles", nativeQuery = true)
	public Long findLastRecordIndex();

	@Query(value = "SELECT * FROM tb_vehicles v WHERE v.id=(SELECT max(vr.id) FROM tb_vehicles vr WHERE vr.plate_number IS NOT NULL AND vr.plate_number != '-')", nativeQuery = true)
	public VehicleRecord findLastRecord();

	@Query(value = "SELECT * FROM tb_vehicles v WHERE v.id=(SELECT max(vr.id) FROM tb_vehicles vr "
			+ "WHERE vr.record_status = :status AND vr.user_id = :userId)", nativeQuery = true)
	public VehicleRecord findLastRecordPending(@Param(value = "status") String status, @Param(value = "userId") Long userId);

	@Query(value = "SELECT * FROM tb_vehicles v where (v.record_status = :status and v.rto_office = :rtoOffice)", nativeQuery = true)
	public List<VehicleRecord> findAllRecordByStatusAndOffice(@Param(value = "status") String status,
			@Param(value = "rtoOffice") String rtoOffice);

}
