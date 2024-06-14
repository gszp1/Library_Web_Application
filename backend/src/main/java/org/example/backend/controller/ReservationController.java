package org.example.backend.controller;

import org.example.backend.dto.ReservationDto;
import org.example.backend.model.Reservation;
import org.example.backend.service.ReservationService;
import org.example.backend.util.ReservationRequest;
import org.example.backend.util.exception.InstanceReservedException;
import org.example.backend.util.exception.NoSuchInstanceException;
import org.example.backend.util.exception.NoSuchUserException;
import org.example.backend.util.exception.UserAlreadyReservedResourceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/reservations")
@RestController
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PreAuthorize("hasAuthority('user:create')")
    @PostMapping("/create")
    public ResponseEntity<String> createReservation(@RequestBody ReservationRequest request) {
        try {
            reservationService.createReservation(request.getUserEmail(), request.getInstanceId());
            return ResponseEntity.ok("Reservation created");
        } catch (InstanceReservedException E) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Instance is already reserved");
        } catch (NoSuchInstanceException | NoSuchUserException P) {
            return ResponseEntity.notFound().build();
        } catch (UserAlreadyReservedResourceException F) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("You have already reserved such resource.");
        }
    }

    @PreAuthorize("hasAuthority('user:read')")
    @GetMapping("/{email}/all")
    public List<ReservationDto> getAllReservationsByUserEmail(@PathVariable(name="email") String email) {
        return reservationService.getAllUserReservations(email);
    }
}
