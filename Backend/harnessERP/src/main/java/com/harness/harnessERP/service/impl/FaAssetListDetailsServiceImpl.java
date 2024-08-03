package com.harness.harnessERP.service.impl;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.harness.harnessERP.dto.AssetDetailsSubScreenDTO;
import com.harness.harnessERP.dto.AssetDetailsSubScreenDataDTO;
import com.harness.harnessERP.dto.AssetListMainScreenDTO;
import com.harness.harnessERP.dto.FaAssetRegisterImageDTO;
import com.harness.harnessERP.filterCriteria.AssetListMainFilterCriteria;
import com.harness.harnessERP.model.FaAssetRegisterDetails;
import com.harness.harnessERP.model.FaAssetRegisterImage;
import com.harness.harnessERP.model.FixedMaterialView;
import com.harness.harnessERP.repository.AssetListFilterRepositoryCustom;
import com.harness.harnessERP.repository.FaAssetListDetailsRepository;
import com.harness.harnessERP.repository.FixedMaterialViewRepository;
import com.harness.harnessERP.service.FaAssetListDetailsServiceInterface;

@Service
public class FaAssetListDetailsServiceImpl implements FaAssetListDetailsServiceInterface{
	
	private final FaAssetListDetailsRepository faAssetListDetailsRepository;
	private final AssetListFilterRepositoryCustom assetListFilterRepositoryCustom;
	private final FixedMaterialViewRepository fixedMaterialViewRepository;
	@Autowired
	public FaAssetListDetailsServiceImpl(FaAssetListDetailsRepository faAssetListDetailsRepository,
			AssetListFilterRepositoryCustom assetListFilterRepositoryCustom,
			FixedMaterialViewRepository fixedMaterialViewRepository) {
	
		this.faAssetListDetailsRepository = faAssetListDetailsRepository;
		this.assetListFilterRepositoryCustom = assetListFilterRepositoryCustom;
		this.fixedMaterialViewRepository = fixedMaterialViewRepository;
	}
	
	@Override
	public List<FaAssetRegisterDetails> getAllFaAssetListDetails(){
		try {
			Optional<List<FaAssetRegisterDetails>> listofFaAssetListDetailsOptional = Optional.ofNullable(faAssetListDetailsRepository.findAll());
		
		if(!listofFaAssetListDetailsOptional.isPresent() || listofFaAssetListDetailsOptional.get().isEmpty() ) {
			return Collections.emptyList();
		}
		List<FaAssetRegisterDetails> listOfFaAssetListDetails = listofFaAssetListDetailsOptional.get();
		
		System.out.println("listOfFaAssetListDetails : "+listOfFaAssetListDetails);
		return listOfFaAssetListDetails;
	
	}
		catch(NoSuchElementException | IllegalStateException e) {
			throw new RuntimeException("Error Retrieving Status !", e);
		}
		catch(Exception e) {
			throw new RuntimeException("Error Retrieving Status !", e);
		}	
	}
	


	@Override
    public List<String> getDistinctStatuses(){
		try {
			Optional<List<String>> distinctStatusOptional = Optional.ofNullable(faAssetListDetailsRepository.findDistinctStatuses());
		    if(!distinctStatusOptional.isPresent() || distinctStatusOptional.get().isEmpty()) {
			   return Collections.emptyList();
		    }
			List<String> distinctStatus = distinctStatusOptional.get();
			return distinctStatus;	
		    }
		catch(NoSuchElementException | IllegalStateException e) {
			throw new RuntimeException("Error Retrieving Status !", e);
		}
		catch(Exception e) {
			throw new RuntimeException("Unexpected Error Occured, While Retrieving Status !", e);
		}	
		
	}

