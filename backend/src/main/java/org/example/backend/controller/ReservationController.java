package org.example.backend.controller;

import org.example.backend.dto.AdminReservationDto;
import org.example.backend.dto.UserReservationDto;
import org.example.backend.model.Reservation;
import org.example.backend.service.ReservationService;
import org.example.backend.util.ReservationRequest;
import org.example.backend.util.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/reservations")
@RestController
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/all")
    public ResponseEntity<List<AdminReservationDto>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
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
    public List<UserReservationDto> getAllReservationsByUserEmail(@PathVariable(name="email") String email) {
        return reservationService.getUserReservations(email);
    }

    @PreAuthorize("hasAuthority('user:update')")
    @PutMapping("/{id}/extend")
    public ResponseEntity<String> extendReservation(@PathVariable(name="id") Integer id) {
        try {
            reservationService.extendReservation(id);
        } catch (NoSuchReservationException ResEx) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException OpEx) {
            return ResponseEntity.badRequest().body(OpEx.getMessage());
        }
        return ResponseEntity.ok("Reservation extended");
    }

    @PreAuthorize("hasAuthority('user:update')")
    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelReservation(@PathVariable(name="id") Integer id) {
        try {
            reservationService.cancelReservation(id);
        } catch (NoSuchReservationException ResEx) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException OpEx) {
            return ResponseEntity.badRequest().body(OpEx.getMessage());
        }
        return ResponseEntity.ok("Reservation cancelled");
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/{id}/borrow")
    public ResponseEntity<String> borrowReservation(@PathVariable(name="id") Integer id) {
        try {
            reservationService.changeToBorrow(id);
        } catch (NoSuchReservationException ResEx) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException OpEx) {
            return ResponseEntity.badRequest().body(OpEx.getMessage());
        }
        return ResponseEntity.ok("Resource borrowed.");
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/update")
    public ResponseEntity<String> updateReservation(@RequestBody AdminReservationDto request) {
        try {
            reservationService.updateReservation(request);
            return ResponseEntity.ok("Reservation updated");
        } catch (NoSuchReservationException nsre) {
            return ResponseEntity.notFound().build();
        } catch (OperationNotAvailableException onae) {
            return ResponseEntity.badRequest().body(onae.getMessage());
        }
    }
}
