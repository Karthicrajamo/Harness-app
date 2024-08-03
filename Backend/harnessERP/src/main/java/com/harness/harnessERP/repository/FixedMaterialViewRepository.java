package com.harness.harnessERP.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.harness.harnessERP.model.FixedMaterialView;


@Repository
public interface FixedMaterialViewRepository extends JpaRepository<FixedMaterialView, BigDecimal>{
	
	public FixedMaterialView findMyFixedMaterialViewByMatNo(BigDecimal matNo);
	
	@Query("SELECT DISTINCT f.classificationName FROM FixedMaterialView f")
	List<String> findDistinctClassificationNames();
	
	@Query("SELECT DISTINCT f.type FROM FixedMaterialView f")
	List<String> findDistinctTypes();
}
