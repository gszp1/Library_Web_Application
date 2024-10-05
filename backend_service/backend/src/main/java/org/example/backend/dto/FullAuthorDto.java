package org.example.backend.dto;

public record FullAuthorDto(
    Integer authorId,
    String firstName,
    String lastName,
    String email
) {
}
