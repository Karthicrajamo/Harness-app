package com.harness.harnessERP.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Autowired
    UserDetailsServiceImpl userDetailsServiceImpl;
    
    

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            username = jwtService.extractUsername(token);

        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
        	System.out.println("Security Context Authentication details before userDetailsServiceImpl.loadUserByUsername(username)"+SecurityContextHolder.getContext().getAuthentication());
            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
            System.out.println("userdetails from loadUserByUsername : "+userDetails);
            if(jwtService.validateToken(token, userDetails)){
                System.out.println("Token is Valid");
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                System.out.println("Token after Authorization : "+authenticationToken);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                System.out.println("SecurityContext in SecurityContextHolder: "+SecurityContextHolder.getContext());
            }
            else{
                System.out.println("Token is invalid.");
            }

        }

        filterChain.doFilter(request, response);
    }
}

