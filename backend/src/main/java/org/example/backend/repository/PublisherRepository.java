package org.example.backend.repository;

import org.example.backend.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Integer> {

    Optional<Publisher> findByName(String name);
}
