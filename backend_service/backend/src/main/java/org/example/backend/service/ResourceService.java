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
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Arrays;
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

    @Transactional
    public Resource createResource(CreateResourceDto dto) throws InvalidDataException {
        validateDto(dto);
        Optional<Publisher> publisher = publisherRepository.findByName(dto.publisher());
        if (publisher.isEmpty()) {
            throw new InvalidDataException("Provided publisher does not exist");
        }
        // check if authors were provided and do they exist
        List<Author> authors = authorRepository.findByEmails(dto.authors());
        if (authors.size() != dto.authors().size()) {
            throw new InvalidDataException("Provided authors are invalid");
        }
        // all checked - create resource
        Resource resource = Resource.builder()
                .title(dto.title())
                .identifier(dto.identifier())
                .description(dto.description())
                .publisher(publisher.get())
                .build();
        resource = resourceRepository.save(resource);

        //update publisher
        publisher.get().getResources().add(resource);
        publisherRepository.save(publisher.get());

        // create join table records
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
        resource = resourceRepository.save(resource);

        //update authors
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

    private void validateDto(CreateResourceDto dto) throws InvalidDataException {
        if ( // validate if user did not pass empty required fields
                dto.title() == null || dto.title().isEmpty() ||
                        dto.identifier() == null || dto.identifier().isEmpty()
        ) {
            throw new InvalidDataException("Not all required fields are provided");
        }
        if ( // check if required fields are not too long
                dto.title().length() > 100 || dto.identifier().length() > 20
        ) {
            throw new InvalidDataException("Invalid required fields length. Title: 100, identifier: 20");
        }
        // check if there is no resource with given title or identifier already
        if (resourceRepository.findByTitle(dto.title()).isPresent()) {
            throw new InvalidDataException("Resource with this title already exists");
        }
        if (resourceRepository.findByIdentifier(dto.identifier()).isPresent()) {
            throw new InvalidDataException("Resource with this identifier already exists");
        }
        // check if publisher was provided and exists
        if (dto.publisher() == null || dto.publisher().isEmpty()) {
            throw new InvalidDataException("No publisher is provided");
        }
    }

    public List<AdminResourceDto> getAllAdmin() {
        return resourceRepository.findAllWithData(Sort.by(Sort.Direction.ASC, "resourceId"))
                .stream()
                .map(resource -> new AdminResourceDto(
                        resource.getResourceId(),
                        resource.getTitle(),
                        resource.getIdentifier(),
                        resource.getImageUrl(),
                        resource.getPublisher().getName(),
                        resource.getAuthors().stream().map(authorResource -> authorResource.getAuthor().getEmail())
                                .collect(Collectors.toList())
                )).collect(Collectors.toList());
    }

    @Transactional
    public void updateResource(
            UpdateResourceDto dto
    ) throws NoSuchResourceException, InvalidDataException {
        Optional<Resource> resourceOptional = resourceRepository.findByResourceId(dto.id());
        if (resourceOptional.isEmpty()) {
            throw new NoSuchResourceException();
        }
        Resource resource = resourceOptional.get();
        if (dto.title() == null || dto.identifier() == null
                || dto.identifier().isEmpty() || dto.title().isEmpty()) {
            throw new InvalidDataException("Not all required fields provided.");
        }
        //Check if user does not want to update title to one that other resource already has
        Optional<Resource> resourceTitle = resourceRepository.findByTitle(dto.title());
        if (resourceTitle.isPresent() && !resourceTitle.get().getResourceId().equals(resource.getResourceId())) {
            throw new InvalidDataException("Title already used by other resource.");
        }
        //Check if user does not want ot update identifier to one that other resource already has
        Optional<Resource> resourceIdentifier = resourceRepository.findByIdentifier(dto.identifier());
        if (resourceIdentifier.isPresent() && !resourceIdentifier.get().getResourceId().equals(resource.getResourceId())) {
            throw new InvalidDataException("Identifier already used by other resource.");
        }
        if (dto.publisher() == null || dto.publisher().isEmpty()) {
            throw new InvalidDataException("No publisher is provided");
        }

        Optional<Publisher> publisher = publisherRepository.findByName(dto.publisher());
        if (publisher.isEmpty()) {
            throw new InvalidDataException("Publisher does not exist");
        }

        // find all authors mentioned in dto
        List<Author> dtoAuthors = authorRepository.findByEmails(dto.authors());
        if (dtoAuthors.size() != dto.authors().size() || dto.authors().isEmpty()) {
            throw new InvalidDataException("Provided authors are invalid");
        }

        // update publisher if the current one is not equal to new one
        if (!resource.getPublisher().getName().equals(publisher.get().getName())) {
            Publisher old = resource.getPublisher();
            // remove old publisher from resource
            resource.getPublisher().getResources().remove(resource);
            old.getResources().remove(resource);
            // add resource to new publisher
            publisher.get().getResources().add(resource);
            resource.setPublisher(publisher.get());
            // add new publisher to resource
            publisherRepository.saveAll(Arrays.asList(old, publisher.get()));
            resource = resourceRepository.save(resource);
        }

        // get all current authors
        List<Author> authors = resource.getAuthors().stream().map(AuthorResource::getAuthor).collect(Collectors.toList());

        //find authors that should be added
        List<Author> authorsToAdd = dtoAuthors.stream().filter(author -> !authors.contains(author)).collect(Collectors.toList());

        //find authors that should be removed
        List<Author> authorsToRemove = authors.stream().filter(author -> !dtoAuthors.contains(author)).collect(Collectors.toList());

        Resource finalResource = resource;
        List<AuthorResource> joinRecordsToRemove = authorsToRemove
                .stream()
                .map(author -> authorResourceRepository.findByAuthorAndResource(author, finalResource))
                .collect(Collectors.toList());

        // remove these join records
        authorResourceRepository.deleteAll(joinRecordsToRemove);

        // remove join records from resource
        resource.getAuthors().removeAll(joinRecordsToRemove);
        resource = resourceRepository.save(resource);

        // remove join records from authors
        for (var joinRecord: joinRecordsToRemove) {
            Author author = joinRecord.getAuthor();
            author.getResources().remove(joinRecord);
        }
        authorRepository.saveAll(authorsToRemove);

        //create join records for those which are new
        List<AuthorResource> authorResources = new ArrayList<>();
        for (var author: authorsToAdd) {
            AuthorResource authorResource = AuthorResource.builder()
                    .author(author)
                    .resource(resource)
                    .id(new AuthorResourceKey(author.getAuthorId(), resource.getResourceId()))
                    .build();
            authorResources.add(authorResource);
            author.getResources().add(authorResource);
            resource.getAuthors().add(authorResource);
        }
        authorResourceRepository.saveAll(authorResources);
        authorRepository.saveAll(authorsToAdd);

        resource.setTitle(dto.title());
        resource.setIdentifier(dto.identifier());
        resource.setImageUrl(dto.imageUrl());
        resource.setDescription(dto.description());
        resourceRepository.save(resource);
    }
}
