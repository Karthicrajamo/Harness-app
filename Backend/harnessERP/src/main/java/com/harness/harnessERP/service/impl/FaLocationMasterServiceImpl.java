package com.harness.harnessERP.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.harness.harnessERP.model.FaLocationMaster;
import com.harness.harnessERP.repository.FaLocationMasterRepository;
import com.harness.harnessERP.service.FaLocationMasterServiceInterface;

@Service
public class FaLocationMasterServiceImpl implements FaLocationMasterServiceInterface{
	
	private final FaLocationMasterRepository faLocationMasterRepository;
	
	@Autowired
	public FaLocationMasterServiceImpl(FaLocationMasterRepository faLocationMasterRepository) {
		super();
		this.faLocationMasterRepository = faLocationMasterRepository;
	}


	@Override
	public List<FaLocationMaster> getAllFaLocationMaster(){
		try {
			Optional<List<FaLocationMaster>> listOfFaLocationMasterOptional = Optional.ofNullable(faLocationMasterRepository.findAll());
			
			if(!listOfFaLocationMasterOptional.isPresent() || listOfFaLocationMasterOptional.get().isEmpty() ) {
				return Collections.emptyList();
			}
			List<FaLocationMaster> listOfFaLocationMaster = listOfFaLocationMasterOptional.get();
			
			System.out.println("listOfFaLocationMaster : "+listOfFaLocationMaster);
			return listOfFaLocationMaster;
		}
		catch(NoSuchElementException | IllegalStateException e) {
			throw new RuntimeException("Error Retrieving Locations !", e);
		}
		catch(Exception e) {
			throw new RuntimeException("Error Retrieving Locations !", e);
		}
		
		
	}
}
