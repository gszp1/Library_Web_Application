package org.example.backend.service;

import org.example.backend.dto.ReservationDto;
import org.example.backend.model.Reservation;
import org.example.backend.model.ResourceInstance;
import org.example.backend.model.User;
import org.example.backend.repository.ReservationRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.ReservationStatus;
import org.example.backend.util.Util;
import org.example.backend.util.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final UserService userService;

    private final ResourceInstanceService instanceService;

    @Autowired
    public ReservationService(
            ReservationRepository reservationRepository,
            UserService userService,
            ResourceInstanceService instanceService
    ) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
        this.instanceService = instanceService;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getAllActiveReservations() {
        return reservationRepository.findAllByReservationStatusWithInstances(ReservationStatus.ACTIVE);
    }

    @Transactional
    public void createReservation(
            String userEmail,
            int instanceId
    ) throws NoSuchInstanceException, NoSuchUserException, InstanceReservedException, UserAlreadyReservedResourceException {
        Optional<ResourceInstance> instance = instanceService.getResourceInstanceById(instanceId);
        if (instance.isEmpty()) {
            throw new NoSuchInstanceException();
        }
        Optional<User> user = userService.getUserByEmail(userEmail);
        if (user.isEmpty()) {
            throw new NoSuchUserException();
        }
        if (instance.get().getIsReserved()) {
            throw new InstanceReservedException();
        }
        int reservationCount = reservationRepository
                .countResourceReservationsWithStatus(
                        instance.get().getResource().getResourceId(),
                        user.get().getEmail(),
                        ReservationStatus.ACTIVE);
        if (reservationCount != 0) {
            throw new UserAlreadyReservedResourceException();
        }
        Reservation reservation = Reservation.builder()
                .user(user.get())
                .resourceInstance(instance.get())
                .reservationStart(LocalDate.now())
                .reservationEnd(LocalDate.now().plusDays(Util.DEFAULT_RESERVATION_TIME))
                .reservationStatus(ReservationStatus.ACTIVE)
                .build();
        reservation = reservationRepository.save(reservation);
        user.get().getReservation().add(reservation);
        instance.get().setIsReserved(true);
        instance.get().getReservations().add(reservation);
        reservationRepository.save(reservation);
        userService.saveUser(user.get());
    }

    public List<ReservationDto> getAllUserReservations(String userEmail) {
        return reservationRepository.findAllByUserEmail(userEmail)
                .stream()
                .map(reservation -> new ReservationDto())
                .collect(Collectors.toList());
    }

    public void extendReservation(
        int reservationId
    ) throws NoSuchReservationException, OperationNotAvailableException{
        Optional<Reservation> reservationOptional = reservationRepository.findById(reservationId);
        if (reservationOptional.isEmpty()) {
            throw new NoSuchReservationException();
        }
        Reservation reservation = reservationOptional.get();
        if (reservation.getReservationStatus() != ReservationStatus.ACTIVE) {
            throw new OperationNotAvailableException("Can't extend reservation - is not active");
        }
        if (reservation.getExtensionCount() >= Util.MAX_NUMBER_OF_EXTENSIONS) {
            throw new OperationNotAvailableException("Can't extend reservation - reached maximal amount of times");
        }
        reservation.setReservationEnd(reservation.getReservationEnd().plusDays(Util.DEFAULT_RESERVATION_EXTENSION));
        reservation.setExtensionCount(reservation.getExtensionCount() + 1);
        reservationRepository.save(reservation);
    }

    @Transactional
    public void cancelReservation(
        Integer reservationId
    ) throws NoSuchReservationException, OperationNotAvailableException {
        Optional<Reservation> reservationOptional = reservationRepository.findByReservationIdWithInstance(reservationId);
        if (reservationOptional.isEmpty()) {
            throw new NoSuchReservationException();
        }
        Reservation reservation = reservationOptional.get();
        if (reservation.getReservationStatus() != ReservationStatus.ACTIVE) {
            throw new OperationNotAvailableException("Can't cancel reservation - is not active");
        }
        reservation.setReservationStatus(ReservationStatus.CANCELLED);
        ResourceInstance instance = reservation.getResourceInstance();
        instance.setIsReserved(false);
        instanceService.save(instance);
        reservationRepository.save(reservation);
    }

    public List<Reservation> saveAll(List<Reservation> reservations) {
        return reservationRepository.saveAll(reservations);
    }
}
