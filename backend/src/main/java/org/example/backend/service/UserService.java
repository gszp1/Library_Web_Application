package org.example.backend.service;

import org.example.backend.dto.UserDto;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.exception.NoSuchUserException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
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

    public void updateUserCredentials(UserDto userDto) throws NoSuchUserException {
        Optional<User> user = userRepository.findByEmail(userDto.email());
        if (user.isEmpty()) {
            throw new NoSuchUserException();
        }
        User userEntity = user.get();
        userEntity.setName(userDto.name());
        userEntity.setSurname(userDto.surname());
        userEntity.setPhoneNumber(userDto.phoneNumber());
        userRepository.save(userEntity);
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void updateUserImageUrl(String email, String imageUrl) throws NoSuchUserException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new NoSuchUserException();
        }
        user.get().setImageUrl(imageUrl);
        userRepository.save(user.get());
    }
}
