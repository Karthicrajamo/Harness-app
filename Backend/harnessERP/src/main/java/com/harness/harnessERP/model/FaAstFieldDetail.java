package com.harness.harnessERP.model;


import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the FA_AST_FIELD_DETAILS database table.
 * 
 */
@Entity
@Table(name="FA_AST_FIELD_DETAILS")
@NamedQuery(name="FaAstFieldDetail.findAll", query="SELECT f FROM FaAstFieldDetail f")
public class FaAstFieldDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="AST_FIELD_ID")
	private long astFieldId;

	@Column(name="DATA_TYPE")
	private String dataType;

	@Column(name="FIELD_NAME")
	private String fieldName;

	@Column(name="LOADING_QUERY")
	private String loadingQuery;

	public FaAstFieldDetail() {
	}

	public long getAstFieldId() {
		return this.astFieldId;
	}

	public void setAstFieldId(long astFieldId) {
		this.astFieldId = astFieldId;
	}

	public String getDataType() {
		return this.dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getFieldName() {
		return this.fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getLoadingQuery() {
		return this.loadingQuery;
	}

	public void setLoadingQuery(String loadingQuery) {
		this.loadingQuery = loadingQuery;
	}

}
