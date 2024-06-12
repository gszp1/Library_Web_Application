package org.example.backend.repository;

import org.example.backend.dto.InstanceDto;
import org.example.backend.model.ResourceInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceInstanceRepository extends JpaRepository<ResourceInstance, Integer> {

    List<ResourceInstance> findByResourceResourceIdAndIsReservedFalse(Integer resourceId);

    Optional<ResourceInstance> findByResourceInstanceId(Integer resourceInstanceId);

    List<ResourceInstance> findByResourceResourceId(Integer resourceId);
}
