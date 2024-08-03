package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the FA_ASSET_REGISTER_DETAILS database table.
 * 
 */
@Entity
@Table(name="FA_ASSET_REGISTER_DETAILS")
@NamedQuery(name="FaAssetRegisterDetails.findAll", query="SELECT f FROM FaAssetRegisterDetails f")
public class FaAssetRegisterDetails implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ASSET_ID")
	private long assetId;

	@Temporal(TemporalType.DATE)
	@Column(name="ACQUISITION_DATE")
	private Date acquisitionDate;

	@Column(name="APPROVAL_REMARKS")
	private String approvalRemarks;

	@Column(name="APPROVAL_STATUS")
	private String approvalStatus;

	@Column(name="ASSET_CODE")
	private String assetCode;

	@Column(name="BATCH_ID")
	private BigDecimal batchId;

	@Column(name="BOOK_VALUE")
	private BigDecimal bookValue;

	@Column(name="CWIP_ID")
	private BigDecimal cwipId;
	
	@Column(name="DEPT_ID")
	private BigDecimal deptId;

	@Column(name="GRN_NO")
	private BigDecimal grnNo;

	@Column(name="LIFETIME_OF_ASSET_PERIOD")
	private String lifetimeOfAssetPeriod;

	@Column(name="LIFETIME_OF_ASSET_VALUE")
	private BigDecimal lifetimeOfAssetValue;

	@Column(name="LOCATION_ID")
	private BigDecimal locationId;

	@Column(name="MAT_NO")
	private BigDecimal matNo;

	@Column(name="MOD_REASON")
	private String modReason;

	@Column(name="PURCHASE_VAL")
	private BigDecimal purchaseVal;

	private String remarks;

	@Column(name="SALVAGE_VAL")
	private BigDecimal salvageVal;

	@Column(name="SERVICE_DEPT_ID")
	private BigDecimal serviceDeptId;

	private String status;

	@Column(name="SUB_DEPT_ID")
	private BigDecimal subDeptId;

	@Column(name="SUB_LOC_ID")
	private BigDecimal subLocId;

	@Temporal(TemporalType.DATE)
	@Column(name="WARRANTY_EXPIRY_DATE")
	private Date warrantyExpiryDate;

	@Column(name="WARRANTY_PERIOD")
	private String warrantyPeriod;

	@Column(name="WARRANTY_PERIOD_VALUE")
	private BigDecimal warrantyPeriodValue;
	
	@Column(name="ownerShip")
	private String ownerShip;

	

	public String getOwnerShip() {
		return ownerShip;
	}

	public void setOwnerShip(String ownerShip) {
		this.ownerShip = ownerShip;
	}

	public FaAssetRegisterDetails() {
	}

	public long getAssetId() {
		return this.assetId;
	}

	public void setAssetId(long assetId) {
		this.assetId = assetId;
	}

	public Date getAcquisitionDate() {
		return this.acquisitionDate;
	}

	public void setAcquisitionDate(Date acquisitionDate) {
		this.acquisitionDate = acquisitionDate;
	}

	public String getApprovalRemarks() {
		return this.approvalRemarks;
	}

	public void setApprovalRemarks(String approvalRemarks) {
		this.approvalRemarks = approvalRemarks;
	}

	public String getApprovalStatus() {
		return this.approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public String getAssetCode() {
		return this.assetCode;
	}

	public void setAssetCode(String assetCode) {
		this.assetCode = assetCode;
	}

	public BigDecimal getBatchId() {
		return this.batchId;
	}

	public void setBatchId(BigDecimal batchId) {
		this.batchId = batchId;
	}

	public BigDecimal getBookValue() {
		return this.bookValue;
	}

	public void setBookValue(BigDecimal bookValue) {
		this.bookValue = bookValue;
	}

	public BigDecimal getCwipId() {
		return this.cwipId;
	}

	public void setCwipId(BigDecimal cwipId) {
		this.cwipId = cwipId;
	}

	public BigDecimal getDeptId() {
		return this.deptId;
	}

	public void setDeptId(BigDecimal deptId) {
		this.deptId = deptId;
	}

	public BigDecimal getGrnNo() {
		return this.grnNo;
	}

	public void setGrnNo(BigDecimal grnNo) {
		this.grnNo = grnNo;
	}

	public String getLifetimeOfAssetPeriod() {
		return this.lifetimeOfAssetPeriod;
	}

	public void setLifetimeOfAssetPeriod(String lifetimeOfAssetPeriod) {
		this.lifetimeOfAssetPeriod = lifetimeOfAssetPeriod;
	}

	public BigDecimal getLifetimeOfAssetValue() {
		return this.lifetimeOfAssetValue;
	}

	public void setLifetimeOfAssetValue(BigDecimal lifetimeOfAssetValue) {
		this.lifetimeOfAssetValue = lifetimeOfAssetValue;
	}

	public BigDecimal getLocationId() {
		return this.locationId;
	}

	public void setLocationId(BigDecimal locationId) {
		this.locationId = locationId;
	}

	public BigDecimal getMatNo() {
		return this.matNo;
	}

	public void setMatNo(BigDecimal matNo) {
		this.matNo = matNo;
	}

	public String getModReason() {
		return this.modReason;
	}

	public void setModReason(String modReason) {
		this.modReason = modReason;
	}

	public BigDecimal getPurchaseVal() {
		return this.purchaseVal;
	}

	public void setPurchaseVal(BigDecimal purchaseVal) {
		this.purchaseVal = purchaseVal;
	}

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public BigDecimal getSalvageVal() {
		return this.salvageVal;
	}

	public void setSalvageVal(BigDecimal salvageVal) {
		this.salvageVal = salvageVal;
	}

	public BigDecimal getServiceDeptId() {
		return this.serviceDeptId;
	}

	public void setServiceDeptId(BigDecimal serviceDeptId) {
		this.serviceDeptId = serviceDeptId;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getSubDeptId() {
		return this.subDeptId;
	}

	public void setSubDeptId(BigDecimal subDeptId) {
		this.subDeptId = subDeptId;
	}

	public BigDecimal getSubLocId() {
		return this.subLocId;
	}

	public void setSubLocId(BigDecimal subLocId) {
		this.subLocId = subLocId;
	}

	public Date getWarrantyExpiryDate() {
		return this.warrantyExpiryDate;
	}

	public void setWarrantyExpiryDate(Date warrantyExpiryDate) {
		this.warrantyExpiryDate = warrantyExpiryDate;
	}

	public String getWarrantyPeriod() {
		return this.warrantyPeriod;
	}

	public void setWarrantyPeriod(String warrantyPeriod) {
		this.warrantyPeriod = warrantyPeriod;
	}

	public BigDecimal getWarrantyPeriodValue() {
		return this.warrantyPeriodValue;
	}

	public void setWarrantyPeriodValue(BigDecimal warrantyPeriodValue) {
		this.warrantyPeriodValue = warrantyPeriodValue;
	}

}