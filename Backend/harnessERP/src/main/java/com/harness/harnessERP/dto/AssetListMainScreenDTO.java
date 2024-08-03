package com.harness.harnessERP.dto;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;


public class AssetListMainScreenDTO {
	
		String assetCode;
		
	    String status;
	    	    
	    String type;	    
	    
	    String classificationName;
	    	    	   	    
	    String deptName;
	    	    
	    String subDeptName;
	     
	    String locationName;
	    
	    String subLocation;

	    BigDecimal matNo;
	    
	    String category;
		
	    Long assetId;
	    
	    BigDecimal poNo;
	    
	    String custSpec;
	    
        String supplierName;
	    
	    Date acquisitionDate;
	    
	    BigDecimal salvageVal;
	    
	    BigDecimal lifetimeOfAssetValue;
	    
	    BigDecimal purchaseVal;
	    
	    BigDecimal bookValue;
	    
	    String ownerShip;
	    
	    
	    
	    
	    
	    public Long getAssetId() {
			return assetId;
		}

		public void setAssetId(Long assetId) {
			this.assetId = assetId;
		}

		public String getOwnerShip() {
			return ownerShip;
		}

		public void setOwnerShip(String ownerShip) {
			this.ownerShip = ownerShip;
		}

		public Date getAcquisitionDate() {
			return acquisitionDate;
		}

		public void setAcquisitionDate(Date acquisitionDate) {
			this.acquisitionDate = acquisitionDate;
		}

		public BigDecimal getSalvageVal() {
			return salvageVal;
		}

		public void setSalvageVal(BigDecimal salvageVal) {
			this.salvageVal = salvageVal;
		}

		public BigDecimal getLifetimeOfAssetValue() {
			return lifetimeOfAssetValue;
		}

		public void setLifetimeOfAssetValue(BigDecimal lifetimeOfAssetValue) {
			this.lifetimeOfAssetValue = lifetimeOfAssetValue;
		}

		public BigDecimal getPurchaseVal() {
			return purchaseVal;
		}

		public void setPurchaseVal(BigDecimal purchaseVal) {
			this.purchaseVal = purchaseVal;
		}

		public BigDecimal getBookValue() {
			return bookValue;
		}

		public void setBookValue(BigDecimal bookValue) {
			this.bookValue = bookValue;
		}

		public String getSupplierName() {
			return supplierName;
		}

		public void setSupplierName(String supplierName) {
			this.supplierName = supplierName;
		}

		public String getCustSpec() {
			return custSpec;
		}

		public void setCustSpec(String custSpec) {
			this.custSpec = custSpec;
		}

		public BigDecimal getPoNo() {
			return poNo;
		}

		public void setPoNo(BigDecimal poNo) {
			this.poNo = poNo;
		}

		

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public BigDecimal getMatNo() {
			return matNo;
		}

		public void setMatNo(BigDecimal matNo) {
			this.matNo = matNo;
		}

		public String getAssetCode() {
			return assetCode;
		}

		public void setAssetCode(String assetCode) {
			this.assetCode = assetCode;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		
		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getClassificationName() {
			return classificationName;
		}

		public void setClassificationName(String classificationName) {
			this.classificationName = classificationName;
		}


		public String getDeptName() {
			return deptName;
		}

		public void setDeptName(String deptName) {
			this.deptName = deptName;
		}

		public String getSubDeptName() {
			return subDeptName;
		}

		public void setSubDeptName(String subDeptName) {
			this.subDeptName = subDeptName;
		}

		public String getLocationName() {
			return locationName;
		}

		public void setLocationName(String locationName) {
			this.locationName = locationName;
		}

		public String getSubLocation() {
			return subLocation;
		}

		public void setSubLocation(String subLocation) {
			this.subLocation = subLocation;
		}
	   
		
		
	    
}
