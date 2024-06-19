package org.example.backend.statistic;

import lombok.Builder;

@Builder
public record ResourceStatisticsDto (
        Long numberOfResources,
        Long numberOfInstances,
        Long borrowedResources,
        Long reservedResources
){
}
