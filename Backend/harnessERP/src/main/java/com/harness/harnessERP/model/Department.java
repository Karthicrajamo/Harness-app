package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the DEPARTMENT database table.
 * 
 */
@Entity
@NamedQuery(name="Department.findAll", query="SELECT d FROM Department d")
public class Department implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="DEPT_ID")
	private long deptId;

	@Column(name="DEPT_CODE")
	private String deptCode;

	@Column(name="DEPT_NAME")
	private String deptName;

	@Column(name="REASON_FOR_MODIFY")
	private String reasonForModify;

	@Column(name="SL_DEPT_NAME")
	private String slDeptName;

	public Department() {
	}

	public long getDeptId() {
		return this.deptId;
	}

	public void setDeptId(long deptId) {
		this.deptId = deptId;
	}

	public String getDeptCode() {
		return this.deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getDeptName() {
		return this.deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getReasonForModify() {
		return this.reasonForModify;
	}

	public void setReasonForModify(String reasonForModify) {
		this.reasonForModify = reasonForModify;
	}

	public String getSlDeptName() {
		return this.slDeptName;
	}

	public void setSlDeptName(String slDeptName) {
		this.slDeptName = slDeptName;
	}

}
