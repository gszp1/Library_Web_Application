package org.example.backend.repository;

import org.example.backend.dto.InstanceDto;
import org.example.backend.model.ResourceInstance;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceInstanceRepository extends JpaRepository<ResourceInstance, Integer> {

    List<ResourceInstance> findByResourceResourceIdAndIsReservedFalse(Integer resourceId);

    List<ResourceInstance> findByResourceResourceId(Integer resourceId, Sort sort);

    @EntityGraph(attributePaths = {"resource"})
    @Query("SELECT i FROM ResourceInstance i")
    List<ResourceInstance> findByResourceResourceIdWithData(Integer id, Sort sort);

    @EntityGraph(attributePaths = {"resource", "reservations"})
    @Query("SELECT i FROM ResourceInstance i WHERE i.resourceInstanceId =:id")
    Optional<ResourceInstance> findByIdWithData(Integer id);
}
