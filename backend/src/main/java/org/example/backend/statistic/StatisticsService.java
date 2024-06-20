package org.example.backend.statistic;

import org.example.backend.model.Reservation;
import org.example.backend.repository.ReservationRepository;
import org.example.backend.repository.ResourceInstanceRepository;
import org.example.backend.repository.ResourceRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.ReservationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

@Service
public class StatisticsService {

    private final UserRepository userRepository;

    private final ReservationRepository reservationRepository;

    private final ResourceRepository resourceRepository;

    private final ResourceInstanceRepository instanceRepository;

    @Autowired
    public StatisticsService(
            UserRepository userRepository,
            ReservationRepository reservationRepository,
            ResourceRepository resourceRepository,
            ResourceInstanceRepository instanceRepository
    ) {
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.resourceRepository = resourceRepository;
        this.instanceRepository = instanceRepository;
    }

    public UserStatisticsDto getUserStatistics() {
        long userCount = userRepository.countUsers(),
             reservationCount = reservationRepository.count();
        List<Reservation> reservations = reservationRepository.findAll();
        long reservationsLengthsSum = reservations
                .stream()
                .mapToLong(reservation-> ChronoUnit.DAYS.between(
                            reservation.getReservationStart(),
                            reservation.getReservationEnd())
                )
                .sum();
        return UserStatisticsDto.builder()
                .numberOfUsers(userCount)
                .avgNumberOfReservations(userCount == 0 ? 0 : Math.round((double) reservationCount / userCount))
                .avgReservationLength(reservationCount == 0 ? 0 : (double) reservationsLengthsSum / reservationCount)
                .build();
    }

    public ResourceStatisticsDto getResourceStatistics() {
        return ResourceStatisticsDto.builder()
                .numberOfResources(resourceRepository.count())
                .numberOfInstances(instanceRepository.count())
                .reservedInstances(reservationRepository.countReservationsWithStatus(ReservationStatus.ACTIVE))
                .borrowedInstances(reservationRepository.countReservationsWithStatus(ReservationStatus.BORROWED))
                .build();
    }

    public CountsPerMonthDto getReservationCountsPerMonth() {
        return CountsPerMonthDto.builder()
                .jan(reservationRepository.countReservationsByStartMonth(1))
                .feb(reservationRepository.countReservationsByStartMonth(2))
                .mar(reservationRepository.countReservationsByStartMonth(3))
                .apr(reservationRepository.countReservationsByStartMonth(4))
                .may(reservationRepository.countReservationsByStartMonth(5))
                .jun(reservationRepository.countReservationsByStartMonth(6))
                .jul(reservationRepository.countReservationsByStartMonth(7))
                .aug(reservationRepository.countReservationsByStartMonth(8))
                .sep(reservationRepository.countReservationsByStartMonth(9))
                .oct(reservationRepository.countReservationsByStartMonth(10))
                .nov(reservationRepository.countReservationsByStartMonth(11))
                .dec(reservationRepository.countReservationsByStartMonth(12))
                .build();
    }

    public CountsPerMonthDto getUsersRegistrationsCountsPerMonth() {
        return CountsPerMonthDto.builder()
                .jan(userRepository.countByRegistrationDateMonth(1))
                .feb(userRepository.countByRegistrationDateMonth(2))
                .mar(userRepository.countByRegistrationDateMonth(3))
                .apr(userRepository.countByRegistrationDateMonth(4))
                .may(userRepository.countByRegistrationDateMonth(5))
                .jun(userRepository.countByRegistrationDateMonth(6))
                .jul(userRepository.countByRegistrationDateMonth(7))
                .aug(userRepository.countByRegistrationDateMonth(8))
                .sep(userRepository.countByRegistrationDateMonth(9))
                .oct(userRepository.countByRegistrationDateMonth(10))
                .nov(userRepository.countByRegistrationDateMonth(11))
                .dec(userRepository.countByRegistrationDateMonth(12))
                .build();
    }

}
