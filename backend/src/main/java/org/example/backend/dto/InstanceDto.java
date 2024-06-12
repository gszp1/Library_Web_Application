package org.example.backend.dto;

import java.time.LocalDate;

public record InstanceDto (
    Integer id,
    Integer resourceId,
    Boolean isReserved
){
}
