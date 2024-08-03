package com.harness.harnessERP.model;


import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.*;


/**
 * The persistent class for the FA_ASSET_FIELD_MAPPING database table.
 * 
 */
@Entity
@Table(name="FA_ASSET_FIELD_MAPPING")
@NamedQuery(name="FaAssetFieldMapping.findAll", query="SELECT f FROM FaAssetFieldMapping f")
public class FaAssetFieldMapping implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="AST_FIELD_ID")
	private long astFieldId;

	private String category;

	private String mandatory;

	@Column(name="TYPE")
	private String type;

	private String uom;

	public FaAssetFieldMapping() {
	}

	public long getAstFieldId() {
		return astFieldId;
	}

	public void setAstFieldId(long astFieldId) {
		this.astFieldId = astFieldId;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getMandatory() {
		return this.mandatory;
	}

	public void setMandatory(String mandatory) {
		this.mandatory = mandatory;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUom() {
		return this.uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

}