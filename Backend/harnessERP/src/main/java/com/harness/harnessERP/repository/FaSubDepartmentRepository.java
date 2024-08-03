package com.harness.harnessERP.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.harness.harnessERP.model.FaSubDepartment;

public interface FaSubDepartmentRepository extends JpaRepository<FaSubDepartment, BigDecimal>{
	
	@Query("SELECT DISTINCT f.subDeptName FROM FaSubDepartment f")
	List<String> findDistinctSubDeptNames();
}
