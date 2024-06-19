package org.example.backend.statistic;

import org.example.backend.repository.ReservationRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {

    private final UserRepository userRepository;

    private final ReservationRepository reservationRepository;

    @Autowired
    public StatisticsService(UserRepository userRepository, ReservationRepository reservationRepository) {
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
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

}
