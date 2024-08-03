package com.harness.harnessERP.security;


import com.harness.harnessERP.model.Usertab;
import com.harness.harnessERP.repository.UserTabRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE) //allows spring container to create new instance or bean every time unlike singleton scope
public class UserDetailsServiceImpl implements UserDetailsService {
	
	
	
    @Autowired
    private UserTabRepository userTabRepository;
    
    

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private List<GrantedAuthority> auths = new ArrayList<>();
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        logger.debug("Entering in loadUserByUsername Method...");
        Usertab usertab = userTabRepository.findById_UserId(userId).orElse(null);
        if(usertab == null){
            logger.error("Username not found: " + userId);
            throw new UsernameNotFoundException("could not find user..!!");
        }

        List<GrantedAuthority> auths = new ArrayList<>();

        String role = usertab.getRole();

            auths.add(new SimpleGrantedAuthority("ROLE_"+role.toUpperCase()));

        return new org.springframework.security.core.userdetails.User(usertab.getId().getUserId(), usertab.getPassword(), auths);

    }

}