package org.example.backend.service;

import org.example.backend.dto.InstanceDto;
import org.example.backend.repository.ResourceInstanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceInstanceService {

    private final ResourceInstanceRepository resourceInstanceRepository;

    @Autowired
    public ResourceInstanceService(ResourceInstanceRepository resourceInstanceRepository) {
        this.resourceInstanceRepository = resourceInstanceRepository;
    }

    public List<InstanceDto> getNotReservedInstancesOfResource(Integer resourceId) {
        return resourceInstanceRepository
                .findByResourceResourceIdAndIsReservedFalse(resourceId)
                .stream()
                .map(instance -> new InstanceDto(
                        instance.getResourceInstanceId(),
                        resourceId,
                        instance.getIsReserved())
                ).collect(Collectors.toList());
    }
}
