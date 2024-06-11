package org.example.backend.dto;

public record InstanceDto (
    Integer id,
    Integer resourceId,
    Boolean isReserved
){
}
