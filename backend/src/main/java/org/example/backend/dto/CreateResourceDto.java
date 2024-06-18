package org.example.backend.dto;

import java.util.List;

public record    CreateResourceDto (
    String title,
    String identifier,
    String description,
    String publisher,
    List<String> authors
){
}
