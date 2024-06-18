package org.example.backend.service;

import org.example.backend.dto.PublisherDto;
import org.example.backend.model.Publisher;
import org.example.backend.repository.PublisherRepository;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublisherService {

    private final PublisherRepository publisherRepository;

    @Autowired
    public PublisherService(PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    public void createPublisher(PublisherDto dto) throws OperationNotAvailableException {
        if (dto.name() == null || dto.address() == null) {
            throw new OperationNotAvailableException("Not all required fields are provided.");
        }
        if (dto.name().isBlank() || dto.address().isBlank()) {
            throw new OperationNotAvailableException("Publisher name and address cannot be empty");
        }
        if (dto.name().length() > 50 || dto.address().length() > 100) {
            throw new OperationNotAvailableException("Invalid arguments length. Name:50,s Address:100.");
        }
        if (publisherRepository.findByName(dto.name()).isPresent()){
            throw new OperationNotAvailableException("Publisher with given name already exists");
        }
        if (publisherRepository.findByAddress(dto.address()).isPresent()) {
            throw new OperationNotAvailableException("Publisher with given address already exists");
        }
        Publisher publisher = Publisher.builder()
                .address(dto.address())
                .name(dto.name())
                .build();
        publisherRepository.save(publisher);
    }
}
