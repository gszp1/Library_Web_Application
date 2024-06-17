import React from "react";
import ReservationsListEntry from "./ReservationsListEntry";
import '../AdminPanelStyles.css';


function ReservationsList({reservations, setSection}) {

    const updateReservation = async (updatedReservation) => {

    }

    return (
        <table className="reservationsTable">
            <thead>
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
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                    <ReservationsListEntry
                        reservation={reservation}
                        updateReservation={updateReservation}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ReservationsList;

