package org.example.backend.service;

import org.example.backend.dto.*;
import org.example.backend.model.Author;
import org.example.backend.model.Publisher;
import org.example.backend.model.Resource;
import org.example.backend.model.ResourceInstance;
import org.example.backend.model.jointable.AuthorResource;
import org.example.backend.model.key.AuthorResourceKey;
import org.example.backend.repository.AuthorRepository;
import org.example.backend.repository.AuthorResourceRepository;
import org.example.backend.repository.PublisherRepository;
import org.example.backend.repository.ResourceRepository;
import org.example.backend.util.exception.InvalidDataException;
import org.example.backend.util.exception.NoSuchResourceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    private final AuthorRepository authorRepository;

    private final PublisherRepository publisherRepository;

    private final AuthorResourceRepository authorResourceRepository;

    @Autowired
    public ResourceService(
            ResourceRepository resourceRepository,
            AuthorRepository authorRepository,
            PublisherRepository publisherRepository,
            AuthorResourceRepository authorResourceRepository
    ) {
        this.resourceRepository = resourceRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
        this.authorResourceRepository = authorResourceRepository;
    }

    public List<ResourceDto> getAllWithAuthors() {
        List<Resource> resources = resourceRepository.findAllWithAuthors();
        return resources.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public Page<ResourceDto> getAllWithAuthorsPageable(Pageable pageable) {
        Page<Resource> resources = resourceRepository.findAllWithAuthorsPageable(pageable);
        return resources.map(this::mapToDto);
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

    public Page<ResourceDto> getResourcesWithKeywordInTitlePageable(String keyword, Pageable pageable) {
        return resourceRepository
                .findAllByTitleKeywordPageable(keyword, pageable)
                .map(this::mapToDto);
    }

    public void updateResourceImage(Integer id, String url) throws NoSuchResourceException {
        Optional<Resource> resourceOptional = resourceRepository.findByResourceId(id);
        if (resourceOptional.isEmpty()) {
            throw new NoSuchResourceException();
        }
        Resource resource = resourceOptional.get();
        resource.setImageUrl(url);
        resourceRepository.save(resource);
    }

    public boolean resourceExists(Integer id) {
        Optional<Resource> resource = resourceRepository.findByResourceId(id);
        return resource.isPresent();
    }

    @Transactional
    public Resource createResource(AdminResourceDto resourceDto) throws InvalidDataException {
        List<String> emails = resourceDto.authors().stream().map(AdminAuthorDto::email).toList();
        List<Author> authors = authorRepository.findByEmails(emails);
        Optional<Publisher> publisher = publisherRepository.findByName(resourceDto.publisher());
        if (authors.isEmpty() || authors.size() != resourceDto.authors().size()) {
            throw new InvalidDataException("Invalid authors");
        }
        if (publisher.isEmpty()) {
            throw new InvalidDataException("Invalid publisher");
        }
        Resource resource = Resource.builder()
                .title(resourceDto.title())
                .description(resourceDto.description())
                .publisher(publisher.get())
                .build();
        resource = resourceRepository.save(resource);

        publisher.get().getResources().add(resource);
        publisherRepository.save(publisher.get());
        //create join table entries
        Resource finalResource = resource;
        List<AuthorResource> authorResources = authors.stream()
                .map(author -> AuthorResource.builder()
                        .author(author)
                        .resource(finalResource)
                        .id(new AuthorResourceKey(author.getAuthorId(), finalResource.getResourceId()))
                        .build())
                .collect(Collectors.toList());
        authorResources = authorResourceRepository.saveAll(authorResources);
        resource.setAuthors(authorResources);
        resourceRepository.save(resource);

        authors.forEach(author -> {
            List<AuthorResource> authorResourceList = author.getResources()
                    .stream()
                    .filter(authorResource -> author.getAuthorId().equals(authorResource.getId().getAuthorId()))
                    .toList();
            author.getResources().addAll(authorResourceList);
        });
        authorRepository.saveAll(authors);

        return resource;
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
