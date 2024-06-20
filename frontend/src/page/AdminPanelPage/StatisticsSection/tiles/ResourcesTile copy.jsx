import React, { useState, useEffect } from "react";
import '../StatisticsSectionStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function ResourcesTile({setSection}) {
    const [resourcesStats, setResourcesStats] = useState({
        numberOfResources: 0,
        numberOfInstances: 0,
        borrowedInstances: 0,
        reservedInstances: 0
    });
    const [error, setError] = useState(false);

    const fetchResourcesStats = async () => {
        const url = 'http://localhost:9090/api/statistics/resources';
        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setResourcesStats(response.data);
            setError(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
            setError(true);
        }
    };

    useEffect(() => {
        fetchResourcesStats();
    }, []);


    return (
        <div className="smallStatTile">
            <h2>{"Resources"} <FontAwesomeIcon icon={faBookOpen} style={{height:'1.75rem'}}/></h2>
            {error ? (
                <p>Failed to fetch statistics</p>
            ) : (
                <>
                <p className="tileValueHeader">Number of resources: </p>
                <p>{resourcesStats.numberOfResources}</p>
                <p className="tileValueHeader">Number of instances: </p>
                <p>{resourcesStats.numberOfInstances}</p>
                <p className="tileValueHeader">Borrowed instances: </p>
                <p>{resourcesStats.borrowedInstances}</p>
                <p className="tileValueHeader">Reserved instances: </p>
                <p>{resourcesStats.reservedInstances}</p>
                </>
            )}
        </div>
    );
}

export default ResourcesTile;