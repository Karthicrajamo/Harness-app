package com.harness.harnessERP.controller;


import org.apache.catalina.Authenticator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import com.harness.harnessERP.dto.LoginDTO;
import com.harness.harnessERP.model.Usertab;
import com.harness.harnessERP.repository.UserTabRepository;
import com.harness.harnessERP.security.JWTConstants;
import com.harness.harnessERP.security.JwtService;
import com.harness.harnessERP.security.UserDetailsServiceImpl;
import com.harness.harnessERP.service.LocalServiceInterface;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.management.relation.RoleNotFoundException;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class LoginController {
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
	private PasswordEncoder passwordEncoder;
    
    @Autowired
    UserTabRepository userTabRepository;
    
    @Autowired
    LocalServiceInterface localServiceInterface;
    
    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    
    @PostMapping("/login")
    public ResponseEntity<?> AuthenticateAndGetToken(@RequestBody LoginDTO loginRequestBody) throws IllegalAccessException{

    	System.out.println(">>>>>>>>>> loginRequestBody : User Id : "+loginRequestBody.getUserId()+" Password: "+loginRequestBody.getPassword());
	   Usertab usertab = userTabRepository.findById_UserId(loginRequestBody.getUserId()).orElse(null);
	   Map<String,List<String>> privilegesMap = new HashMap<>();
	   
	   List<String> privileges = localServiceInterface.extractUserSpecificPrivileges(usertab.getId().getUserId());
	   privilegesMap.put("privileges", privileges);
       if(usertab == null){
           logger.error("Username not found: " + loginRequestBody.getUserId());
           throw new UsernameNotFoundException("could not find user..!!");
       }
//       if(passwordEncoder.matches(loginRequestBody.getPassword(), usertab.getPassword())) { //use this line if password is encoded  and stored in db
       if(loginRequestBody.getPassword().equals(usertab.getPassword())) {   //use this line if raw password is stored in db
           String token = jwtService.GenerateToken(loginRequestBody.getUserId());
           
           HttpHeaders headers = new HttpHeaders();
           headers.add(JWTConstants.HEADER_STRING, JWTConstants.TOKEN_PREFIX+ token);
           System.out.println("Authentication Successful !! with response : "+ResponseEntity.ok().headers(headers).build());
           
           return ResponseEntity.ok().headers(headers).body(privilegesMap);
       } else {
//           throw new UsernameNotFoundException("Invalid username or password");
    	   System.out.println("Authentication Failed !! with response : "+ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    	   return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
       }
    }
//  @PreAuthorize("hasRole('ROLE_TES')")
    @Secured("ROLE_TEST")
    @GetMapping("/pingtest")
    public ResponseEntity<String> pingtest(){
    	System.out.println("pingtest triggered!!");
    	return ResponseEntity.status(HttpStatus.OK).build();
    }
    
}