package org.example.backend.dto;

import java.time.LocalDate;

public record UserDto(
        String name,
        String surname,
        String phoneNumber,
        LocalDate joinDate,
        String email,
        String imageUrl
) {
}
