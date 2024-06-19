import React from "react";
import '../StatisticsSectionStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

function ResourcesTile() {
    return (
        <div className="smallStatTile">
            <h2>{"Resources"} <FontAwesomeIcon icon={faBookOpen} style={{height:'1.75rem'}}/></h2>
            <p>Resources: </p>
            <p>Instances: </p>
            <p>Borrows: </p>
            <p>Reservations:</p>
            <p></p>
        </div>
    );
}

export default ResourcesTile;