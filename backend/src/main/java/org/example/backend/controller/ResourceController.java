package org.example.backend.controller;

import org.example.backend.dto.ResourceDescriptionDto;
import org.example.backend.dto.ResourceDto;
import org.example.backend.model.Resource;
import org.example.backend.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    @Autowired
    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/all")
    public List<ResourceDto> getAll() {
        return resourceService.getAllWithAuthors();
    }

    @GetMapping("/all/{keyword}")
    public List<ResourceDto> getAllWithKeyword(@PathVariable(name="keyword") String keyword) {
        return resourceService.getResourcesWithKeywordInTitle("keyword");
    }

    @GetMapping("/{id}/description")
    public ResourceDescriptionDto getDescription(@PathVariable(name = "id") Integer id) {
        return resourceService.getResourceDescription(id);
    }
}
