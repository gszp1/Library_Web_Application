import React from "react";
import '../AdminPanelStyles.css';
import './StatisticsSectionStyles.css';
import UsersTile from "./tiles/UsersTile";
import ResourcesTile from "./tiles/ResourcesTile";
import ReservationsInTimeTile from "./tiles/ReservationsInTimeTile";
import RegistrationsInTimeTile from "./tiles/RegistrationsInTimeTile";
import axios from "axios";
import ThreeMostReservedResources from "./tiles/ThreeMostReservedResourcesTile";


function StatisticsSection({setSection}) {
    return (
        <div className="adminPanelSection" style={{marginRight: '2%'}}>
            <h1>Statistics</h1>
            <div className='row'>
                <UsersTile setSection={setSection}/>
                <ResourcesTile setSection={setSection}/>
            </div>
            <div className='row'>
                <ReservationsInTimeTile setSection={setSection}/>
            </div>
            <div className='row'>
                <RegistrationsInTimeTile setSection={setSection}/>
            </div>
            <div className='row'>
                <ThreeMostReservedResources setSection={setSection}/>
            </div>
        </div>
    );
}

export default StatisticsSection;