import React, {useState, useEffect} from "react";
import './AdminPanelStyles.css';

function ReservationsSection(){
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        url = `http://localhost:9090/api/reservations`
    }
    return (
        <div className='adminPanelSection'>
            <h1>Reservations</h1>
        </div>
    );
};

export default ReservationsSection;