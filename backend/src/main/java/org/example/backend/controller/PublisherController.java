package org.example.backend.controller;

import org.example.backend.dto.AdminPublisherDto;
import org.example.backend.dto.PublisherDto;
import org.example.backend.service.PublisherService;
import org.example.backend.util.exception.NoSuchPublisherException;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publishers")
public class PublisherController {

    private final PublisherService publisherService;

    @Autowired
    public PublisherController(PublisherService publisherService) {
        this.publisherService = publisherService;
    }

    @PreAuthorize("hasAuthority('admin:create')")
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody PublisherDto dto) {
        try {
            publisherService.createPublisher(dto);
            return ResponseEntity.ok("Publisher created");
        } catch (OperationNotAvailableException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/all")
    public ResponseEntity<List<AdminPublisherDto>> getAll() {
        return ResponseEntity.ok(publisherService.getAllPublishers());
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody AdminPublisherDto dto) {
        try {
            publisherService.updatePublisher(dto);
            return ResponseEntity.ok("Publisher updated");
        } catch (NoSuchPublisherException nspe) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException onae) {
            return ResponseEntity.badRequest().body(onae.getMessage());
        }
    }
}
