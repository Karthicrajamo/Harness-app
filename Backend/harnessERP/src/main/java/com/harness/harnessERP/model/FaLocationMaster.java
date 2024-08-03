package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the FA_LOCATION_MASTER database table.
 * 
 */
@Entity
@Table(name="FA_LOCATION_MASTER")
@NamedQuery(name="FaLocationMaster.findAll", query="SELECT f FROM FaLocationMaster f")
public class FaLocationMaster implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="LOCATION_ID")
	private long locationId;

	@Column(name="APPROVAL_REMARKS")
	private String approvalRemarks;

	@Column(name="APPROVAL_STATUS")
	private String approvalStatus;

	@Column(name="LOCATION_CODE")
	private String locationCode;

	@Column(name="LOCATION_NAME")
	private String locationName;

	@Column(name="REASON_FOR_MODIFY")
	private String reasonForModify;

	private String status;

	@Column(name="STOCK_ROOM_ID")
	private java.math.BigDecimal stockRoomId;

	public FaLocationMaster() {
	}

	public long getLocationId() {
		return this.locationId;
	}

	public void setLocationId(long locationId) {
		this.locationId = locationId;
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

	public String getLocationCode() {
		return this.locationCode;
	}

	public void setLocationCode(String locationCode) {
		this.locationCode = locationCode;
	}

	public String getLocationName() {
		return this.locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public String getReasonForModify() {
		return this.reasonForModify;
	}

	public void setReasonForModify(String reasonForModify) {
		this.reasonForModify = reasonForModify;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public java.math.BigDecimal getStockRoomId() {
		return this.stockRoomId;
	}

	public void setStockRoomId(java.math.BigDecimal stockRoomId) {
		this.stockRoomId = stockRoomId;
	}

}
