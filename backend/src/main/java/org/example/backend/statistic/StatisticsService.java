package org.example.backend.statistic;

import org.example.backend.repository.ReservationRepository;
import org.example.backend.repository.ResourceInstanceRepository;
import org.example.backend.repository.ResourceRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.ReservationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        long userCount = userRepository.count(),
                reservationCount = reservationRepository.count();
        Long reservationsLengthsSum = reservationRepository.sumReservationsLengths();

        if (reservationsLengthsSum == null) {
            reservationsLengthsSum = 0L;
        }

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
                .reservedResources(reservationRepository.countReservationsWithStatus(ReservationStatus.ACTIVE))
                .borrowedResources(reservationRepository.countReservationsWithStatus(ReservationStatus.BORROWED))
                .build();
    }

}
