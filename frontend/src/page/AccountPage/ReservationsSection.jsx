import React, {useState, useEffect} from "react";
import './AccountPageStyles.css';

function ReservationsSection() {
    const [reservations, setReservations] = useState[[]];

    useEffect({
    }, [reservations])

    return (
        <div className='accountPageSection'>
            <h1> Reservations </h1>

        </div>
    );
}

export default ReservationsSection;