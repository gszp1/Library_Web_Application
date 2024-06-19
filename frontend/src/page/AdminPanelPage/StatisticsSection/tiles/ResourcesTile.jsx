import React from "react";
import '../StatisticsSectionStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

function ResourcesTile() {
    return (
        <div className="smallStatTile">
            <h2>{"Resources"} <FontAwesomeIcon icon={faBookOpen} style={{height:'1.75rem'}}/></h2>
            <p>Number of resources: </p>
            <p>Number of instances: </p>
            <p>Borrowed instances: </p>
            <p>Reserved instances: </p>
            <p></p>
        </div>
    );
}

export default ResourcesTile;