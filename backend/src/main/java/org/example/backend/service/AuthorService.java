package org.example.backend.service;

import org.example.backend.dto.AdminAuthorDto;
import org.example.backend.model.Author;
import org.example.backend.repository.AuthorRepository;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public void createAuthor(AdminAuthorDto dto) throws OperationNotAvailableException {
        if (dto.firstName() == null|| dto.lastName() == null || dto.email() == null) {
            throw new OperationNotAvailableException("Not all required fields are provided.");
        }
        if (authorRepository.findByEmail(dto.email()).isPresent()) {
            throw new OperationNotAvailableException("Author with given email already exists.");
        }
        if (dto.firstName().isBlank() || dto.lastName().isBlank() || dto.email().isBlank()) {
            throw new OperationNotAvailableException("Not all required fields are provided.");
        }
        if (dto.firstName().length() > 20 || dto.lastName().length() > 20 || dto.email().length() > 40) {
            throw new OperationNotAvailableException("Invalid arguments length. Name and surname: 20, email: 40.");
        }
        if (!validateEmail(dto.email())) {
            throw new OperationNotAvailableException("Invalid email address.");
        }
        Author author = Author.builder()
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .email(dto.email())
                .build();
        authorRepository.save(author);
    }

    private boolean validateEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        String emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        Pattern pattern = Pattern.compile(emailPattern );
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
