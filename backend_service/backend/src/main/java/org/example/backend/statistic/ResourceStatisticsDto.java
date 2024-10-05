package org.example.backend.statistic;

import lombok.Builder;

@Builder
public record ResourceStatisticsDto (
        Long numberOfResources,
        Long numberOfInstances,
        Long borrowedInstances,
        Long reservedInstances
){
}
