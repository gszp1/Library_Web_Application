package org.example.backend.statistic;

import lombok.Builder;

@Builder
public record UserStatisticsDto(
        Long numberOfUsers,
        Long avgNumberOfReservations,
        Double avgReservationLength
){
}
