package org.example.backend.dto;

import java.util.List;

public record ResourceDto(
    int id,
    String title,
    String identifier,
    String imageUrl,
    String publisher,
    List<AuthorDto> authors
) { }
