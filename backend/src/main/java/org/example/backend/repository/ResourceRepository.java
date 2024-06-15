package org.example.backend.repository;

import org.example.backend.model.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    @EntityGraph(attributePaths = {"authors", "authors.author", "publisher"})
    @Query("SELECT r FROM Resource r")
    List<Resource> findAllWithAuthors();

    @EntityGraph(attributePaths = {"authors", "authors.author", "publisher"})
    @Query("SELECT r FROM Resource r")
    Page<Resource> findAllWithAuthorsPageable(Pageable pageable);

    Optional<Resource> findByResourceId(Integer id);

    @EntityGraph(attributePaths = {"authors", "authors.author", "publisher"})
    @Query("SELECT r FROM Resource r WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Resource> findAllByTitleKeyword(String keyword);

    @EntityGraph(attributePaths = {"authors", "authors.author", "publisher"})
    @Query("SELECT r FROM Resource r WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Resource> findAllByTitleKeywordPageable(String keyword, Pageable pageable);
}
