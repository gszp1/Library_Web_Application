package org.example.backend.controller;

import org.example.backend.dto.AdminAuthorDto;
import org.example.backend.dto.AuthorDto;
import org.example.backend.dto.FullAuthorDto;
import org.example.backend.service.AuthorService;
import org.example.backend.util.exception.NoSuchAuthorException;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/all")
    public ResponseEntity<List<FullAuthorDto>> getAllAuthors() {
        return ResponseEntity.ok(authorService.getAllAuthors());
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/update")
    public ResponseEntity<String> updateAuthor(@RequestBody FullAuthorDto dto) {
        try {
            authorService.updateAuthor(dto);
            return ResponseEntity.ok("Author updated");
        } catch (NoSuchAuthorException nae) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
