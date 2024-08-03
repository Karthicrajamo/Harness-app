package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the FA_SUB_DEPARTMENT database table.
 * 
 */
@Entity
@Table(name="FA_SUB_DEPARTMENT")
@NamedQuery(name="FaSubDepartment.findAll", query="SELECT f FROM FaSubDepartment f")
public class FaSubDepartment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="DEPT_ID")
	private BigDecimal deptId;

	private String status;

	@Column(name="SUB_DEPT_CODE")
	private String subDeptCode;

	@Column(name="SUB_DEPT_ID")
	private BigDecimal subDeptId;

	@Column(name="SUB_DEPT_NAME")
	private String subDeptName;

	public FaSubDepartment() {
	}

	public BigDecimal getDeptId() {
		return this.deptId;
	}

	public void setDeptId(BigDecimal deptId) {
		this.deptId = deptId;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSubDeptCode() {
		return this.subDeptCode;
	}

	public void setSubDeptCode(String subDeptCode) {
		this.subDeptCode = subDeptCode;
	}

	public BigDecimal getSubDeptId() {
		return this.subDeptId;
	}

	public void setSubDeptId(BigDecimal subDeptId) {
		this.subDeptId = subDeptId;
	}

	public String getSubDeptName() {
		return this.subDeptName;
	}

	public void setSubDeptName(String subDeptName) {
		this.subDeptName = subDeptName;
	}

}