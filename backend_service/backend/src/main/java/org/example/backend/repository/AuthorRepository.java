package org.example.backend.repository;

import org.example.backend.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {

    Optional<Author> findByEmail(String email);

    Optional<Author> findByAuthorId(Integer authorId);

    @Query("SELECT a FROM Author a WHERE a.email IN :emails")
    List<Author> findByEmails(@Param("emails") List<String> emails);
}
