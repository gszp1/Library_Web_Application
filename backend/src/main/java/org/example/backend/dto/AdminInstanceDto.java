package org.example.backend.dto;

import org.example.backend.util.InstanceStatus;

public record AdminInstanceDto(
    Integer resourceId,
    Integer id,
    boolean isReserved,
    InstanceStatus instanceStatus
) {
}
