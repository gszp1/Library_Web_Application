import React, {useState, useEffect} from "react";
import '../StatisticsSectionStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from "@mui/x-charts";
import axios from "axios";


function ReservationsInTimeTile({setSection}) {
    const [resInTime, setResInTime] = useState({
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0,
    });
    const [error, setError] = useState(false);
    const monthsReservations = Object.entries(resInTime);

    const capitalizeMonthName = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    const monthsNames = [];
    const monthsValues = [];
    monthsReservations.forEach((monthRes) => {
        monthsNames.push(capitalizeMonthName(monthRes[0]));
        monthsValues.push(monthRes[1]);
    });
    const monthsGroups = [
        monthsReservations.slice(0,4),
        monthsReservations.slice(4,8),
        monthsReservations.slice(8,12)
    ];

    const fetchReservationsInTime = async () => {
        const url = 'http://localhost:9090/api/statistics/reservationMonthsCounts';
        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setResInTime(response.data);
            setError(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
            setError(true);
        }
    };

    useEffect(() => {
        fetchReservationsInTime();
    }, []);

    return (
        <div className='largeStatTile'>
            <h2>Reservations in Time <FontAwesomeIcon icon={faCalendar} style={{height:'1.75rem'}}/></h2>
            {error ? (
                <p>Failed to fetch reservations</p>
            ) : (
                <>
                    <BarChart
                    xAxis={[{scaleType: 'band', data: monthsNames, label:'Month'}]}
                    series={[{id: 'reservations', data: monthsValues, label:'Reservations', color: 'orange'}]}
                />
                    <div className="statsValuesList">
                        {monthsGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="monthsColumn">
                                {group.map(([month, value], index) => (
                                    <div key={index} className="monthsGridItem">
                                        <div className="month">{`${capitalizeMonthName(month)}:`}</div>
                                        <div className="value">{value}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ReservationsInTimeTile;