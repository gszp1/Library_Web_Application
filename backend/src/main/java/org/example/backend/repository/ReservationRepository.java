package org.example.backend.repository;

import org.example.backend.model.Reservation;
import org.example.backend.util.ReservationStatus;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findAllByUserEmail(String email);

    @Query("SELECT COUNT(r) " +
        "FROM User u " +
        "JOIN u.reservation r " +
        "JOIN r.resourceInstance ri "+
        "JOIN ri.resource res " +
        "WHERE u.email=:userEmail " +
        "AND res.resourceId =:resourceId " +
        "AND r.reservationStatus =:status"
    )
    int countResourceReservationsWithStatus(
        @Param("resourceId") Integer resourceId,
        @Param("userEmail") String userEmail,
        @Param("status") ReservationStatus status
    );

    @Query("SELECT res FROM Reservation res JOIN FETCH res.resourceInstance WHERE res.reservationStatus=:status")
    List<Reservation> findAllByReservationStatusWithInstances(@Param("status") ReservationStatus status);

    @Query("SELECT res FROM Reservation res JOIN FETCH res.resourceInstance WHERE res.reservationId=:reservationId")
    Optional<Reservation> findByReservationIdWithInstance(@Param("reservationId") Integer reservationId);
}