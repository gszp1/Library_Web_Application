import React, { useState } from "react";
import './AccountPageStyles.css';
import InformationSection from "./InformationSection";
import ReservationsSection from "./ReservationsSection";

function AccountPage() {
    const [selectedSection, setSelectedSection] = useState('Information');

    const changeSection = (e) => {
        setSelectedSection(e.currentTarget.id);
    }

    const renderSection = () => {
        switch (selectedSection) {
            case 'Information':
                return <InformationSection />;
            case 'Reservations':
                return <ReservationsSection />;
            default:
                return <InformationSection />;
        }
    }

    return (
        <div className="pageContent">
            <ul className="navigation">
                <li id='Information' onClick={changeSection}>
                    <p>Information</p>
                </li>
                <li id='Reservations' onClick={changeSection}>
                    <p>Reservations</p>
                </li>
            </ul>
            {renderSection()}
        </div>
    );
}

export default AccountPage;
