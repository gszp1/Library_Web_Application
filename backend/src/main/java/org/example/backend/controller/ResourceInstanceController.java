package org.example.backend.controller;

import org.example.backend.service.ResourceInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/instances")
public class ResourceInstanceController {

    private final ResourceInstanceService resourceInstanceService;

    @Autowired
    public ResourceInstanceController(ResourceInstanceService resourceInstanceService) {
        this.resourceInstanceService = resourceInstanceService;
    }
}
