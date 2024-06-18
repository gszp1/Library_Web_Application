package org.example.backend.controller;

import org.example.backend.dto.AdminResourceDto;
import org.example.backend.dto.InstanceDto;
import org.example.backend.dto.ResourceDescriptionDto;
import org.example.backend.dto.ResourceDto;
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
    public ResponseEntity<String> createResource(@RequestBody AdminResourceDto resourceDto) {
        try {
            resourceService.createResource(resourceDto);
            return ResponseEntity.ok("Resource created");
        } catch (InvalidDataException otae) {
            return ResponseEntity.badRequest().body(otae.getMessage());
        }
    }
}
