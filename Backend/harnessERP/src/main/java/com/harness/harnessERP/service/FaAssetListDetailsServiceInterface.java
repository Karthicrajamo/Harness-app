package com.harness.harnessERP.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;

import com.harness.harnessERP.dto.AssetListMainScreenDTO;
import com.harness.harnessERP.dto.FaAssetRegisterImageDTO;
import com.harness.harnessERP.dto.AssetDetailsSubScreenDTO;
import com.harness.harnessERP.dto.AssetDetailsSubScreenDataDTO;
import com.harness.harnessERP.filterCriteria.AssetListMainFilterCriteria;
import com.harness.harnessERP.model.FaAssetRegisterDetails;
import com.harness.harnessERP.model.FaAssetRegisterImage;

public interface FaAssetListDetailsServiceInterface {
    public List<FaAssetRegisterDetails> getAllFaAssetListDetails();
    public List<String> getDistinctStatuses();
    public List<AssetListMainScreenDTO> getAssetListMainScreenFilteredDetails(AssetListMainFilterCriteria criteria);
    public Page<AssetListMainScreenDTO> getAssetListMainScreenFilteredDetails(AssetListMainFilterCriteria criteria,int currentPage, int sizePerPage);
    public AssetDetailsSubScreenDTO  getAssetDetailsByAssetId(Long assetId);
    public List<AssetDetailsSubScreenDataDTO>  getAssetDetailsDataByAssetId(String type);
    
    public List<FaAssetRegisterImageDTO> getAssetImageById(Long assetId);
//    public List<AssetDetailsSubScreenFlxValDTO> getAssetDetailsFlxValByAssetType(String type);
    
    public List<String> getDistinctClassifications();
}


