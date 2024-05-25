package org.example.backend.dto;

public record ResourceDto(
        String title,
        String description,
        String imagePath,
        String identifier
) {
}
