package com.hcl.project.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Http;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests(
                        auth -> auth
                                .requestMatchers("/check").permitAll()
                                .requestMatchers("/emp-page").hasAnyRole("EMPLOYEE", "MANAGER", "HR", "CEO")
                                .requestMatchers("/getAllEmpsByRole/**").hasAnyRole("EMPLOYEE", "MANAGER", "HR", "CEO")
                                .requestMatchers("/manager-page").hasAnyRole("MANAGER", "HR", "CEO")
                                .requestMatchers("/hr-page").hasAnyRole("HR", "CEO")
                                .requestMatchers("/ceo-page").hasAnyRole("CEO")
                                .anyRequest().permitAll())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
