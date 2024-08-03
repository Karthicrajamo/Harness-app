package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;

/**
 * The primary key class for the USERTAB database table.
 * 
 */
@Embeddable
public class UsertabPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="USER_ID")
	private String userId;

	@Column(name="COMPANY_ID")
	private long companyId;

	public UsertabPK() {
	}
	public String getUserId() {
		return this.userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public long getCompanyId() {
		return this.companyId;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof UsertabPK)) {
			return false;
		}
		UsertabPK castOther = (UsertabPK)other;
		return 
			this.userId.equals(castOther.userId)
			&& (this.companyId == castOther.companyId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userId.hashCode();
		hash = hash * prime + ((int) (this.companyId ^ (this.companyId >>> 32)));
		
		return hash;
	}
}