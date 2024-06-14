package org.example.backend.service;

import org.example.backend.dto.ReservationDto;
import org.example.backend.model.Reservation;
import org.example.backend.model.ResourceInstance;
import org.example.backend.model.User;
import org.example.backend.repository.ReservationRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.ReservationStatus;
import org.example.backend.util.Util;
import org.example.backend.util.exception.InstanceReservedException;
import org.example.backend.util.exception.NoSuchInstanceException;
import org.example.backend.util.exception.NoSuchUserException;
import org.example.backend.util.exception.UserAlreadyReservedResourceException;
import org.springframework.beans.factory.annotation.Autowired;
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
}
