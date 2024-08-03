package com.harness.harnessERP.repository;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.harness.harnessERP.model.FixedMaterialView;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
@Service
public abstract class FixedMaterialViewRepositoryImpl implements FixedMaterialViewRepository{
	@Autowired
    public EntityManager entityManager;

    @Transactional
    @Override
    public FixedMaterialView findMyFixedMaterialViewByMatNo(BigDecimal matNo) {
    	System.out.println("SELECT\n"
        		+ "    mat_no As matNo ,\n"
        		+ "    asset_category As assetCategory,\n"
        		+ "    classification_id As classificationId,\n"
        		+ "    classification_name As classificationName,\n"
        		+ "    \"Category\" As Category,\n"
        		+ "    \"type\" As type,\n"
        		+ "    uom1 As uom1,\n"
        		+ "    color As color,\n"
        		+ "    spec_no As specNo,\n"
        		+ "    ref_no As refNo,\n"
        		+ "    Specs As Specs,\n"
        		+ "    type_code As typeCode,\n"
        		+ "    cwip_asset As cwipAsset,\n"
        		+ "    allow_issue_cwip As ,\n"
        		+ "    allow_issue_consumable As allowIssueCwip,\n"
        		+ "    salvage_value_mandatory As salvageValueMandatory,\n"
        		+ "    allow_delete_r_disposal As allowDeleteRDisposal,\n"
        		+ "    purchase_req_mandatory As purchaseReqMandatory,\n"
        		+ "    flexi1 As flexi1,\n"
        		+ "    flexi2 As flexi2,\n"
        		+ "    flexi3 As flexi3,\n"
        		+ "    flexi4 As flexi4,\n"
        		+ "    flexi5 As flexi5,\n"
        		+ "    flexi6 As flexi6\n"
        		+ "FROM\n"
        		+ "    fixed_material_view\n"
        		+ "WHERE\n"
        		+ "    mat_no = :matNo");
        Query query = entityManager.createNativeQuery("SELECT\n"
        		+ "    mat_no As matNo ,\n"
        		+ "    asset_category As assetCategory,\n"
        		+ "    classification_id As classificationId,\n"
        		+ "    classification_name As classificationName,\n"
        		+ "    \"Category\" As Category,\n"
        		+ "    \"type\" As type,\n"
        		+ "    uom1 As uom1,\n"
        		+ "    color As color,\n"
        		+ "    spec_no As specNo,\n"
        		+ "    ref_no As refNo,\n"
//        		+ "    \\\"Specs\\\" As specs,\n"
        		+ "    type_code As typeCode,\n"
        		+ "    cwip_asset As cwipAsset,\n"
        		+ "    allow_issue_cwip As ,\n"
        		+ "    allow_issue_consumable As allowIssueCwip,\n"
        		+ "    salvage_value_mandatory As salvageValueMandatory,\n"
        		+ "    allow_delete_r_disposal As allowDeleteRDisposal,\n"
        		+ "    purchase_req_mandatory As purchaseReqMandatory,\n"
        		+ "    flexi1 As flexi1,\n"
        		+ "    flexi2 As flexi2,\n"
        		+ "    flexi3 As flexi3,\n"
        		+ "    flexi4 As flexi4,\n"
        		+ "    flexi5 As flexi5,\n"
        		+ "    flexi6 As flexi6\n"
        		+ "FROM\n"
        		+ "    fixed_material_view\n"
        		+ "WHERE\n"
        		+ "    mat_no = :matNo", FixedMaterialView.class);
        query.setParameter("matNo", matNo);
        return (FixedMaterialView) query.getSingleResult();
    }
}
