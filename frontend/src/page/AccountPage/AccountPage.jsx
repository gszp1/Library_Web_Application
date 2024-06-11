import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AccountPageStyles.css';
import InformationSection from "./InformationSection";
import ReservationsSection from "./ReservationsSection";
import ModifyInformationSection from "./ModifyInformationSection";

function AccountPage() {
    const [section, setSection] = useState('Information');
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        joinDate: '',
        email: '',
        imageUrl: ''
    });

    const navigate = useNavigate();

    const changeSection = (e) => {
        setSection(e.currentTarget.id);
    }

    const renderSection = () => {
        switch (section) {
            case 'Information':
                return <InformationSection userCredentials={userData}/>;
            case 'ModifyInformation':
                return <ModifyInformationSection />;
            case 'Reservations':
                return <ReservationsSection />;
            default:
                return <InformationSection />;
        }
    }

    const logout = () => {
        localStorage.removeItem('WebLibToken');
        setTimeout(() => {
            navigate('/resources');
        }, 400)
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
                <li
                    style={{color: 'red', fontWeight: "bold"}}
                    onClick={logout}
                >
                    Logout
                </li>
            </ul>
            {renderSection()}
        </div>
    );
}

export default AccountPage;
