package org.example.backend.repository;

import org.example.backend.model.jointable.AuthorResource;
import org.example.backend.model.key.AuthorResourceKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorResourceRepository extends JpaRepository<AuthorResource, AuthorResourceKey> {
}
