package org.example.backend.demo;

//TODO : REMOVE THIS CLASS WHEN DATABASE STRUCTURE IS FINISHED

import jakarta.transaction.Transactional;
import org.example.backend.model.Author;
import org.example.backend.model.Publisher;
import org.example.backend.model.Resource;
import org.example.backend.model.ResourceInstance;
import org.example.backend.model.jointable.AuthorResource;
import org.example.backend.model.key.AuthorResourceKey;
import org.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
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

    @Autowired
    private ResourceInstanceRepository resourceInstanceRepository;

    private Random random = new Random();

    // TODO: MAKE SHURE THAT THIS CLASS IS REMOVED BEFORE DEPLOYMENT
    @Bean
    @Transactional
    CommandLineRunner dataInit() {
        return args -> {
            Author author = Author.builder().firstName("name1").lastName("surname1").build();
            Author author2 = Author.builder().firstName("name2").lastName("surname2").build();
            Author author3 = Author.builder().firstName("name3").lastName("surname3").build();
            author = authorRepository.save(author);
            author2 = authorRepository.save(author2);
            author3 = authorRepository.save(author3);
            Publisher publisher = Publisher.builder().name("name2").address("address2").build();
            publisher = publisherRepository.save(publisher);

            Resource resource = Resource.builder()
                    .identifier("x--x")
                    .title("a very very very very very long title")
                    .description("description")
                    .publisher(publisher)
                    .imageUrl("http://localhost:9090/api/images/witcher.webp")
                    .build();
            resource = resourceRepository.save(resource);

            AuthorResource authorResource1 = createAuthorResource(author, resource);
            AuthorResource authorResource2 = createAuthorResource(author2, resource);
            AuthorResource authorResource3 = createAuthorResource(author3, resource);

            List<AuthorResource> authorResourceList = authorResourceRepository.saveAll(Arrays.asList(authorResource1, authorResource2, authorResource3));

            author.getResources().addAll(authorResourceList);
            resource.getAuthors().addAll(authorResourceList);

            authorRepository.saveAll(Arrays.asList(author, author2, author3));

            ResourceInstance rs1 = ResourceInstance.builder().isReserved(false).resource(resource).build();
            ResourceInstance rs2 = ResourceInstance.builder().isReserved(true).resource(resource).build();
            ResourceInstance rs3 = ResourceInstance.builder().isReserved(false).resource(resource).build();
            ResourceInstance rs4 = ResourceInstance.builder().isReserved(true).resource(resource).build();
            ResourceInstance rs5 = ResourceInstance.builder().isReserved(false).resource(resource).build();

            List<ResourceInstance> instances = resourceInstanceRepository.saveAll(Arrays.asList(rs1, rs2, rs3, rs4, rs5));
            resource.getResourceInstances().addAll(instances);
            resourceRepository.save(resource);
        };
    }

    private AuthorResource createAuthorResource(Author author, Resource resource) {
        AuthorResourceKey arKey = new AuthorResourceKey(author.getAuthorId(), resource.getResourceId());
        return AuthorResource.builder()
                .author(author)
                .resource(resource)
                .id(arKey)
                .build();
    }

//    public void generateRandomResource() {
//        Author author = Author.builder()
//                .firstName("name" + random.nextInt(100))
//                .lastName("surname" + random.nextInt(100))
//                .build();
//        author = authorRepository.save(author);
//
//        Publisher publisher = Publisher.builder()
//                .name("name" + random.nextInt(100))
//                .address("address" + random.nextInt(100))
//                .build();
//        publisher = publisherRepository.save(publisher);
//
//        Resource resource = Resource.builder()
//                .identifier("identifier" + random.nextInt(100))
//                .title("title" + random.nextInt(100))
//                .description("description" + random.nextInt(100))
//                .publisher(publisher)
//                .build();
//        resource = resourceRepository.save(resource);
//
//        AuthorResourceKey ARKey = new AuthorResourceKey(author.getAuthorId(), resource.getResourceId());
//        AuthorResource authorResource = AuthorResource.builder()
//                .author(author)
//                .resource(resource)
//                .id(ARKey)
//                .build();
//        authorResource = authorResourceRepository.save(authorResource);
//        author.getResources().add(authorResource);
//        resource.getAuthors().add(authorResource);
//
//        authorRepository.save(author);
//        resourceRepository.save(resource);
//    }
//
//    public void generateMultipleResources(int count) {
//        for (int i = 0; i < count; i++) {
//            generateRandomResource();
//        }
//    }
}
