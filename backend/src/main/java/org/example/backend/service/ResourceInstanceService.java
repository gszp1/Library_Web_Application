package org.example.backend.service;

import org.example.backend.repository.ResourceInstanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceInstanceService {

    private final ResourceInstanceRepository resourceInstanceRepository;

    @Autowired
    public ResourceInstanceService(ResourceInstanceRepository resourceInstanceRepository) {
        this.resourceInstanceRepository = resourceInstanceRepository;
    }
}
