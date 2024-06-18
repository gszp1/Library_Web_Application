package org.example.backend.dto;

import java.util.List;

public record AdminResourceDto(
        int id,
        String title,
        String identifier,
        String imageUrl,
        String publisher,
        String description,
        List<AdminAuthorDto> authors
) {

}
