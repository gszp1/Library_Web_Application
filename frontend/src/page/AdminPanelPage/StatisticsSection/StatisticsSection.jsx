import React from "react";
import '../AdminPanelStyles.css';
import './StatisticsSectionStyles.css';
import UsersTile from "./tiles/UsersTile";
import ResourcesTile from "./tiles/ResourcesTile";
import ReservationsInTimeTile from "./tiles/ReservationsInTimeTile";
import RegistrationsInTimeTile from "./tiles/RegistrationsInTimeTile";
import axios from "axios";


function StatisticsSection({setSection}) {
    return (
        <div className="adminPanelSection" style={{marginRight: '2%'}}>
            <h1>Statistics</h1>
            <div className='row'>
                <UsersTile />
                <ResourcesTile />
            </div>
            <div className='row'>
                <ReservationsInTimeTile />
            </div>
            <div className='row'>
                <RegistrationsInTimeTile />
            </div>
        </div>
    );
}

export default StatisticsSection;