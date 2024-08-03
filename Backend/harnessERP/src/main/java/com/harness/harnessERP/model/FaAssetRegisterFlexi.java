package com.harness.harnessERP.model;


import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.*;


/**
 * The persistent class for the FA_ASSET_REGISTER_FLEXI database table.
 * 
 */
@Entity
@Table(name="FA_ASSET_REGISTER_FLEXI")
@NamedQuery(name="FaAssetRegisterFlexi.findAll", query="SELECT f FROM FaAssetRegisterFlexi f")
public class FaAssetRegisterFlexi implements Serializable {
	private static final long serialVersionUID = 1L;
    
	@Id
	@Column(name="ASSET_ID")
	private BigDecimal assetId;

	@Column(name="FLEXI_FIELD_1")
	private String flexiField1;

	@Column(name="FLEXI_FIELD_2")
	private String flexiField2;

	@Column(name="FLEXI_FIELD_3")
	private String flexiField3;

	@Column(name="FLEXI_FIELD_4")
	private String flexiField4;

	@Column(name="FLEXI_FIELD_5")
	private String flexiField5;

	@Column(name="FLEXI_FIELD_6")
	private String flexiField6;

	public FaAssetRegisterFlexi() {
	}

	public BigDecimal getAssetId() {
		return assetId;
	}

	public void setAssetId(BigDecimal assetId) {
		this.assetId = assetId;
	}

	public String getFlexiField1() {
		return this.flexiField1;
	}

	public void setFlexiField1(String flexiField1) {
		this.flexiField1 = flexiField1;
	}

	public String getFlexiField2() {
		return this.flexiField2;
	}

	public void setFlexiField2(String flexiField2) {
		this.flexiField2 = flexiField2;
	}

	public String getFlexiField3() {
		return this.flexiField3;
	}

	public void setFlexiField3(String flexiField3) {
		this.flexiField3 = flexiField3;
	}

	public String getFlexiField4() {
		return this.flexiField4;
	}

	public void setFlexiField4(String flexiField4) {
		this.flexiField4 = flexiField4;
	}

	public String getFlexiField5() {
		return this.flexiField5;
	}

	public void setFlexiField5(String flexiField5) {
		this.flexiField5 = flexiField5;
	}

	public String getFlexiField6() {
		return this.flexiField6;
	}

	public void setFlexiField6(String flexiField6) {
		this.flexiField6 = flexiField6;
	}

}
