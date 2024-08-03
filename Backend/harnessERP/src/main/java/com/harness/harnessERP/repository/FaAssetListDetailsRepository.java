package com.harness.harnessERP.repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.harness.harnessERP.model.FaAssetRegisterDetails;

@Repository
public interface FaAssetListDetailsRepository extends JpaRepository<FaAssetRegisterDetails, Long>{

//	@Query("SELECT f FROM FaAssetRegisterDetails f")
//    public List<FaAssetRegisterDetails> findAll();
	
	@Query("SELECT DISTINCT f.status FROM FaAssetRegisterDetails f")
    List<String> findDistinctStatuses();	

}
