package com.harness.harnessERP.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.harness.harnessERP.dto.AssetDetailsSubScreenDTO;
import com.harness.harnessERP.dto.AssetDetailsSubScreenDataDTO;
import com.harness.harnessERP.dto.AssetListMainScreenDTO;
import com.harness.harnessERP.dto.FaAssetRegisterImageDTO;
import com.harness.harnessERP.filterCriteria.AssetListMainFilterCriteria;
import com.harness.harnessERP.model.Department;
import com.harness.harnessERP.model.FaAssetRegisterDetails;
import com.harness.harnessERP.model.FaAssetRegisterImage;
import com.harness.harnessERP.model.FaLocationMaster;

import com.harness.harnessERP.service.DepartmentServiceInterface;
import com.harness.harnessERP.service.FaAssetListDetailsServiceInterface;
import com.harness.harnessERP.service.FaLocationMasterServiceInterface;

@RestController
@RequestMapping("/api/assetList")
public class AssetListController {
	
	private final DepartmentServiceInterface departmentServiceInterface;
	private final FaLocationMasterServiceInterface faLocationMasterServiceInterface;
	private final FaAssetListDetailsServiceInterface faAssetListDetailsServiceInterface;
	
	@Autowired
	public AssetListController(DepartmentServiceInterface departmentServiceInterface,
		FaLocationMasterServiceInterface faLocationMasterServiceInterface,
		FaAssetListDetailsServiceInterface faAssetListDetailsServiceInterface) {
		
		this.departmentServiceInterface = departmentServiceInterface;
		this.faLocationMasterServiceInterface = faLocationMasterServiceInterface;
		this.faAssetListDetailsServiceInterface = faAssetListDetailsServiceInterface;
	}
	
	@GetMapping("/allDepartments")
	public ResponseEntity<List<Department>> getAllDepartments(){
		return ResponseEntity.status(HttpStatus.OK).body(departmentServiceInterface.getAllDepartments());
		
	}
	
	@GetMapping("/allLocations")
	public ResponseEntity<List<FaLocationMaster>> getAllFaLocationMaster(){
		return ResponseEntity.status(HttpStatus.OK).body(faLocationMasterServiceInterface.getAllFaLocationMaster());
	}
	
	@GetMapping("/distinctStatuses")
	public ResponseEntity<List<String>> getDistinctStatuses(){
		return ResponseEntity.status(HttpStatus.OK).body(faAssetListDetailsServiceInterface.getDistinctStatuses());
	}
	@GetMapping("/mainFilters/normal")
	public ResponseEntity<List<AssetListMainScreenDTO>> getAssetListMainScreenDTO(@RequestBody AssetListMainFilterCriteria criteria){
		return ResponseEntity.status(HttpStatus.OK).body(faAssetListDetailsServiceInterface.getAssetListMainScreenFilteredDetails(criteria));
	}
	
	@PostMapping("/mainFilters")
	public ResponseEntity<Page<AssetListMainScreenDTO>> getAssetListMainScreenDTO(@RequestBody AssetListMainFilterCriteria criteria,@RequestParam(name="currentPage",defaultValue = "0") int currentPage,@RequestParam(name="sizePerPage",defaultValue = "8") int sizePerPage){
		return ResponseEntity.status(HttpStatus.OK).body(faAssetListDetailsServiceInterface.getAssetListMainScreenFilteredDetails(criteria, currentPage, sizePerPage));
	}
	
	@PostMapping("/assetSubDetailsValue")
	public ResponseEntity <AssetDetailsSubScreenDTO> getAssetDetailsByAssetId(@RequestParam(name="assetId") Long assetId) {
		return ResponseEntity.status(HttpStatus.OK).body(faAssetListDetailsServiceInterface.getAssetDetailsByAssetId(assetId));
	}
	
	@PostMapping("/assetSubDetailsLabel")
	public ResponseEntity <List<AssetDetailsSubScreenDataDTO>> getAssetDetailsDataByAssetId(@RequestParam(name="type") String type){
        return ResponseEntity.status(HttpStatus.OK).body(faAssetListDetailsServiceInterface.getAssetDetailsDataByAssetId(type));
    }

	@GetMapping("/assetImage")
	public ResponseEntity<List<FaAssetRegisterImageDTO>> getAssetImageById(@RequestParam(name = "assetId") Long assetId) {
		List<FaAssetRegisterImageDTO> faAssetRegisterImage = faAssetListDetailsServiceInterface.getAssetImageById(assetId);
		
		if(faAssetRegisterImage != null) {
			 return ResponseEntity.status(HttpStatus.OK).body((faAssetRegisterImage));
		}
		else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body((null));
		}
		
	}
	
	
//	public ResponseEntity<List<FaAssetRegisterDetails>> getAllFaAssetRegisterDetails(){
//		return ResponseEntity.status(HttpStatus.OK).body(faAssetRegisterDetailsServiceInterface.getAllFaAssetRegisterDetails());
//	}
	
	

	
//	@GetMapping("/allDepartments")
//	public ResponseEntity<List<Department>> getAllDepartments() {
//	    List<Department> departments = departmentServiceInterface.getAllDepartments();
//	    if (departments.isEmpty()) {
//	        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(departments);
//	    }
//	    return ResponseEntity.status(HttpStatus.OK).body(departments);
//	}
}
