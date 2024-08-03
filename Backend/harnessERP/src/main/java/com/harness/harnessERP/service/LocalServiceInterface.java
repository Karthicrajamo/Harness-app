package com.harness.harnessERP.service;

import java.util.List;

import com.harness.harnessERP.dto.PrivilegeDTO;

public interface LocalServiceInterface {
	public List<String> extractUserSpecificPrivileges(String userId) throws IllegalAccessException;

}
