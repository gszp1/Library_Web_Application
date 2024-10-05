package org.example.backend.repository;

import org.example.backend.model.Author;
import org.example.backend.model.Resource;
import org.example.backend.model.jointable.AuthorResource;
import org.example.backend.model.key.AuthorResourceKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorResourceRepository extends JpaRepository<AuthorResource, AuthorResourceKey> {

    AuthorResource findByAuthorAndResource(Author author, Resource resource);
}
