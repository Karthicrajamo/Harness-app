package com.harness.harnessERP.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:5500","http://127.0.0.1:5500","http://localhost:8080").allowedHeaders("*")
                        .allowCredentials(true).allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
                        .exposedHeaders("Authorization","Access-Control-Allow-Origin","Access-Control-Allow-Methods", "Access-Control-Allow-Headers"); // .maxAge(3600);

            }
        };
    }
}
