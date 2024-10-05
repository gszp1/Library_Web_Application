import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AccountPageStyles.css';
import InformationSection from "./InformationSection";
import ReservationsSection from "./ReservationsSection";
import ModifyInformationSection from "./ModifyInformationSection";
import ErrorSection from "./ErrorSection";

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
                return <InformationSection
                    userCredentials={userData}
                    setUserCredentials={setUserData}
                    setSection={setSection}
                />;
            case 'ModifyInformation':
                return <ModifyInformationSection credentials={userData}
                    setCredentials={setUserData}
                    setSection={setSection}
                    />
            case 'Reservations':
                return <ReservationsSection userEmail={userData.email} />;
            case 'Error':
                setTimeout(() => {
                    localStorage.removeItem('WebLibToken');
                    navigate('/resources');
                }, 5000);
                return <ErrorSection/>
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
