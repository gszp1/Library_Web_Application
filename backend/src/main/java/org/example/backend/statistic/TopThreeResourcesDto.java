package org.example.backend.statistic;

import lombok.Builder;

@Builder
public record TopThreeResourcesDto(
        String firstName,
        Long firstCount,
        String secondName,
        Long secondCount,
        String thirdName,
        Long thirdCount
) {
}
