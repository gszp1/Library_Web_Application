import React, { useState } from "react";
import './AccountPageStyles.css';
import InformationSection from "./InformationSection";
import ReservationsSection from "./ReservationsSection";

function AccountPage() {
    const [selectedSection, setSelectedSection] = useState('Information');

    const renderSection = () => {
        switch (selectedSection) {
            case 'Information':
                return <InformationSection />
            case 'Reservations':
                return <ReservationsSection />
        }
    }

    return (
        <div className="pageContent">
            <ul className="accountNavigation">
                <li>
                    <p>Information</p>
                </li>
                <li>
                    <p>Reservations</p>
                </li>
            </ul>
            {renderSection()}
        </div>
    );
}

export default AccountPage;