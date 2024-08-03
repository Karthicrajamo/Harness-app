package com.harness.harnessERP.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harness.harnessERP.model.Department;
import com.harness.harnessERP.service.DepartmentServiceInterface;
@RestController
@RequestMapping("api/department")
public class DepartmentController {
	
	private final DepartmentServiceInterface departmentServiceInterface;
	
	@Autowired
	public DepartmentController(DepartmentServiceInterface departmentServiceInterface) {
		this.departmentServiceInterface = departmentServiceInterface;
	}
	

	@GetMapping("/allDepartments")
	public ResponseEntity<List<Department>> getAllDepartments(){
		return ResponseEntity.status(HttpStatus.OK).body(departmentServiceInterface.getAllDepartments());
		
	}

}
