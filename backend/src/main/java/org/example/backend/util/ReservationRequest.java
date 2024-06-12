package org.example.backend.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ReservationRequest {

    private String userEmail;

    private Integer instanceId;
}