	@Override
	public List<AssetListMainScreenDTO> getAssetListMainScreenFilteredDetails(AssetListMainFilterCriteria criteria){
		try {
		Optional<List<AssetListMainScreenDTO>> listOfFilteredDetailsOptional = Optional.ofNullable(assetListFilterRepositoryCustom.findAssetDetailsByCriteria(criteria.getDeptName(),criteria.getLocationName(), criteria.getStatus(), criteria.getSortBy()));
		if(!listOfFilteredDetailsOptional.isPresent() || listOfFilteredDetailsOptional.get().isEmpty() ) {
			return Collections.emptyList();
		}
		List<AssetListMainScreenDTO> listOfFilteredDetails = listOfFilteredDetailsOptional.get();
		
		return listOfFilteredDetails;
		}
		catch(NoSuchElementException | IllegalStateException e) {
			throw new RuntimeException("Error Retrieving Filtered Asset List Details !", e);
		}
		catch(Exception e) {
			throw new RuntimeException("Unexpected Error, While  Retrieving Filtered Asset List Details !", e);
		}	
	}
	
//	@Override
//	public Page<AssetListMainScreenDTO> getAssetListMainScreenFilteredDetails(AssetListMainFilterCriteria criteria,int page, int size){
//		try {
//			public List<String> getDistinctClassifications()
//			Pageable pageable = PageRequest.of(page, size);
//			return assetListFilterRepositoryCustom.findAssetDetailsByCriteriaPageable(criteria.getDeptName(), criteria.getLocationName(), criteria.getStatus(), pageable);
////			return assetListFilterRepositoryCustom.findAll(pageable);
//		}
//		catch (Exception e) {
//            throw new RuntimeException("Error retrieving filtered asset list details", e);
//        }
//	}
	
	@Override
	public Page<AssetListMainScreenDTO> getAssetListMainScreenFilteredDetails(AssetListMainFilterCriteria criteria,int currentPage, int sizePerPage){
		 List<AssetListMainScreenDTO> assets = assetListFilterRepositoryCustom.findAssetDetailsByCriteria(criteria.getDeptName(),criteria.getLocationName(), criteria.getStatus(), criteria.getSortBy());

	        // Create a Pageable object manually (this can be a simple implementation)
	        int pageSize = sizePerPage;
	        int crntPage = currentPage;
	        int startItem = crntPage * pageSize;
	        List<AssetListMainScreenDTO> pageList;

	        if (assets.size() < startItem) {
	            pageList = Collections.emptyList();
	        } else {
	            int toIndex = Math.min(startItem + pageSize, assets.size());
	            pageList = assets.subList(startItem, toIndex);
	        }

	        Page<AssetListMainScreenDTO> assetPage = new PageImpl<>(pageList, PageRequest.of(crntPage, pageSize), assets.size());
            System.out.println("assetPage>>>>>>>>>>>>>>>>>>>>>"+ assetPage);
	        return assetPage;
	}
	
	@Override
    public AssetDetailsSubScreenDTO  getAssetDetailsByAssetId(Long assetId){
		AssetDetailsSubScreenDTO assetSubDetails = assetListFilterRepositoryCustom.findAssetSubDetailsById(assetId);
    	return assetSubDetails;
    }
	
	@Override
    public List<AssetDetailsSubScreenDataDTO>  getAssetDetailsDataByAssetId(String type) {
    	List<AssetDetailsSubScreenDataDTO> assetSubDetailsData = assetListFilterRepositoryCustom.findAssetSubDetailsDataById(type);
    	return assetSubDetailsData;
    }
	@Override
	 public List<FaAssetRegisterImageDTO> getAssetImageById(Long assetId) {
		Optional<List<FaAssetRegisterImageDTO>> FaAssetRegisterImageOptional = Optional.ofNullable(assetListFilterRepositoryCustom.findByAssetId(assetId));
		System.out.println("FaAssetRegisterImageOptional : "+FaAssetRegisterImageOptional);
		System.out.println("FaAssetRegisterImageOptional.isPresent() : "+FaAssetRegisterImageOptional.isPresent());
		if(!FaAssetRegisterImageOptional.isEmpty()) {
			return FaAssetRegisterImageOptional.get();
		}
		else {
			return Collections.EMPTY_LIST;
		}
	}

	@Override
	 public List<String> getDistinctClassifications(){
		
		try {
			Optional<List<String>> ditinctClassificationsOptional = Optional.ofNullable(fixedMaterialViewRepository.findDistinctClassificationNames());
		    if(!ditinctClassificationsOptional.isPresent() || ditinctClassificationsOptional.get().isEmpty()) {
			   return Collections.emptyList();
		    }
			List<String> distinctStatus = ditinctClassificationsOptional.get();
			return distinctStatus;	
		    }
		catch(NoSuchElementException | IllegalStateException e) {
			throw new RuntimeException("Error Retrieving Classifications !", e);
		}
		catch(Exception e) {
			throw new RuntimeException("Unexpected Error Occured, While Retrieving Classifications !", e);
		}	
	}

	
	
}
