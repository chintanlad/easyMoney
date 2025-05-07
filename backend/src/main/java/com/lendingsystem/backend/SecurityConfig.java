package com.lendingsystem.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless REST APIs

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // Allow all /api/ requests (e.g. user registration, login)
                        .anyRequest().authenticated()           // Other requests require authentication
                )

                .formLogin(form -> form
                        .permitAll() // Allow access to login form (if used)
                );

        return http.build();
    }
}
