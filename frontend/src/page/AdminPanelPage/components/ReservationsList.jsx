import React from "react";
import ReservationsListEntry from "./ReservationsListEntry";
import '../AdminPanelStyles.css';
import axios from "axios";


function ReservationsList({reservations, setSection, fetchReservations, setShowPrompt, setPromptContent, hidePromptAfterDelay}) {

    const updateReservation = async (updatedReservation) => {
        const url = `http://localhost:9090/api/reservations/update`;
        let newData = {
            ...updatedReservation,
            title: updatedReservation.title || null,
            start: updatedReservation.start || null,
            end: updatedReservation.end || null,
            numberOfExtensions: updatedReservation.numberOfExtensions === '' ? 0 : updatedReservation.numberOfExtensions
        };
        try {
            let response = await axios.put(url, newData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            } else {
                setPromptContent({
                    error: 'true',
                    message: error.response?.data || 'Failed to update reservation.'
                });
                setShowPrompt(true);
                hidePromptAfterDelay();
            }
        }
        fetchReservations();
    }

    const borrowReservation = async (id) => {
        const url = `http://localhost:9090/api/reservations/${id}/borrow`;
        try {
            let response = await axios.put(url, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            } else {
                setPromptContent({
                    error: 'true',
                    message: error.response?.data || 'Failed to borrow resource.'
                });
                setShowPrompt(true);
                hidePromptAfterDelay();
            }
        }
        fetchReservations();
    }

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
                        borrowResource={borrowReservation}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ReservationsList;

