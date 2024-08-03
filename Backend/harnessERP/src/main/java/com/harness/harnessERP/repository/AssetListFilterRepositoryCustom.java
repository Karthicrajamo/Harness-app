package com.harness.harnessERP.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.harness.harnessERP.dto.AssetDetailsSubScreenDTO;
import com.harness.harnessERP.dto.AssetDetailsSubScreenDataDTO;
import com.harness.harnessERP.dto.AssetListMainScreenDTO;
import com.harness.harnessERP.dto.FaAssetRegisterImageDTO;
import com.harness.harnessERP.model.FaAssetRegisterDetails;
import com.harness.harnessERP.model.FaAssetRegisterImage;


@Repository
public interface AssetListFilterRepositoryCustom extends PagingAndSortingRepository <FaAssetRegisterDetails, Long>{
	
//	//working
//	@Query("SELECT new com.harness.harnessERP.dto.AssetListMainScreenDTO(" +
//			   "ard.assetCode As assetCode, ard.status As status, ard.matNo As matNo, ard.assetId As assetId,"+
//			   "ard.acquisitionDate As acquisitionDate, ard.salvageVal As salvageVal, ard.purchaseVal As purchaseVal,"+
//               "ard.lifetimeOfAssetValue As lifetimeOfAssetValue, ard.bookValue As bookValue,'Own' As ownerShip, "+
//			   "fmv.classificationName As classificationName,fmv.type As type,pv.category As category,"+
//	           "d.deptName As deptName, fsd.subDeptName As subDeptName, flm.locationName As locationName," +
//			   "fsl.subLocation As subLocation, b.poNo As poNo, pv.custSpec As custSpec, pv.supplierName As supplierName) " +
//	           "FROM FaAssetRegisterDetails ard " +
//	           "JOIN FixedMaterialView fmv ON ard.matNo = fmv.matNo " +
//	           "JOIN Department d ON ard.deptId = d.deptId "+
//	           "JOIN FaSubDepartment fsd ON ard.deptId = fsd.deptId and ard.subDeptId = fsd.subDeptId " +
//	           "JOIN FaLocationMaster flm ON ard.locationId = flm.locationId " +
//	           "JOIN FaSubLocation fsl ON ard.subLocId = fsl.subLocId " +
//	           "JOIN Batch b ON ard.batchId = b.batchId " +
//	           "JOIN PurchaseView pv ON b.poNo = pv.poNo " +
//	           "WHERE (:deptName IS NULL OR d.deptName = :deptName) " +
//	           "AND (:locationName IS NULL OR flm.locationName = :locationName) " +
//	           "AND (:status IS NULL OR ard.status = :status)")
//	    List<AssetListMainScreenDTO> findAssetDetailsByCriteria(@Param("deptName") String deptName,
//	                                             @Param("locationName") String locationName,
//	                                             @Param("status") String status);
	
	@Query("SELECT new com.harness.harnessERP.dto.AssetListMainScreenDTO(" +
			   "ard.assetCode As assetCode, ard.status As status, ard.matNo As matNo, ard.assetId As assetId,"+
			   "ard.acquisitionDate As acquisitionDate, ard.salvageVal As salvageVal, ard.purchaseVal As purchaseVal,"+
            "ard.lifetimeOfAssetValue As lifetimeOfAssetValue, ard.bookValue As bookValue,'Own' As ownerShip, "+
			   "fmv.classificationName As classificationName,fmv.type As type,pv.category As category,"+
	           "d.deptName As deptName, fsd.subDeptName As subDeptName, flm.locationName As locationName," +
			   "fsl.subLocation As subLocation, b.poNo As poNo, pv.custSpec As custSpec, pv.supplierName As supplierName) " +
	           "FROM FaAssetRegisterDetails ard " +
	           "JOIN FixedMaterialView fmv ON ard.matNo = fmv.matNo " +
	           "JOIN Department d ON ard.deptId = d.deptId "+
	           "JOIN FaSubDepartment fsd ON ard.deptId = fsd.deptId and ard.subDeptId = fsd.subDeptId " +
	           "JOIN FaLocationMaster flm ON ard.locationId = flm.locationId " +
	           "JOIN FaSubLocation fsl ON ard.subLocId = fsl.subLocId " +
	           "JOIN Batch b ON ard.batchId = b.batchId " +
	           "JOIN PurchaseView pv ON b.poNo = pv.poNo " +
	           "WHERE (:deptName IS NULL OR d.deptName = :deptName) " +
	           "AND (:locationName IS NULL OR flm.locationName = :locationName) " +
	           "AND (:status IS NULL OR ard.status = :status)"+
	           "ORDER BY " +
	           "CASE WHEN :sortBy = 'acquisitionDateNewestFirst' THEN ard.acquisitionDate END DESC, " +
	           "CASE WHEN :sortBy = 'assetCode' THEN LPAD(ard.assetCode, 20, '0') END ASC, " +
	           "CASE WHEN :sortBy = 'valueLowToHigh' THEN ard.lifetimeOfAssetValue END ASC, " +
	           "CASE WHEN :sortBy = 'valueHighToLow' THEN ard.lifetimeOfAssetValue END DESC,"+
			 "ard.assetCode ASC")
	    List<AssetListMainScreenDTO> findAssetDetailsByCriteria(@Param("deptName") String deptName,
	                                             @Param("locationName") String locationName,
	                                             @Param("status") String status,
	                                             @Param("sortBy") String sortBy);
	
		
//	@Query("SELECT NEW com.harness.harnessERP.dto.AssetListMainScreenDTO(ard.assetCode As assetCode, ard.status As status, ard.matNo As matNo,"+ 
//            "fmv.classificationName As classificationName, fmv.type As type, 'fmv.Category' As category, 'fmv.Specs' As specs,"+
//            "d.deptName As deptName, fsd.subDeptName As subDeptName, flm.locationName As locationName, fsl.subLocation As subLocation) " +
//            "FROM FaAssetRegisterDetails ard " +
//            "JOIN FixedMaterialView fmv ON ard.matNo = fmv.matNo " +
//            "JOIN Department d ON ard.deptId = d.deptId " +
//            "JOIN FaSubDepartment fsd ON ard.subDeptId = fsd.subDeptId " +
//            "JOIN FaLocationMaster flm ON ard.locationId = flm.locationId " +
//            "JOIN FaSubLocation fsl ON ard.subLocId = fsl.subLocId " +
//            "WHERE (:deptName IS NULL OR d.deptName = :deptName) " +
//            "AND (:locationName IS NULL OR flm.locationName = :locationName) " +
//            "AND (:status IS NULL OR ard.status = :status)")
//	Page<AssetListMainScreenDTO> findAssetDetailsByCriteriaPageable(@Param("deptName") String deptName,
//            @Param("locationName") String locationName,
//            @Param("status") String status, Pageable pageable);
	
