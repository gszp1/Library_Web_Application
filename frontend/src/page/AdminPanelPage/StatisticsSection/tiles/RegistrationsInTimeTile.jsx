import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import '../StatisticsSectionStyles.css';
import axios from "axios";
import { BarChart } from "@mui/x-charts";

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
    const monthsNames = [];
    const monthsValues = [];
    monthsRegistrations.forEach((monthRes) => {
        monthsNames.push(monthRes[0]);
        monthsValues.push(monthRes[1]);
    });

    const monthsGroups = [
        monthsRegistrations.slice(0,4),
        monthsRegistrations.slice(4,8),
        monthsRegistrations.slice(8,12)
    ]

    const fetchRegInTime = async () => {

    };

    useEffect(() => {
        fetchRegInTime();
    }, [])
    return (
        <div className='largeStatTile'>
            <h2>Registrations in Time <FontAwesomeIcon icon={faAddressCard} style={{height:'1.75rem'}}/></h2>
            <BarChart
                xAxis={[{scaleType: 'band', data: monthsNames, label:'Month'}]}
                series={[{id: 'reservations', data: monthsValues, label:'Reservations', color: 'orange'}]}
            />
            <div className="statsValuesList">
                {monthsGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="monthsColumn">
                        {group.map(([month, value], index) => (
                            <div key={index} className="monthsGridItem">
                                <div className="month">{`${month}: `}</div>
                                <div className="value">{value}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RegistrationsInTimeTile;