import React, { useState } from "react";
import './AccountPageStyles.css';
import InformationSection from "./InformationSection";
import ReservationsSection from "./ReservationsSection";
import ModifyInformationSection from "./ModifyInformationSection";

function AccountPage() {
    const [section, setSection] = useState('Information');

    const changeSection = (e) => {
        setSection(e.currentTarget.id);
    }

    const renderSection = () => {
        switch (section) {
            case 'Information':
                return <InformationSection />;
            case 'Reservations':
                return <ReservationsSection />;
            case 'ModifyInformation':
                return <ModifyInformationSection />;
            default:
                return <InformationSection />;
        }
    }

    return (
        <div className="accountPageContent">
            <ul className="accountPageNavigation">
                <li id='Information' onClick={changeSection}>
                    Information
                </li>
                <li id='Reservations' onClick={changeSection}>
                    Reservations
                </li>
                <li id="ModifyInformation" onClick={changeSection}>
                    Modify Information
                </li>
            </ul>
            {renderSection()}
        </div>
    );
}

export default AccountPage;
