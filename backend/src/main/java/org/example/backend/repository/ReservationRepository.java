package org.example.backend.repository;

import org.example.backend.model.Reservation;
import org.example.backend.util.ReservationStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
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
        "AND r.reservationStatus IN :statuses"
    )
    int countResourceReservationsWithStatus(
        @Param("resourceId") Integer resourceId,
        @Param("userEmail") String userEmail,
        @Param("statuses") List<ReservationStatus> statuses
    );

    @EntityGraph(attributePaths = {"resourceInstance"})
    @Query("SELECT res FROM Reservation res WHERE res.reservationStatus IN :statuses")
    List<Reservation> findAllByReservationStatusWithInstances(@Param("statuses") List<ReservationStatus> statuses);

    @EntityGraph(attributePaths = {"resourceInstance"})
    @Query("SELECT res FROM Reservation res WHERE res.reservationId=:reservationId")
    Optional<Reservation> findByReservationIdWithInstance(@Param("reservationId") Integer reservationId);

    @EntityGraph(attributePaths = {"resourceInstance", "user", "resourceInstance.resource"})
    @Query("SELECT res FROM Reservation res WHERE res.user.email=:email")
    List<Reservation> findAllByUserEmailWithInstances(@Param("email") String userEmail);

    @EntityGraph(attributePaths = {"resourceInstance", "user"})
    @Query("SELECT res FROM Reservation res WHERE res.user.email=:email AND res.reservationStatus=:status")
    List<Reservation> findAllByUserEmailAndReservationStatusWithInstances(
            @Param("email") String email,
            @Param("status") ReservationStatus status
    );

    @EntityGraph(attributePaths = {"user", "resourceInstance", "resourceInstance.resource" })
    @Query("SELECT res FROM Reservation res")
    List<Reservation> findAllWithData(Sort sort);

    @Query(value = "SELECT SUM((r.reservationEnd - r.reservationStart)) FROM Reservation r")
    Long sumReservationsLengths();

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.reservationStatus=:status")
    Long countReservationsWithStatus(@Param("status") ReservationStatus status);
}