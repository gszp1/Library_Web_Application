import React from "react";

function ReservationsList({reservations, setSection}) {
    return (
        <table>
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
            </tbody>
        </table>
    );
};

export default ReservationsList;

