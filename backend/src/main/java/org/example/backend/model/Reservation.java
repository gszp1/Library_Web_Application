package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.util.ReservationStatus;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer reservationId;

    @Column(name = "reservation_start", nullable = false)
    private LocalDate reservationStart;

    @Column(name = "reservation_end", nullable = false)
    private LocalDate reservationEnd;

    @Enumerated(EnumType.STRING)
    @Column(name = "reservation_status", nullable = false)
    private ReservationStatus reservationStatus;

    @ManyToOne
    @JoinColumn(name = "FK_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "FK_resource_instance")
    private ResourceInstance resourceInstance;
}
