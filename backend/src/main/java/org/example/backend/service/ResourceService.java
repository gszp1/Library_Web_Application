package org.example.backend.service;

import org.example.backend.dto.AuthorDto;
import org.example.backend.dto.ResourceDto;
import org.example.backend.model.Resource;
import org.example.backend.repository.AuthorRepository;
import org.example.backend.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    private final AuthorRepository authorRepository;

    @Autowired
    public ResourceService(ResourceRepository resourceRepository, AuthorRepository authorRepository) {
        this.resourceRepository = resourceRepository;
        this.authorRepository = authorRepository;
    }

    public List<ResourceDto> getAllWithAuthors() {
        List<Resource> resources = resourceRepository.findAllWithAuthors();
        return resources.stream().map(this::mapToDto).collect(Collectors.toList());
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
            resource.getImagePath(),
            publisher,
            authors
        );
    }
}
