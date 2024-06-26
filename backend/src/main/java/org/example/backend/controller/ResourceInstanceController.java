package org.example.backend.controller;

import org.example.backend.dto.AdminInstanceDto;
import org.example.backend.model.ResourceInstance;
import org.example.backend.service.ResourceInstanceService;
import org.example.backend.util.exception.NoSuchInstanceException;
import org.example.backend.util.exception.NoSuchResourceException;
import org.example.backend.util.exception.NoSuchUserException;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instances")
public class ResourceInstanceController {

    private final ResourceInstanceService resourceInstanceService;

    @Autowired
    public ResourceInstanceController(ResourceInstanceService resourceInstanceService) {
        this.resourceInstanceService = resourceInstanceService;
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/all/resource/{id}")
    public List<AdminInstanceDto> getAllForResource(@PathVariable Integer id) {
        return resourceInstanceService.getAllAdminInstancesByResourceId(
                id,
                Sort.by(Sort.Direction.ASC, "resourceInstanceId")
        );
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/update")
    public ResponseEntity<String> updateInstance(
            @RequestBody AdminInstanceDto dto
    ) {
        try {
            resourceInstanceService.updateInstance(dto);
            return ResponseEntity.ok("Instance updated successfully");
        } catch (NoSuchInstanceException e) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<String> withdrawInstance(@PathVariable Integer id) {
        try {
            resourceInstanceService.withdrawInstance(id);
            return ResponseEntity.ok("Withdraw Success");
        } catch (NoSuchInstanceException e) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('admin:create')")
    @PostMapping("/create/{id}")
    public ResponseEntity<String> createInstance(@PathVariable Integer id) {
        try {
            resourceInstanceService.createInstance(id);
            return ResponseEntity.ok("Instance created successfully");
        } catch (NoSuchResourceException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
