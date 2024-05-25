package org.example.backend.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReservationStatus {
    PENDING,
    CONFIRMED,
    CANCELLED
}
