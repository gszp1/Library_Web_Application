package org.example.backend.controller;

import org.example.backend.dto.AdminAuthorDto;
import org.example.backend.service.AuthorService;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @PreAuthorize("hasAuthority('admin:create')")
    @PostMapping("/create")
    public ResponseEntity<String> createAuthor(@RequestBody AdminAuthorDto dto) {
        try {
            authorService.createAuthor(dto);
            return ResponseEntity.ok("Author created");
        } catch (OperationNotAvailableException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
