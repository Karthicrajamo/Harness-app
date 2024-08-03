package com.harness.harnessERP.model;


import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the FLEXI_FIELD_MATERIAL_TYPE database table.
 * 
 */
@Entity
@Table(name="FLEXI_FIELD_MATERIAL_TYPE")
@NamedQuery(name="FlexiFieldMaterialType.findAll", query="SELECT f FROM FlexiFieldMaterialType f")
public class FlexiFieldMaterialType implements Serializable {
	private static final long serialVersionUID = 1L;

	private String category;

	private String compulsory;

	@Column(name="FLEXI_FIELD_NAME")
	private String flexiFieldName;

	@Column(name="FLEXI_FIELD_NUMBER")
	private BigDecimal flexiFieldNumber;

	@Column(name="FLEXI_FIELD_TYPE")
	private String flexiFieldType;

	@Column(name="LOADING_QUERY")
	private String loadingQuery;

	@Column(name="MATERIAL_BATCH_PROPERTY")
	private String materialBatchProperty;

	@Id
	@Column(name="TYPE")
	private String type;

	private String uom;

	public FlexiFieldMaterialType() {
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCompulsory() {
		return this.compulsory;
	}

	public void setCompulsory(String compulsory) {
		this.compulsory = compulsory;
	}

	public String getFlexiFieldName() {
		return this.flexiFieldName;
	}

	public void setFlexiFieldName(String flexiFieldName) {
		this.flexiFieldName = flexiFieldName;
	}

	public BigDecimal getFlexiFieldNumber() {
		return this.flexiFieldNumber;
	}

	public void setFlexiFieldNumber(BigDecimal flexiFieldNumber) {
		this.flexiFieldNumber = flexiFieldNumber;
	}

	public String getFlexiFieldType() {
		return this.flexiFieldType;
	}

	public void setFlexiFieldType(String flexiFieldType) {
		this.flexiFieldType = flexiFieldType;
	}

	public String getLoadingQuery() {
		return this.loadingQuery;
	}

	public void setLoadingQuery(String loadingQuery) {
		this.loadingQuery = loadingQuery;
	}

	public String getMaterialBatchProperty() {
		return this.materialBatchProperty;
	}

	public void setMaterialBatchProperty(String materialBatchProperty) {
		this.materialBatchProperty = materialBatchProperty;
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
