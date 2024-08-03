package com.harness.harnessERP.model;


import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the USERTAB database table.
 * Needs UserTabPK
 */
@Entity
@NamedQuery(name="Usertab.findAll", query="SELECT u FROM Usertab u")
public class Usertab implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private UsertabPK id;

	private String attendance;

	@Column(name="DASHBOARD_REQ")
	private String dashboardReq;

	@Column(name="DEPT_ID")
	private BigDecimal deptId;

	private String email;

	@Column(name="ENCRYPT_REQ")
	private String encryptReq;

	private String isdefaultdashboard;

	private String issstcolwidthdefaults;

	@Column(name="LOCATION_TRACK_REQ")
	private String locationTrackReq;

	@Column(name="MOBILE_LOGIN_REQ")
	private String mobileLoginReq;

	private String name;

	private String password;

	@Column(name="ROLE")
	private String role;

	@Column(name="SUPER_USER")
	private String superUser;

	@Column(name="TOUCH_SCREEN_REQ")
	private String touchScreenReq;

	@Column(name="USER_STATUS")
	private String userStatus;

	@Column(name="WEB_LOGIN_REQ")
	private String webLoginReq;

	public Usertab() {
	}

	public UsertabPK getId() {
		return this.id;
	}

	public void setId(UsertabPK id) {
		this.id = id;
	}

	public String getAttendance() {
		return this.attendance;
	}

	public void setAttendance(String attendance) {
		this.attendance = attendance;
	}

	public String getDashboardReq() {
		return this.dashboardReq;
	}

	public void setDashboardReq(String dashboardReq) {
		this.dashboardReq = dashboardReq;
	}

	public BigDecimal getDeptId() {
		return this.deptId;
	}

	public void setDeptId(BigDecimal deptId) {
		this.deptId = deptId;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEncryptReq() {
		return this.encryptReq;
	}

	public void setEncryptReq(String encryptReq) {
		this.encryptReq = encryptReq;
	}

	public String getIsdefaultdashboard() {
		return this.isdefaultdashboard;
	}

	public void setIsdefaultdashboard(String isdefaultdashboard) {
		this.isdefaultdashboard = isdefaultdashboard;
	}

	public String getIssstcolwidthdefaults() {
		return this.issstcolwidthdefaults;
	}

	public void setIssstcolwidthdefaults(String issstcolwidthdefaults) {
		this.issstcolwidthdefaults = issstcolwidthdefaults;
	}

	public String getLocationTrackReq() {
		return this.locationTrackReq;
	}

	public void setLocationTrackReq(String locationTrackReq) {
		this.locationTrackReq = locationTrackReq;
	}

	public String getMobileLoginReq() {
		return this.mobileLoginReq;
	}

	public void setMobileLoginReq(String mobileLoginReq) {
		this.mobileLoginReq = mobileLoginReq;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getSuperUser() {
		return this.superUser;
	}

	public void setSuperUser(String superUser) {
		this.superUser = superUser;
	}

	public String getTouchScreenReq() {
		return this.touchScreenReq;
	}

	public void setTouchScreenReq(String touchScreenReq) {
		this.touchScreenReq = touchScreenReq;
	}

	public String getUserStatus() {
		return this.userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getWebLoginReq() {
		return this.webLoginReq;
	}

	public void setWebLoginReq(String webLoginReq) {
		this.webLoginReq = webLoginReq;
	}
}


