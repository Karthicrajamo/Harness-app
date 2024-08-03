package com.harness.harnessERP.model;


import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.*;


/**
 * The persistent class for the FA_ASSET_REGISTER_FIELD database table.
 * 
 */
@Entity
@Table(name="FA_ASSET_REGISTER_FIELD")
@NamedQuery(name="FaAssetRegisterField.findAll", query="SELECT f FROM FaAssetRegisterField f")
public class FaAssetRegisterField implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ASSET_ID")
	private Long assetId;
	
	@Column(name="ASSET_FIELD_1")
	private String assetField1;

	@Column(name="ASSET_FIELD_2")
	private String assetField2;

	@Column(name="ASSET_FIELD_3")
	private String assetField3;

	@Column(name="ASSET_FIELD_4")
	private String assetField4;

	@Column(name="ASSET_FIELD_5")
	private String assetField5;

	@Column(name="ASSET_FIELD_6")
	private String assetField6;

	

	public FaAssetRegisterField() {
	}

	public String getAssetField1() {
		return this.assetField1;
	}

	public void setAssetField1(String assetField1) {
		this.assetField1 = assetField1;
	}

	public String getAssetField2() {
		return this.assetField2;
	}

	public void setAssetField2(String assetField2) {
		this.assetField2 = assetField2;
	}

	public String getAssetField3() {
		return this.assetField3;
	}

	public void setAssetField3(String assetField3) {
		this.assetField3 = assetField3;
	}

	public String getAssetField4() {
		return this.assetField4;
	}

	public void setAssetField4(String assetField4) {
		this.assetField4 = assetField4;
	}

	public String getAssetField5() {
		return this.assetField5;
	}

	public void setAssetField5(String assetField5) {
		this.assetField5 = assetField5;
	}

	public String getAssetField6() {
		return this.assetField6;
	}

	public void setAssetField6(String assetField6) {
		this.assetField6 = assetField6;
	}

	public Long getAssetId() {
		return assetId;
	}

	public void setAssetId(Long assetId) {
		this.assetId = assetId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

	

	

}
