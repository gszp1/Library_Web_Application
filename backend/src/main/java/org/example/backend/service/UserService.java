package org.example.backend.service;

import org.example.backend.dto.UserDto;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<UserDto> getUserCredentials(String email) {
        return userRepository
            .findByEmail(email)
            .map(user -> new UserDto(
                    user.getName(),
                    user.getSurname(),
                    user.getPhoneNumber(),
                    user.getJoinDate(),
                    user.getEmail(),
                    user.getImageUrl()
                )
            );
    }

}
