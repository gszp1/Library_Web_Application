package org.example.backend.config;

import lombok.RequiredArgsConstructor;

import static org.example.backend.auth.Role.ADMIN;
import static org.example.backend.auth.Role.USER;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception{
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        authorisations->authorisations
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/resources/all").permitAll()
                                .requestMatchers("/api/resources/all/paginated").permitAll()
                                .requestMatchers("/api/resources/{id}/description").permitAll()
                                .requestMatchers("/api/images/{filename}").permitAll()
                                .requestMatchers("/api/resources/{id}/instances").permitAll()
                                .requestMatchers("/api/images/userImage/{filename}").permitAll()
                                .anyRequest()
                                .authenticated()

                )
                .sessionManagement(
                        session->session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
