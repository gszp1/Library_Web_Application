package org.example.backend.dto;

import org.example.backend.util.ReservationStatus;

import java.time.LocalDate;

public record UserReservationDto(
        Integer instanceId,
        String title,
        LocalDate start,
        LocalDate end,
        Integer numberOfExtensions,
        ReservationStatus status
) {
}
