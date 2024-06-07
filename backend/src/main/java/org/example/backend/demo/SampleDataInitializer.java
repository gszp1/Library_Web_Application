package org.example.backend.demo;

//TODO : REMOVE THIS CLASS WHEN DATABASE STRUCTURE IS FINISHED

import org.example.backend.model.Author;
import org.example.backend.model.Publisher;
import org.example.backend.model.Resource;
import org.example.backend.model.jointable.AuthorResource;
import org.example.backend.model.key.AuthorResourceKey;
import org.example.backend.repository.AuthorRepository;
import org.example.backend.repository.AuthorResourceRepository;
import org.example.backend.repository.PublisherRepository;
import org.example.backend.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class SampleDataInitializer {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private PublisherRepository publisherRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private AuthorResourceRepository authorResourceRepository;

    private Random random = new Random();

    // TODO: MAKE SHURE THAT THIS CLASS IS REMOVED BEFORE DEPLOYMENT
    @Bean
    CommandLineRunner dataInit(
        AuthorRepository authorRepository,
        PublisherRepository publisherRepository,
        ResourceRepository resourceRepository,
        AuthorResourceRepository authorResourceRepository
    ) {
        return args -> {
            Author author = Author.builder().firstName("name1").lastName("surname1").build();
            author = authorRepository.save(author);
            Publisher publisher = Publisher.builder().name("name2").address("address2").build();
            publisher = publisherRepository.save(publisher);
            Resource resource = Resource.builder()
                    .identifier("x--x")
                    .title("title")
                    .description("description")
                    .publisher(publisher)
                    .imageUrl("http://localhost:9090/api/images/witcher.webp")
                    .build();
            resource = resourceRepository.save(resource);
            publisher = publisherRepository.save(publisher);
            AuthorResourceKey ARKey = new AuthorResourceKey(author.getAuthorId(), resource.getResourceId());
            AuthorResource authorResource = AuthorResource
                    .builder()
                    .author(author)
                    .resource(resource)
                    .id(ARKey)
                    .build();
            authorResource = authorResourceRepository.save(authorResource);
            author.getResources().add(authorResource);
            resource.getAuthors().add(authorResource);
            author = authorRepository.save(author);
            resource = resourceRepository.save(resource);
            generateMultipleResources(5);
        };
    }

    public void generateRandomResource() {
        Author author = Author.builder()
                .firstName("name" + random.nextInt(100))
                .lastName("surname" + random.nextInt(100))
                .build();
        author = authorRepository.save(author);

        Publisher publisher = Publisher.builder()
                .name("name" + random.nextInt(100))
                .address("address" + random.nextInt(100))
                .build();
        publisher = publisherRepository.save(publisher);

        Resource resource = Resource.builder()
                .identifier("identifier" + random.nextInt(100))
                .title("title" + random.nextInt(100))
                .description("description" + random.nextInt(100))
                .publisher(publisher)
                .build();
        resource = resourceRepository.save(resource);

        AuthorResourceKey ARKey = new AuthorResourceKey(author.getAuthorId(), resource.getResourceId());
        AuthorResource authorResource = AuthorResource.builder()
                .author(author)
                .resource(resource)
                .id(ARKey)
                .build();
        authorResource = authorResourceRepository.save(authorResource);

        author.getResources().add(authorResource);
        resource.getAuthors().add(authorResource);

        authorRepository.save(author);
        resourceRepository.save(resource);
    }

    public void generateMultipleResources(int count) {
        for (int i = 0; i < count; i++) {
            generateRandomResource();
        }
    }
}
