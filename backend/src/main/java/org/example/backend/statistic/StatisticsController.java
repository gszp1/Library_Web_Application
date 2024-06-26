package org.example.backend.statistic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/users")
    public ResponseEntity<UserStatisticsDto> getUserStatistics() {
        return ResponseEntity.ok(statisticsService.getUserStatistics());
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/resources")
    public ResponseEntity<ResourceStatisticsDto> getResourceStatistics() {
        return ResponseEntity.ok(statisticsService.getResourceStatistics());
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/reservations/monthCounts")
    public ResponseEntity<CountsPerMonthDto> getReservationCounts() {
        return ResponseEntity.ok(statisticsService.getReservationCountsPerMonth());
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/registrations/monthCounts")
    public ResponseEntity<CountsPerMonthDto> getRegistrationCounts() {
        return ResponseEntity.ok(statisticsService.getUsersRegistrationsCountsPerMonth());
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/reservations/top3")
    public ResponseEntity<TopThreeResourcesDto> getTop3ReservationCounts() {
        return ResponseEntity.ok(statisticsService.getTopThreeResources());
    }
}
