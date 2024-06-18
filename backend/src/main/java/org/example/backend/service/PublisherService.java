package org.example.backend.service;

import jakarta.transaction.Transactional;
import org.example.backend.dto.AdminPublisherDto;
import org.example.backend.dto.PublisherDto;
import org.example.backend.model.Publisher;
import org.example.backend.repository.PublisherRepository;
import org.example.backend.util.exception.NoSuchPublisherException;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<AdminPublisherDto> getAllPublishers(){
        return publisherRepository.findAll(Sort.by(Sort.Direction.ASC, "publisherId"))
                .stream()
                .map(publisher -> new AdminPublisherDto(
                        publisher.getPublisherId(),
                        publisher.getName(),
                        publisher.getAddress()
                ))
                .collect(Collectors.toList());
    }

    public void updatePublisher(
        AdminPublisherDto dto
    ) throws OperationNotAvailableException, NoSuchPublisherException {
        if (dto.name() == null || dto.address() == null) {
            throw new OperationNotAvailableException("Not all required fields are provided.");
        }
        if (dto.name().length() > 50 || dto.address().length() > 100) {
            throw new OperationNotAvailableException("Invalid arguments length. Name:50,s Address:100.");
        }
        if (dto.name().isBlank() || dto.address().isBlank()) {
            throw new OperationNotAvailableException("Publisher name and address cannot be empty");
        }
        Optional<Publisher> publisherOptional = publisherRepository.findById(dto.publisherId());
        if (publisherOptional.isEmpty()) {
            throw new NoSuchPublisherException();
        }
        Optional<Publisher> publisherName = publisherRepository.findByName(dto.name());
        if (publisherName.isPresent() &&
            !(publisherName.get().getPublisherId().equals(publisherOptional.get().getPublisherId()))) {
            throw new OperationNotAvailableException("Publisher with given name already exists");
        }
        Optional<Publisher> publisherAddress = publisherRepository.findByAddress(dto.address());
        if (publisherAddress.isPresent() &&
        !(publisherAddress.get().getPublisherId().equals(publisherOptional.get().getPublisherId()))) {
            throw new OperationNotAvailableException("Publisher with given address already exists");
        }
        Publisher publisher = publisherOptional.get();
        publisher.setName(dto.name());
        publisher.setAddress(dto.address());
        publisherRepository.save(publisher);
    }
}
