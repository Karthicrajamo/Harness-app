package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the FA_SUB_LOCATION database table.
 * 
 */
@Entity
@Table(name="FA_SUB_LOCATION")
@NamedQuery(name="FaSubLocation.findAll", query="SELECT f FROM FaSubLocation f")
public class FaSubLocation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="SUB_LOC_ID")
	private long subLocId;

	@Column(name="LOCATION_ID")
	private BigDecimal locationId;

	@Column(name="STOCK_REF")
	private String stockRef;

	@Column(name="SUB_LOC_CODE")
	private String subLocCode;

	@Column(name="SUB_LOC_NO")
	private BigDecimal subLocNo;

	@Column(name="SUB_LOC_TYPE")
	private BigDecimal subLocType;

	@Column(name="SUB_LOCATION")
	private String subLocation;

	public FaSubLocation() {
	}

	public long getSubLocId() {
		return this.subLocId;
	}

	public void setSubLocId(long subLocId) {
		this.subLocId = subLocId;
	}

	public BigDecimal getLocationId() {
		return this.locationId;
	}

	public void setLocationId(BigDecimal locationId) {
		this.locationId = locationId;
	}

	public String getStockRef() {
		return this.stockRef;
	}

	public void setStockRef(String stockRef) {
		this.stockRef = stockRef;
	}

	public String getSubLocCode() {
		return this.subLocCode;
	}

	public void setSubLocCode(String subLocCode) {
		this.subLocCode = subLocCode;
	}

	public BigDecimal getSubLocNo() {
		return this.subLocNo;
	}

	public void setSubLocNo(BigDecimal subLocNo) {
		this.subLocNo = subLocNo;
	}

	public BigDecimal getSubLocType() {
		return this.subLocType;
	}

	public void setSubLocType(BigDecimal subLocType) {
		this.subLocType = subLocType;
	}

	public String getSubLocation() {
		return this.subLocation;
	}

	public void setSubLocation(String subLocation) {
		this.subLocation = subLocation;
	}

}
