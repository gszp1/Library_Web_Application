package org.example.backend.repository;

import org.example.backend.model.ResourceInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceInstanceRepository extends JpaRepository<ResourceInstance, Integer> {

    List<ResourceInstance> findByResourceResourceIdAndIsReservedFalse(Integer resourceId);
}
