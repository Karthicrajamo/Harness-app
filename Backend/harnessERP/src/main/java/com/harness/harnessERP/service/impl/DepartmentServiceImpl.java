package com.harness.harnessERP.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.harness.harnessERP.model.Department;
import com.harness.harnessERP.repository.DepartmentRepository;
import com.harness.harnessERP.service.DepartmentServiceInterface;



@Service
public class DepartmentServiceImpl implements DepartmentServiceInterface{
	
	private final DepartmentRepository departmentServiceRepository;
	
	@Autowired
	public DepartmentServiceImpl(DepartmentRepository departmentServiceRepository) {
		this.departmentServiceRepository = departmentServiceRepository;
	}

	
	
	@Override
	public List<Department> getAllDepartments() {
	    try {
	        Optional<List<Department>> listOfDepartmentOptional = Optional.ofNullable(departmentServiceRepository.findAll());
	        
	        if (!listOfDepartmentOptional.isPresent() || listOfDepartmentOptional.get().isEmpty()) {
	            return Collections.emptyList(); // Return an empty list if no departments found
	        }
	        
	        List<Department> listOfDepartment = listOfDepartmentOptional.get();
	        System.out.println("List of departments: " + listOfDepartment);
	        return listOfDepartment;
	        
	    } catch (NoSuchElementException | IllegalStateException e) {
	        // Handle specific exceptions that might occur with Optional or repository
	        throw new RuntimeException("Error retrieving departments", e);
	    } catch (Exception e) {
	        // Handle other unexpected exceptions
	        throw new RuntimeException("Unexpected error retrieving departments", e);
	    }
	}

}
