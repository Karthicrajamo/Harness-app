package com.harness.harnessERP.dto;

import java.math.BigDecimal;

public class FaAssetRegisterImageDTO {
	
	BigDecimal  assetId;
	byte[] image;
	String imageTitle;
	String imageWithFormat;
	BigDecimal imgNo;
	
	
	
	public BigDecimal getAssetId() {
		return assetId;
	}
	public void setAssetId(BigDecimal assetId) {
		this.assetId = assetId;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public String getImageTitle() {
		return imageTitle;
	}
	public void setImageTitle(String imageTitle) {
		this.imageTitle = imageTitle;
	}
	public String getImageWithFormat() {
		return imageWithFormat;
	}
	public void setImageWithFormat(String imageWithFormat) {
		this.imageWithFormat = imageWithFormat;
	}
	public BigDecimal getImgNo() {
		return imgNo;
	}
	public void setImgNo(BigDecimal imgNo) {
		this.imgNo = imgNo;
	}
	
	
	
}
