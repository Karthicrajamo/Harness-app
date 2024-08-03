package com.harness.harnessERP.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.harness.harnessERP.model.FaLocationMaster;

@Repository
public interface FaLocationMasterRepository extends JpaRepository<FaLocationMaster, Long>{
	
	@Query("SELECT f FROM FaLocationMaster f")
	public List<FaLocationMaster> findAll();
}
