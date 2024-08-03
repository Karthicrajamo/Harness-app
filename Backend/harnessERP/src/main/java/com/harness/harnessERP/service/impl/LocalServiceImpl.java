package com.harness.harnessERP.service.impl;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.harness.harnessERP.dto.PrivilegeDTO;
import com.harness.harnessERP.service.LocalServiceInterface;

@Service
public class LocalServiceImpl implements LocalServiceInterface{
	public static List<String> getFieldsWithY(PrivilegeDTO previlegeDTO) throws IllegalAccessException {
        List<String> fieldsWithY = new ArrayList<>();
        Field[] fields = PrivilegeDTO.class.getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            Object value = field.get(previlegeDTO);
            if (value instanceof String && "Y".equals(value)) {
                fieldsWithY.add(field.getName());
            }
        }

        return fieldsWithY;
    } 
	public List<String> extractUserSpecificPrivileges(String userId) throws IllegalAccessException{
		PrivilegeDTO privilegeDTO = new PrivilegeDTO();
		privilegeDTO.setAlerts("Y");
		privilegeDTO.setApproval("Y");
		privilegeDTO.setAssets("N");
		privilegeDTO.setAttendance("N");
		privilegeDTO.setChart("Y");
		privilegeDTO.setDocumentApproval("Y");
		privilegeDTO.setIssueGroup("N");
		privilegeDTO.setNotes("Y");
		privilegeDTO.setPayslip("N");
		privilegeDTO.setProfile("N");
		privilegeDTO.setRequest("N");
		privilegeDTO.setTask("Y");
		privilegeDTO.setTracking("N");
		privilegeDTO.setAssetList("Y");
		
		privilegeDTO.setUserId(userId);
		
		List<String> FieldsWithY = new ArrayList<>();
		FieldsWithY.addAll(getFieldsWithY(privilegeDTO));
		return FieldsWithY;
	}
}
