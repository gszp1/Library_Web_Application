import React, {useState, useEffect} from "react";
import '../StatisticsSectionStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function UsersTile({setSection}) {
    const [usersStats, setUsersStats] = useState({
        numberOfUsers: 0,
        avgNumberOfReservations: 0,
        avgReservationLength: 0
    });
    const [error, setError] = useState(false);

    const fetchUserStats = async () => {
        const url = 'http://localhost:9090/api/statistics/users';
        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setUsersStats(response.data);
            setError(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
            setError(true);
        }
    };

    useEffect(() => {
        fetchUserStats();
    }, []);

    return (
        <div className='smallStatTile'>
            <h2>{"Users\t"} <FontAwesomeIcon icon={faUser} style={{fontSize:'1.75rem'}}/></h2>
            <p>Number of users:</p>
            <p>{usersStats.numberOfUsers}</p>
            <p>Average number of reservations per user:</p>
            <p>{usersStats.avgNumberOfReservations}</p>
            <p>Average reservation length (days): </p>
            <p>{usersStats.avgReservationLength}</p>
        </div>
    );
}

export default UsersTile;