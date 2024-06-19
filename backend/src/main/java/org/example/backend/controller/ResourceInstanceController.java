package org.example.backend.controller;

import org.example.backend.dto.AdminInstanceDto;
import org.example.backend.model.ResourceInstance;
import org.example.backend.service.ResourceInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/instances")
public class ResourceInstanceController {

    private final ResourceInstanceService resourceInstanceService;

    @Autowired
    public ResourceInstanceController(ResourceInstanceService resourceInstanceService) {
        this.resourceInstanceService = resourceInstanceService;
    }

    @PreAuthorize("hasAuthority('admin:get')")
    @GetMapping("/all/resource/{id}")
    public List<AdminInstanceDto> getAllForResource(@PathVariable Integer id) {
        return resourceInstanceService.getAllAdminInstancesByResourceId(
                id,
                Sort.by(Sort.Direction.ASC, "resourceInstanceId")
        );
    }
}
