package com.harness.harnessERP.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.harness.harnessERP.dto.AssetListMainScreenDTO;
import com.harness.harnessERP.filterCriteria.AssetListMainFilterCriteria;
import com.harness.harnessERP.model.Department;
import com.harness.harnessERP.model.FaAssetRegisterDetails;
import com.harness.harnessERP.model.FaLocationMaster;
import com.harness.harnessERP.model.FaSubDepartment;
import com.harness.harnessERP.model.FaSubLocation;
import com.harness.harnessERP.model.FixedMaterialView;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

//@Service
public class AssetListFilterRepositoryCustomImpl{
//	 @PersistenceContext
//	 public EntityManager entityManager;
//	 
////	@Override
//	public List<AssetListMainScreenDTO> findAssetDetailsByCriteria(AssetListMainFilterCriteria criteria){
//		 CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//	        CriteriaQuery<AssetListMainScreenDTO> query = cb.createQuery(AssetListMainScreenDTO.class);
//	        Root<FaAssetRegisterDetails> asset = query.from(FaAssetRegisterDetails.class);
//	        
////	        Join<FaAssetRegisterDetails, FixedMaterialView> materialJoin = asset.join("fixedMaterialView", JoinType.LEFT);
//	        Join<FaAssetRegisterDetails, Department> deptJoin = asset.join("department", JoinType.LEFT);
////	        Join<FaAssetRegisterDetails, FaSubDepartment> subDeptJoin = asset.join("subDepartment", JoinType.LEFT);
//	        Join<FaAssetRegisterDetails, FaLocationMaster> locationJoin = asset.join("locationMaster", JoinType.LEFT);
//	        Join<FaAssetRegisterDetails, FaSubLocation> subLocationJoin = asset.join("subLocation", JoinType.LEFT);
//
//	        List<Predicate> predicates = new ArrayList<>();
//
//	        if (criteria.getDeptName() != null) {
//	            predicates.add(cb.equal(deptJoin.get("deptName"), criteria.getDeptName()));
//	        }
//	        if (criteria.getLocationName() != null) {
//	            predicates.add(cb.equal(locationJoin.get("locationName"), criteria.getLocationName()));
//	        }
//	        if (criteria.getStatus() != null) {
//	            predicates.add(cb.equal(asset.get("status"), criteria.getStatus()));
//	        }
//
//	        query.select(cb.construct(
//	        	AssetListMainScreenDTO.class,
//	            asset.get("assetCode"),
//	            asset.get("status"),
////	            materialJoin.get("type"),
////	            materialJoin.get("classificationName"),
////	            materialJoin.get("specs"),
//	            deptJoin.get("deptName"),
////	            subDeptJoin.get("subDeptName"),
//	            locationJoin.get("locationName"),
//	            subLocationJoin.get("subLocation")
//	            
//	        )).where(predicates.toArray(new Predicate[0]));

//	        return entityManager.createQuery(query).getResultList();
	}

//}
