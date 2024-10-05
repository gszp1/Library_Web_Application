package org.example.backend.util.exception;

import lombok.Getter;

@Getter
public class InvalidDataException extends Exception{

    private final String message;

    public InvalidDataException(String message) {
        this.message = message;
    }

}
