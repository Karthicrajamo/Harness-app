package com.harness.harnessERP.model;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the FA_ASSET_REGISTER_IMAGE database table.
 * 
 */
@Entity
@Table(name="FA_ASSET_REGISTER_IMAGE")
@NamedQuery(name="FaAssetRegisterImage.findAll", query="SELECT f FROM FaAssetRegisterImage f")
public class FaAssetRegisterImage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ASSET_ID")
	private BigDecimal assetId;

	@Lob
	private byte[] image;

	@Column(name="IMAGE_TITLE")
	private String imageTitle;

	@Column(name="IMAGE_WITH_FORMAT")
	private String imageWithFormat;

	@Column(name="IMG_NO")
	private BigDecimal imgNo;

	public FaAssetRegisterImage() {
	}

	public BigDecimal getAssetId() {
		return this.assetId;
	}

	public void setAssetId(BigDecimal assetId) {
		this.assetId = assetId;
	}

	public byte[] getImage() {
		return this.image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getImageTitle() {
		return this.imageTitle;
	}

	public void setImageTitle(String imageTitle) {
		this.imageTitle = imageTitle;
	}

	public String getImageWithFormat() {
		return this.imageWithFormat;
	}

	public void setImageWithFormat(String imageWithFormat) {
		this.imageWithFormat = imageWithFormat;
	}

	public BigDecimal getImgNo() {
		return this.imgNo;
	}

	public void setImgNo(BigDecimal imgNo) {
		this.imgNo = imgNo;
	}

}