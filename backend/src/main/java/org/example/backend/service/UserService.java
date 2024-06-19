package org.example.backend.service;

import org.example.backend.dto.AdminUserDto;
import org.example.backend.dto.UserDto;
import org.example.backend.model.Reservation;
import org.example.backend.model.ResourceInstance;
import org.example.backend.model.User;
import org.example.backend.repository.ReservationRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.ReservationStatus;
import org.example.backend.util.exception.NoSuchUserException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ResourceInstanceService resourceInstanceService;

    public UserService(
            UserRepository userRepository,
            ReservationRepository reservationRepository,
            ResourceInstanceService resourceInstanceService
    ) {
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.resourceInstanceService = resourceInstanceService;
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

    public List<AdminUserDto> findAllByEmailKeyword(String keyword) {
        return userRepository.findAllByEmailKeyword(keyword)
                .stream()
                .map(user -> new AdminUserDto(
                        user.getUserId(),
                        user.getName(),
                        user.getSurname(),
                        user.getPhoneNumber(),
                        user.getJoinDate(),
                        user.getEmail(),
                        user.getImageUrl(),
                        user.getStatus(),
                        user.getRole()
                ))
                .collect(Collectors.toList());
    }

    public List<AdminUserDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(user -> new AdminUserDto(
                        user.getUserId(),
                        user.getName(),
                        user.getSurname(),
                        user.getPhoneNumber(),
                        user.getJoinDate(),
                        user.getEmail(),
                        user.getImageUrl(),
                        user.getStatus(),
                        user.getRole()
                ))
                .collect(Collectors.toList());
    }

    public AdminUserDto findById(Integer id) {
        Optional<User> userOptional = userRepository.findByUserId(id);
        if (userOptional.isEmpty()) {
            return null;
        }
        User user = userOptional.get();
        return new AdminUserDto(
                user.getUserId(),
                user.getName(),
                user.getSurname(),
                user.getPhoneNumber(),
                user.getJoinDate(),
                user.getEmail(),
                user.getImageUrl(),
                user.getStatus(),
                user.getRole()
        );
    }

    public void updateUser(AdminUserDto adminUserDto) throws NoSuchUserException {
        Optional<User> userOptional = userRepository.findByEmail(adminUserDto.email());
        if (userOptional.isEmpty()) {
            throw new NoSuchUserException();
        }
        User user = userOptional.get();
        updateUserWithDto(user, adminUserDto);
        if (user.getStatus() != adminUserDto.status() || user.getRole() != adminUserDto.role()) {
            cancelAllActiveUserReservations(user.getEmail());
        }
        userRepository.save(user);
    }

    public void cancelAllActiveUserReservations(String userEmail) {
        List<Reservation> reservations = reservationRepository
                .findAllByUserEmailAndReservationStatusWithInstances(userEmail, ReservationStatus.ACTIVE);
        List<ResourceInstance> instances = new ArrayList<>();
        reservations.forEach(reservation -> {
            reservation.setReservationStatus(ReservationStatus.CANCELLED);
            ResourceInstance instance = reservation.getResourceInstance();
            if (instance.getIsReserved()) {
                instance.setIsReserved(false);
                instances.add(instance);
            }
        });
        reservationRepository.saveAll(reservations);
        resourceInstanceService.saveAll(instances);
    }

    private void updateUserWithDto(User user, AdminUserDto adminUserDto) {
        user.setName(adminUserDto.name());
        user.setSurname(adminUserDto.surname());
        user.setPhoneNumber(adminUserDto.phoneNumber());
        user.setEmail(adminUserDto.email());
        user.setImageUrl(adminUserDto.imageUrl());
        user.setStatus(adminUserDto.status());
        user.setRole(adminUserDto.role());
    }
}
