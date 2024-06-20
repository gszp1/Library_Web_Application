package org.example.backend.statistic;

import lombok.Builder;

@Builder
public record CountsPerMonthDto(
        Long jan,
        Long feb,
        Long mar,
        Long apr,
        Long may,
        Long jun,
        Long jul,
        Long aug,
        Long sep,
        Long oct,
        Long nov,
        Long dec
) {
}
