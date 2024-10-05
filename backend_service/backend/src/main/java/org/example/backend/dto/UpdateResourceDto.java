package org.example.backend.dto;

import java.util.List;

public record UpdateResourceDto (
        int id,
        String title,
        String identifier,
        String imageUrl,
        String publisher,
        List<String> authors,
        String description
){

}
