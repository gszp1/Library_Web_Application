package org.example.backend.dto;

import org.example.backend.auth.Role;
import org.example.backend.util.UserStatus;

import java.time.LocalDate;

public record AdminUserDto(
        Integer id,
        String name,
        String surname,
        String phoneNumber,
        LocalDate joinDate,
        String email,
        String imageUrl,
        UserStatus status,
        Role role
) {
}
