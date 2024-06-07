package org.example.backend.repository;

import org.example.backend.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    @Query("SELECT r FROM Resource r JOIN FETCH r.authors a JOIN FETCH a.author")
    List<Resource> findAllWithAuthors();

    Optional<Resource> findByResourceId(Integer id);
}
