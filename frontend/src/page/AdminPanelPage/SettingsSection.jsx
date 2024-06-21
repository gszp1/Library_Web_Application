import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './AdminPanelStyles.css';
import ReservationPrompt from "../../component/ReservationPrompt";

function SettingsSection({setSection}) {
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    });
    const [showPrompt, setShowPrompt] = useState(false);

    const hidePromptAfterDelay = () => {
        setTimeout(() => {
            setShowPrompt(false);
        }, 1500);
    };

    const displayPrompt = (errorOccurred, resultMessage) => {
        setPromptContent({
            error:errorOccurred,
            message: resultMessage
        })
        setShowPrompt(true);
        hidePromptAfterDelay();
    }

    const createDatabaseNoData = async () => {
        const url = 'http://localhost:9090/api/config/database/create';
        try {
            let response = await axios.post(url, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                },
                params: {
                    withData: false
                }
            });
            displayPrompt(false, 'Database dropped and created.');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
            displayPrompt("Failed to drop and create database.");
        }
    }

    const createDatabaseWithData = async() => {
        const url = 'http://localhost:9090/api/config/database/create';
        try {
            let response = await axios.post(url, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                },
                params: {
                    withData: true
                }
            });
            displayPrompt(false, 'Database dropped and created.');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
            displayPrompt("Failed to drop and create database.");
        }
    }

    return (
        <>
        <div className='adminPanelSection'>
            <h1>{'Settings '} <FontAwesomeIcon icon={faGear} /> </h1>
            <button
                className="settingsButton"
                onClick={createDatabaseNoData}
            >
                Drop And Create Empty Database
            </button>
            <button
                className="settingsButton"
                onClick={createDatabaseWithData}
            >
                Drop And Create Database
            </button>
        </div>
        {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default SettingsSection;