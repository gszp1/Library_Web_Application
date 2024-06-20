import React, {useState, useEffect} from "react";
import '../StatisticsSectionStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function ReservationsInTimeTile({setSection}) {
    const [resInTime, setResInTime] = useState({
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

    const monthsReservations = Object.entries(resInTime);

    const monthsGroups = [
        monthsReservations.slice(0,4),
        monthsReservations.slice(4,8),
        monthsReservations.slice(8,12)
    ]

    const fetchReservationsInTime = async () => {

    };

    useEffect(() => {
        fetchReservationsInTime();
    }, []);

    return (
        <div className='largeStatTile'>
            <h2>Registrations in Time <FontAwesomeIcon icon={faCalendar} style={{height:'1.75rem'}}/></h2>
            <div className="statsValuesList">
                {monthsGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="monthsColumn">
                        {group.map(([month, value], index) => (
                            <div key={index} className="monthsGridItem">
                                <div className="month">{month}</div>
                                <div className="value">{value}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReservationsInTimeTile;