import React from "react";
import ReservationsListEntry from "./ReservationsListEntry";
import '../AdminPanelStyles.css';
import axios from "axios";


function ReservationsList({reservations, updateReservation, borrowResource }) {
    return (
        <table className="reservationsTable">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>email</th>
                    <th>Copy Id</th>
                    <th>title</th>
                    <th>Reservation Start</th>
                    <th>Reservation End</th>
                    <th>Extension Count</th>
                    <th>Status</th>
                    <th>Borrow</th>
                    <th>Cancel</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                    <ReservationsListEntry
                        key = {reservation.reservationId}
                        reservation={reservation}
                        updateReservation={updateReservation}
                        borrowResource={borrowResource}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ReservationsList;

