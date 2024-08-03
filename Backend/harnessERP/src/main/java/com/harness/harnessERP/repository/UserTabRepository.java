package com.harness.harnessERP.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.harness.harnessERP.model.Usertab;
import com.harness.harnessERP.model.UsertabPK;

@Repository
public interface UserTabRepository extends JpaRepository<Usertab, UsertabPK>{
	
	//works fine
	
	Optional<Usertab> findById_UserId(String userId);

	//works fine
//	@Query("SELECT u FROM Usertab u WHERE u.id.userId = :userId")
//    Usertab findByUserId(@Param("userId") String userId);

}
