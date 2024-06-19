import React, {useState, useEffect} from "react";
import '../StatisticsSectionStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function UsersTile() {
    const [usersStats, setUsersStats] = useState({
        numberOfUsers: 0,
        avgNumberOfReservations: 0,
        avgReservationLength: 0
    });

    useEffect(() => {
        
    }, []);

    return (
        <div className='smallStatTile'>
            <h2>{"Users\t"} <FontAwesomeIcon icon={faUser} style={{fontSize:'1.75rem'}}/></h2>
            <p>Number of users: </p>
            <p>Average number of reservations:</p>
            <p>Average reservation length (days): </p>
        </div>
    );
}

export default UsersTile;