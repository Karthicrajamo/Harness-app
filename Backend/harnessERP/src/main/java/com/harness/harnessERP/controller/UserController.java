package com.harness.harnessERP.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harness.harnessERP.dto.ResetPasswordDTO;
import com.harness.harnessERP.service.UserServiceInterface;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	UserServiceInterface userServiceInterface;
	
	@PostMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
		boolean isPasswordReset = userServiceInterface.resetPassword(resetPasswordDTO.getUserId(), resetPasswordDTO.getOldPassword(), resetPasswordDTO.getNewPassword());
		if(isPasswordReset) {
			return ResponseEntity.ok().body("Password Updated!!");
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
	
}
