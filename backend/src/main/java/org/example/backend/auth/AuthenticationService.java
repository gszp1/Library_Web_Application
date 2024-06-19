package org.example.backend.auth;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.JwtService;
import org.example.backend.util.exception.NoSuchUserException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        String name = request.getName();
        String surname = request.getSurname();
        String phoneNumber = request.getPhoneNumber();
        var user = User.builder()
                .name((name == null) || (name.isBlank()) ? null : name)
                .surname(((surname == null) || (surname.isBlank()) ? null : surname))
                .phoneNumber(((phoneNumber == null) || (phoneNumber.isBlank()) ? null : phoneNumber))
                .email(request.getEmail())
                .joinDate(LocalDate.now())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("Role", user.getRole().name());
        return AuthenticationResponse.builder()
                .content(jwtService.generateToken(extraClaims, user))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws NoSuchUserException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            throw new NoSuchUserException();
        }
        var user = userOptional.get();
        userRepository.save(user);
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("Role", user.getRole().name());
        return AuthenticationResponse.builder()
                    .content(jwtService.generateToken(extraClaims, user))
                    .build();
    }
}
