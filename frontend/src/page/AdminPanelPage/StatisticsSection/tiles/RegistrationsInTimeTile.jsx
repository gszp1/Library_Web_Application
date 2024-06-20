import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import '../StatisticsSectionStyles.css';
import axios from "axios";

function RegistrationsInTimeTile() {
    const [regInTime, setRegInTime] = useState({
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
    });

    const monthsRegistrations = Object.entries(regInTime);

    const fetchRegInTime = async () => {

    };

    useEffect(() => {
        fetchRegInTime();
    }, [])
    return (
        <div className='largeStatTile'>
            <h2>Registrations in Time <FontAwesomeIcon icon={faAddressCard} style={{height:'1.75rem'}}/></h2>
            <div className="statsValuesList">
                {monthsRegistrations.map(([month, value], index) => (
                    <div key={index} className="monthsGridItem">
                        <div className="month">{month}</div>
                        <div className="value">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RegistrationsInTimeTile;