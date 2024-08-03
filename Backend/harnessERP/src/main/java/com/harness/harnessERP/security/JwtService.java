package com.harness.harnessERP.security;

import com.harness.harnessERP.dto.PrivilegeDTO;
import com.harness.harnessERP.model.Usertab;
import com.harness.harnessERP.repository.UserTabRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.lang.reflect.Field;
import java.security.Key;
import java.util.*;
import java.util.function.Function;

//@Component
@Service
public class JwtService {
//    public static final String SECRET = "357638792F423F4428472B4B6250655368566D597133743677397A2443264629";
    private final SecretKey jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private long jwtExpirationTime = 3600000; //1 hr

    @Autowired
    UserTabRepository userTabRepository;
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
//        return Jwts
//                .parserBuilder()
//                .setSigningKey(getSignKey())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
                System.out.println("------------------- "+token);
                return Jwts
                .parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        System.out.println("is username in token & userdetails are same? : "+username.equals(userDetails.getUsername()));
        System.out.println("user name in token: "+username+"\n"+"username in userdetails: "+userDetails.getUsername());
        System.out.println("is token is expired? : "+ isTokenExpired(token));
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    

    public String GenerateToken(String userId){
        Map<String, Object> claims = new HashMap<>();
        Usertab usertab = userTabRepository.findById_UserId(userId).orElse(null);
     
    		
    		
        String role=usertab.getRole();
        claims.put("role",Collections.singletonList("ROLE_"+role.toUpperCase()));
//        claims.put("previleges", Collections.singletonList(FieldsWithY));
        
        System.out.println(Collections.singletonList("ROLE_"+role.toUpperCase()));
        return createToken(claims, userId);
    }



    private String createToken(Map<String, Object> claims, String username) {

//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(username)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis()+1000*60*1))
//                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
        Date currentDate = new Date();
        Date expiryDate = new Date(currentDate.getTime() + jwtExpirationTime);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis()+1000*60*1))
                .setExpiration(expiryDate)
                .signWith(jwtSecret, SignatureAlgorithm.HS256).compact();
    }
//    public String extractUsername(String token){
//        Claims claims  = extractAllClaims(token);
//        return claims.getSubject();
//    }

//    private Key getSignKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
}
