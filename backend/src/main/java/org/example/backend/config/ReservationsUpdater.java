package org.example.backend.config;

import jakarta.transaction.Transactional;
import org.example.backend.model.Reservation;
import org.example.backend.model.ResourceInstance;
import org.example.backend.repository.ReservationRepository;
import org.example.backend.service.ReservationService;
import org.example.backend.service.ResourceInstanceService;
import org.example.backend.util.ReservationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class ReservationsUpdater {

    ReservationService reservationService;

    ResourceInstanceService resourceInstanceService;

    @Autowired
    public ReservationsUpdater(
            ReservationService reservationService,
            ResourceInstanceService resourceInstanceService
    ) {
        this.reservationService = reservationService;
        this.resourceInstanceService = resourceInstanceService;
    }

    // This operation should run each day at 1 minute past midnight
    // 1 minute after midnight - to avoid date reading ambiguity
    // it updates state for reservations which reservation time is before current date
    @Scheduled(cron = "0 1 0 * * ?")
    @Transactional
    public void updateReservationsStatus() {
        List<Reservation> activeReservations = reservationService.getAllActiveReservations();
        List<ResourceInstance> modifiedInstances = new ArrayList<>();
        LocalDate now = LocalDate.now();
        activeReservations.forEach(reservation -> {
            if (now.isAfter(reservation.getReservationEnd())) {
                reservation.setReservationStatus(ReservationStatus.EXPIRED);
                reservation.getResourceInstance().setIsReserved(false);
                modifiedInstances.add(reservation.getResourceInstance());
            }
        });
        reservationService.saveAll(activeReservations);
        resourceInstanceService.saveAll(modifiedInstances);
    }
}
