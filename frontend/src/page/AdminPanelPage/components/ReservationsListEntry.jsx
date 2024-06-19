import React, {useState, useEffect} from "react";

function ReservationsListEntry({reservation, updateReservation, borrowResource}) {
    const [updatedReservation, setUpdatedReservation] = useState({
        reservationId: reservation.reservationId || '',
        userEmail: reservation.userEmail || '',
        instanceId: reservation.instanceId || '',
        title: reservation.title || '',
        start: reservation.start || '',
        end: reservation.end || '',
        numberOfExtensions: reservation.numberOfExtensions || 0,
        status: reservation.status || 'ACTIVE'
    });


    useEffect(() => {
        setUpdatedReservation({
            reservationId: reservation.reservationId || '',
            userEmail: reservation.userEmail || '',
            instanceId: reservation.instanceId || '',
            title: reservation.title || '',
            start: reservation.start || '',
            end: reservation.end || '',
            numberOfExtensions: reservation.numberOfExtensions || 0,
            status: reservation.status || 'ACTIVE'
        });
    }, [reservation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedReservation((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        updateReservation(updatedReservation);
    };

    const handleBorrow = () => {
        borrowResource(updatedReservation.reservationId);
    }

    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="reservationId"
                    value={updatedReservation.reservationId}
                    readOnly
                />
            </td>
            <td>
                <input
                    type="email"
                    name="userEmail"
                    value={updatedReservation.userEmail}
                    readOnly
                />
            </td>
            <td>
                <input
                    type="text"
                    name="instanceId"
                    value={updatedReservation.instanceId}
                    onChange={handleChange}
                    readOnly
                />
            </td>
            <td>
                <input
                    type="text"
                    name="title"
                    value={updatedReservation.title}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="date"
                    name="start"
                    value={updatedReservation.start}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="date"
                    name="end"
                    value={updatedReservation.end}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="numberOfExtensions"
                    value={updatedReservation.numberOfExtensions}
                    onChange={handleChange}
                    style={{appearance: 'textfield'}}
                />
            </td>
            <td>
                <select
                    name="status"
                    value={updatedReservation.status}
                    onChange={handleChange}
                >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="BORROWED">BORROWED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="EXPIRED">EXPIRED</option>
                </select>
            </td>
            <td>
                <button onClick={handleBorrow}>Borrow</button>
            </td>
            <td>
                <button onClick={handleUpdate}>Update</button>
            </td>
        </tr>
    );
}

export default ReservationsListEntry;