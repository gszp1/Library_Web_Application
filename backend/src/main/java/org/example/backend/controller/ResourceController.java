package org.example.backend.controller;

import org.example.backend.dto.ResourceDescriptionDto;
import org.example.backend.dto.ResourceDto;
import org.example.backend.model.Resource;
import org.example.backend.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<ResourceDto> getAll(@RequestParam(name="keyword", required = false) String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return resourceService.getAllWithAuthors();
        } else {
            return resourceService.getResourcesWithKeywordInTitle(keyword);
        }
    }
    @GetMapping("/{id}/description")
    public ResourceDescriptionDto getDescription(@PathVariable(name = "id") Integer id) {
        return resourceService.getResourceDescription(id);
    }
}
