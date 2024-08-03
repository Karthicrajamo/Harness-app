package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the FIXED_MATERIAL_VIEW database table.
 * 
 */
@Entity
@Table(name="FIXED_MATERIAL_VIEW")
@NamedQuery(name="FixedMaterialView.findAll", query="SELECT f FROM FixedMaterialView f")
public class FixedMaterialView implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name="ALLOW_DELETE_R_DISPOSAL")
	private String allowDeleteRDisposal;

	@Column(name="ALLOW_ISSUE_CONSUMABLE")
	private String allowIssueConsumable;

	@Column(name="ALLOW_ISSUE_CWIP")
	private String allowIssueCwip;

	@Column(name="ASSET_CATEGORY")
	private String assetCategory;

	@Column(name="'Category'")
	private String Category;

	@Column(name="CLASSIFICATION_ID")
	private BigDecimal classificationId;

	@Column(name="CLASSIFICATION_NAME")
	private String classificationName;

	private String color;

	@Column(name="CWIP_ASSET")
	private String cwipAsset;

	private String flexi1;

	private String flexi2;

	private String flexi3;

	private String flexi4;

	private String flexi5;

	private String flexi6;

	@Id
	@Column(name="MAT_NO")
	private BigDecimal matNo;

	@Column(name="PURCHASE_REQ_MANDATORY")
	private String purchaseReqMandatory;

	@Column(name="REF_NO")
	private String refNo;

	@Column(name="SALVAGE_VALUE_MANDATORY")
	private String salvageValueMandatory;

	@Column(name="SPEC_NO")
	private String specNo;
	
	@Column(name="\"Specs\"")
	private String specs;

	@Column(name="\"type\"")
	private String type;

	@Column(name="TYPE_CODE")
	private String typeCode;

	private String uom1;

	public FixedMaterialView() {
	}

	public String getAllowDeleteRDisposal() {
		return this.allowDeleteRDisposal;
	}

	public void setAllowDeleteRDisposal(String allowDeleteRDisposal) {
		this.allowDeleteRDisposal = allowDeleteRDisposal;
	}

	public String getAllowIssueConsumable() {
		return this.allowIssueConsumable;
	}

	public void setAllowIssueConsumable(String allowIssueConsumable) {
		this.allowIssueConsumable = allowIssueConsumable;
	}

	public String getAllowIssueCwip() {
		return this.allowIssueCwip;
	}

	public void setAllowIssueCwip(String allowIssueCwip) {
		this.allowIssueCwip = allowIssueCwip;
	}

	public String getAssetCategory() {
		return this.assetCategory;
	}

	public void setAssetCategory(String assetCategory) {
		this.assetCategory = assetCategory;
	}

	

	public String getCategory() {
		return Category;
	}

	public void setCategory(String category) {
		Category = category;
	}

	public BigDecimal getClassificationId() {
		return this.classificationId;
	}

	public void setClassificationId(BigDecimal classificationId) {
		this.classificationId = classificationId;
	}

	public String getClassificationName() {
		return this.classificationName;
	}

	public void setClassificationName(String classificationName) {
		this.classificationName = classificationName;
	}

	public String getColor() {
		return this.color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getCwipAsset() {
		return this.cwipAsset;
	}

	public void setCwipAsset(String cwipAsset) {
		this.cwipAsset = cwipAsset;
	}

	public String getFlexi1() {
		return this.flexi1;
	}

	public void setFlexi1(String flexi1) {
		this.flexi1 = flexi1;
	}

	public String getFlexi2() {
		return this.flexi2;
	}

	public void setFlexi2(String flexi2) {
		this.flexi2 = flexi2;
	}

	public String getFlexi3() {
		return this.flexi3;
	}

	public void setFlexi3(String flexi3) {
		this.flexi3 = flexi3;
	}

	public String getFlexi4() {
		return this.flexi4;
	}

	public void setFlexi4(String flexi4) {
		this.flexi4 = flexi4;
	}

	public String getFlexi5() {
		return this.flexi5;
	}

	public void setFlexi5(String flexi5) {
		this.flexi5 = flexi5;
	}

	public String getFlexi6() {
		return this.flexi6;
	}

	public void setFlexi6(String flexi6) {
		this.flexi6 = flexi6;
	}

	public BigDecimal getMatNo() {
		return this.matNo;
	}

	public void setMatNo(BigDecimal matNo) {
		this.matNo = matNo;
	}

	public String getPurchaseReqMandatory() {
		return this.purchaseReqMandatory;
	}

	public void setPurchaseReqMandatory(String purchaseReqMandatory) {
		this.purchaseReqMandatory = purchaseReqMandatory;
	}

	public String getRefNo() {
		return this.refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	public String getSalvageValueMandatory() {
		return this.salvageValueMandatory;
	}

	public void setSalvageValueMandatory(String salvageValueMandatory) {
		this.salvageValueMandatory = salvageValueMandatory;
	}

	public String getSpecNo() {
		return this.specNo;
	}

	public void setSpecNo(String specNo) {
		this.specNo = specNo;
	}


	public String getSpecs() {
		return specs;
	}

	public void setSpecs(String specs) {
		this.specs = specs;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTypeCode() {
		return this.typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public String getUom1() {
		return this.uom1;
	}

	public void setUom1(String uom1) {
		this.uom1 = uom1;
	}

}