package com.harness.harnessERP.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.harness.harnessERP.model.Usertab;
import com.harness.harnessERP.repository.UserTabRepository;
import com.harness.harnessERP.service.UserServiceInterface;

@Service
public class UserServiceImpl implements UserServiceInterface{
	
	@Autowired
	UserTabRepository userTabRepository;
	
	@Override
	public boolean resetPassword(String userId, String oldPassword, String newPassword ) {
		Usertab user = userTabRepository.findById_UserId(userId).orElse(null);
		if(!user.equals(null)) {
			String existingPassword = user.getPassword();
			if(existingPassword.equals(oldPassword)) {
				
				user.setPassword(newPassword);
				userTabRepository.save(user);
				return true;
			}
		}
		return false;
	}
	
}
