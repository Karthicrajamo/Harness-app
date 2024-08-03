package com.harness.harnessERP.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.harness.harnessERP.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long>{
	
	@Query("SELECT d FROM Department d")
	public List<Department> findAll();
	
	
}
