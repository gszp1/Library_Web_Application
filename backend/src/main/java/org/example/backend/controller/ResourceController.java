package org.example.backend.controller;

import org.example.backend.dto.*;
import org.example.backend.model.Resource;
import org.example.backend.service.ResourceInstanceService;
import org.example.backend.service.ResourceService;
import org.example.backend.util.exception.InvalidDataException;
import org.example.backend.util.exception.NoSuchResourceException;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    private final ResourceInstanceService instanceService;

    @Autowired
    public ResourceController(ResourceService resourceService, ResourceInstanceService instanceService) {
        this.resourceService = resourceService;
        this.instanceService = instanceService;
    }

    @GetMapping("/all")
    public List<ResourceDto> getAll(@RequestParam(name="keyword", required = false) String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return resourceService.getAllWithAuthors();
        } else {
            return resourceService.getResourcesWithKeywordInTitle(keyword);
        }
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("admin/all")
    public List<AdminResourceDto> getAllAdmin() {
        return resourceService.getAllAdmin();
    }

    @GetMapping("/all/paginated")
    public Page<ResourceDto> getAllPaginated(
        @RequestParam(name="keyword", required = false) String keyword,
        @PageableDefault(size = 10) Pageable pageable
    ) {
        if (keyword == null || keyword.isEmpty()) {
            return resourceService.getAllWithAuthorsPageable(pageable);
        } else {
            return resourceService.getResourcesWithKeywordInTitlePageable(keyword, pageable);
        }
    }


    @GetMapping("/{id}/description")
    public ResourceDescriptionDto getDescription(@PathVariable(name = "id") Integer id) {
        return resourceService.getResourceDescription(id);
    }

    @GetMapping("/{id}/instances/notReserved")
    public List<InstanceDto> getNotReservedInstances(@PathVariable(name = "id") Integer id) {
        return instanceService.getNotReservedInstancesOfResource(id);
    }

    @GetMapping("/{id}/instances")
    public List<InstanceDto> getInstances(@PathVariable(name = "id") Integer id) {
        return instanceService
                .getAllInstancesByResourceId(
                        id,
                        Sort.by(Sort.Direction.ASC, "resourceInstanceId")
                );
    }

    @PreAuthorize("hasAuthority('admin:create')")
    @PostMapping("/create")
    public ResponseEntity<String> createResource(@RequestBody CreateResourceDto resourceDto) {
        try {
            Resource resource = resourceService.createResource(resourceDto);
            return ResponseEntity.ok(resource.getResourceId().toString());
        } catch (InvalidDataException otae) {
            return ResponseEntity.badRequest().body(otae.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/update")
    public ResponseEntity<String> updateResource(@RequestBody UpdateResourceDto resourceDto) {
        try {
            resourceService.updateResource(resourceDto);
            return ResponseEntity.ok("Resource updated successfully");
        } catch (NoSuchResourceException e) {
            return ResponseEntity.notFound().build();
        } catch (InvalidDataException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
