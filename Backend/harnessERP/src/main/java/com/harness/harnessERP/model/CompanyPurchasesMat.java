package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the COMPANY_PURCHASES_MAT database table.
 * 
 */
@Entity
@Table(name="COMPANY_PURCHASES_MAT")
@NamedQuery(name="CompanyPurchasesMat.findAll", query="SELECT c FROM CompanyPurchasesMat c")
public class CompanyPurchasesMat implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="PO_NO")
	private long poNo;

	@Column(name="COMPANY_NAME")
	private String companyName;

	public CompanyPurchasesMat() {
	}

	public long getPoNo() {
		return this.poNo;
	}

	public void setPoNo(long poNo) {
		this.poNo = poNo;
	}

	public String getCompanyName() {
		return this.companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

}
