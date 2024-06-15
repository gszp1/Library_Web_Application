package org.example.backend.service;

import org.example.backend.dto.AuthorDto;
import org.example.backend.dto.ResourceDescriptionDto;
import org.example.backend.dto.ResourceDto;
import org.example.backend.model.Resource;
import org.example.backend.model.ResourceInstance;
import org.example.backend.repository.AuthorRepository;
import org.example.backend.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    @Autowired
    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<ResourceDto> getAllWithAuthors() {
        List<Resource> resources = resourceRepository.findAllWithAuthors();
        return resources.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ResourceDescriptionDto getResourceDescription(Integer id) {
        Optional<Resource> resource = resourceRepository.findByResourceId(id);
        return new ResourceDescriptionDto(resource
                .map(Resource::getDescription)
                .orElse(null)
        );
    }

    public List<ResourceDto> getResourcesWithKeywordInTitle(String keyword) {
        return resourceRepository
                .findAllByTitleKeyword(keyword)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Page<ResourceDto> getResourcesWithKeywordInTitlePageable(String keyword) {

    }

    private ResourceDto mapToDto(Resource resource) {
        String publisher = resource.getPublisher() == null ? "" : resource.getPublisher().getName();
        List<AuthorDto> authors = resource.getAuthors()
                .stream()
                .map(author -> new AuthorDto(author.getAuthor().getFirstName(), author.getAuthor().getLastName()))
                .toList();
        return new ResourceDto(
            resource.getResourceId(),
            resource.getTitle(),
            resource.getIdentifier(),
            resource.getImageUrl(),
            publisher,
            authors
        );
    }
}
