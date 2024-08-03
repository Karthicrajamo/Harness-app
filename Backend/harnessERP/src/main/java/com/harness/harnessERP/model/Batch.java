package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the BATCH database table.
 * 
 */
@Entity
@NamedQuery(name="Batch.findAll", query="SELECT b FROM Batch b")
public class Batch implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="BATCH_ID")
	private long batchId;

	@Column(name="BARCODE_NO")
	private String barcodeNo;

	@Column(name="BATCH_NO1")
	private String batchNo1;

	@Column(name="BATCH_NO2")
	private String batchNo2;

	@Column(name="BATCH_NO3")
	private String batchNo3;

	@Column(name="DEFECT_NOTE")
	private String defectNote;

	@Column(name="DEFECT_TYPE")
	private String defectType;

	@Column(name="JOB_ID")
	private BigDecimal jobId;

	@Column(name="LAST_PROCESS")
	private String lastProcess;

	@Column(name="MAT_NO")
	private BigDecimal matNo;

	@Column(name="PO_NO")
	private BigDecimal poNo;

	public Batch() {
	}

	

	public String getBarcodeNo() {
		return this.barcodeNo;
	}

	public void setBarcodeNo(String barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public String getBatchNo1() {
		return this.batchNo1;
	}

	public void setBatchNo1(String batchNo1) {
		this.batchNo1 = batchNo1;
	}

	public String getBatchNo2() {
		return this.batchNo2;
	}

	public void setBatchNo2(String batchNo2) {
		this.batchNo2 = batchNo2;
	}

	public String getBatchNo3() {
		return this.batchNo3;
	}

	public void setBatchNo3(String batchNo3) {
		this.batchNo3 = batchNo3;
	}

	public String getDefectNote() {
		return this.defectNote;
	}

	public void setDefectNote(String defectNote) {
		this.defectNote = defectNote;
	}

	public String getDefectType() {
		return this.defectType;
	}

	public void setDefectType(String defectType) {
		this.defectType = defectType;
	}

	public BigDecimal getJobId() {
		return this.jobId;
	}

	public void setJobId(BigDecimal jobId) {
		this.jobId = jobId;
	}

	

	public long getBatchId() {
		return batchId;
	}



	public void setBatchId(long batchId) {
		this.batchId = batchId;
	}



	public String getLastProcess() {
		return lastProcess;
	}



	public void setLastProcess(String lastProcess) {
		this.lastProcess = lastProcess;
	}



	public BigDecimal getPoNo() {
		return poNo;
	}



	public void setPoNo(BigDecimal poNo) {
		this.poNo = poNo;
	}



	public BigDecimal getMatNo() {
		return this.matNo;
	}

	public void setMatNo(BigDecimal matNo) {
		this.matNo = matNo;
	}

	

}