	//Query - Asset Details For Sub Screen 
	@Query("SELECT NEW com.harness.harnessERP.dto.AssetDetailsSubScreenDTO(ard.assetId AS assetId, " +
	           "arfl.flexiField1 AS flexiField1, " +
	           "arfl.flexiField2 AS flexiField2, " +
	           "arfl.flexiField3 AS flexiField3, " +
	           "arfl.flexiField4 AS flexiField4, " +
	           "arfl.flexiField5 AS flexiField5, " +
	           "arfl.flexiField6 AS flexiField6, " +
	           "arff.assetField1 AS assetField1, " +
	           "arff.assetField2 AS assetField2, " +
	           "arff.assetField3 AS assetField3, " +
	           "arff.assetField4 AS assetField4, " +
	           "arff.assetField5 AS assetField5, " +
	           "arff.assetField6 AS assetField6) " +
	           "FROM FaAssetRegisterDetails ard " +
	           "JOIN FaAssetRegisterFlexi arfl ON ard.assetId = arfl.assetId " +
	           "JOIN FaAssetRegisterField arff ON ard.assetId = arff.assetId " +
	           "WHERE (:assetId IS NULL OR ard.assetId = :assetId)")
	           
	AssetDetailsSubScreenDTO findAssetSubDetailsById (@Param("assetId")Long assetId);
	
	// Asset Details For Sub Screen Data
//		@Query("SELECT NEW com.harness.harnessERP.dto.AssetDetailsSubScreenDataDTO(fafd.fieldName AS fieldName,  "+
//				 "fafm.astFieldId AS astFieldId," +
//				 "fafm.type AS type, " +
//				 "ffmt.flexiFieldName AS flexiFieldName) " +
//				 "FROM  FaAstFieldDetail fafd " +
//				 "JOIN  FaAssetFieldMapping fafm ON fafm.astFieldId = fafd.astFieldId " +
//				 "JOIN  FlexiFieldMaterialType ffmt ON ffmt.type = fafm.type") 
//				" WHERE (:type IS NULL OR fafm.TYPE = :type)")
	
	@Query("SELECT NEW com.harness.harnessERP.dto.AssetDetailsSubScreenDataDTO(fafd.fieldName AS fieldName,  "+
	 "fafm.astFieldId AS astFieldId)" +
//	 "fafm.type AS type) " +
	 "FROM   FaAstFieldDetail fafd " +
	 "JOIN   FaAssetFieldMapping fafm ON fafm.astFieldId = fafd.astFieldId " +
//	 "WHERE  (:type IS NULL OR fafm.type = :type)")
     "WHERE fafm.type = :type")
		List<AssetDetailsSubScreenDataDTO> findAssetSubDetailsDataById (@Param("type")String type);
	
	
	@Query("SELECT NEW com.harness.harnessERP.dto.FaAssetRegisterImageDTO(fari.assetId As assetId, fari.imageTitle As imageTitle, "
			+ "fari.imageWithFormat As imageWithFormat, fari.imgNo As imgNo,fari.image As image) " 
			+ "FROM FaAssetRegisterImage fari "+
	           "WHERE fari.assetId = :assetId")
	List<FaAssetRegisterImageDTO> findByAssetId(@Param("assetId") Long assetId);

//	 FaAssetRegisterImage findByAssetId(Long AssetId);
}

