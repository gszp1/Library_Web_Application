package org.example.backend.util.exception;

import lombok.Getter;

@Getter
public class OperationNotAvailableException extends Exception {

    private final String message;

    public OperationNotAvailableException(String message) {
        this.message = message;
    }
}
