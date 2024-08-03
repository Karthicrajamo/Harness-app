package com.harness.harnessERP.model;


import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the PURCHASE_VIEW database table.
 * 
 */
@Entity
@Table(name="PURCHASE_VIEW")
@NamedQuery(name="PurchaseView.findAll", query="SELECT p FROM PurchaseView p")
public class PurchaseView implements Serializable {
	private static final long serialVersionUID = 1L;

	private BigDecimal amount;

	@Column(name="BRAND_NAME")
	private String brandName;

	@Column(name="CUST_SPEC")
	private String custSpec;

	@Column(name="MAT_NO")
	private BigDecimal matNo;

	@Column(name="MAT_STATUS")
	private String matStatus;

	private BigDecimal multiplier;
    
	@Id
	@Column(name="PO_NO")
	private BigDecimal poNo;

	@Column(name="PRICE_PER_UOM")
	private BigDecimal pricePerUom;

	private String puom;

	@Column(name="QTY_ORDERED")
	private BigDecimal qtyOrdered;

	@Column(name="SEQ_NO")
	private BigDecimal seqNo;

	private String uom;
	
	private String category;
	
	@Column(name="SUPPLIER_NAME")
	private String supplierName;

	
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}


	public PurchaseView() {
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getBrandName() {
		return this.brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getCustSpec() {
		return this.custSpec;
	}

	public void setCustSpec(String custSpec) {
		this.custSpec = custSpec;
	}

	public BigDecimal getMatNo() {
		return this.matNo;
	}

	public void setMatNo(BigDecimal matNo) {
		this.matNo = matNo;
	}

	public String getMatStatus() {
		return this.matStatus;
	}

	public void setMatStatus(String matStatus) {
		this.matStatus = matStatus;
	}

	public BigDecimal getMultiplier() {
		return this.multiplier;
	}

	public void setMultiplier(BigDecimal multiplier) {
		this.multiplier = multiplier;
	}

	public BigDecimal getPoNo() {
		return this.poNo;
	}

	public void setPoNo(BigDecimal poNo) {
		this.poNo = poNo;
	}

	public BigDecimal getPricePerUom() {
		return this.pricePerUom;
	}

	public void setPricePerUom(BigDecimal pricePerUom) {
		this.pricePerUom = pricePerUom;
	}

	public String getPuom() {
		return this.puom;
	}

	public void setPuom(String puom) {
		this.puom = puom;
	}

	public BigDecimal getQtyOrdered() {
		return this.qtyOrdered;
	}

	public void setQtyOrdered(BigDecimal qtyOrdered) {
		this.qtyOrdered = qtyOrdered;
	}

	public BigDecimal getSeqNo() {
		return this.seqNo;
	}

	public void setSeqNo(BigDecimal seqNo) {
		this.seqNo = seqNo;
	}

	public String getUom() {
		return this.uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

}
