import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AccountPageStyles.css';
import InformationSection from "./InformationSection";
import ReservationsSection from "./ReservationsSection";
import ModifyInformationSection from "./ModifyInformationSection";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

    useEffect(() => {
        const fetchCredentials = async () => {
            let decodedToken = '';
            let email = '';
            try {
                decodedToken = jwtDecode(localStorage.getItem('WebLibToken'));
                email = decodedToken.sub;
            } catch (error) {
                console.log("failed to parse token");
            }
            let url = `http://localhost:9090/api/users/${email}/credentials`;
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            let fetchedData = {
                name: response.data.name,
                surname: response.data.surname,
                phoneNumber: response.data.phoneNumber,
                joinDate: response.data.joinDate,
                email: response.data.email,
                imageUrl: response.data.imageUrl
            }
            setUserData(fetchedData);
        }
        fetchCredentials();
    }, [])

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
