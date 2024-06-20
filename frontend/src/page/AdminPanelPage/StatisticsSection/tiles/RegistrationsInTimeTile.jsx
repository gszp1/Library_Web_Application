import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import '../StatisticsSectionStyles.css';
import axios from "axios";
import { BarChart } from "@mui/x-charts";

function RegistrationsInTimeTile({setSection}) {
    const [regInTime, setRegInTime] = useState({
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

    const capitalizeMonthName = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    const monthsRegistrations = Object.entries(regInTime);
    const monthsNames = [];
    const monthsValues = [];
    monthsRegistrations.forEach((monthRes) => {
        monthsNames.push(capitalizeMonthName(monthRes[0]));
        monthsValues.push(monthRes[1]);
    });

    const monthsGroups = [
        monthsRegistrations.slice(0,4),
        monthsRegistrations.slice(4,8),
        monthsRegistrations.slice(8,12)
    ]

    const fetchRegInTime = async () => {
        const url = 'http://localhost:9090/api/statistics/registrationMonthsCounts';
        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setRegInTime(response.data);
            setError(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
            setError(true);
        }
    };

    useEffect(() => {
        fetchRegInTime();
    }, [])
    return (
        <div className='largeStatTile'>
            <h2>Registrations in Time <FontAwesomeIcon icon={faAddressCard} style={{height:'1.75rem'}}/></h2>
            {error ? (
                <p>Failed to fetch reservations</p>
            ) : (
                <>
                <BarChart
                    xAxis={[{scaleType: 'band', data: monthsNames, label:'Month'}]}
                    series={[{id: 'registrations', data: monthsValues, label:'Registrations', color: 'orange'}]}
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

export default RegistrationsInTimeTile;