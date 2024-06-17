import React, {useState, useEffect} from "react";
import './AdminPanelStyles.css';
import axios from "axios";
import ReservationsList from "./components/ReservationsList";
import ReservationPrompt from "../../component/ReservationPrompt";

function ReservationsSection({setSection}){
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false)
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    });

    const fetchReservations = async () => {
        let url = `http://localhost:9090/api/reservations/all`
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            })
            setReservations(response.data);
            setError(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setError(true);
                setSection('Error');
            } else {
                setError(true);
                setPromptContent({
                    error: 'true',
                    message: 'Error occurred during reservations fetching'
                });
                setShowPrompt(true);
                hidePromptAfterDelay();
            }
        }
    }

    useEffect(() => {
        fetchReservations();
    }, [])

    const hidePromptAfterDelay = () => {
        setTimeout(() => {
            setShowPrompt(false);
        }, 1500);
    };

    return (
        <>
        <div className='adminPanelSection'>
            <h1>Reservations</h1>
            {error ? (
                    <p>Failed to fetch reservations</p>
                ) : (
                    <ReservationsList
                        reservations={reservations}
                        setSection={setSection}
                        fetchReservations={fetchReservations}
                        setShowPrompt={setShowPrompt}
                        setPromptContent={setPromptContent}
                        hidePromptAfterDelay={hidePromptAfterDelay}
                    />
                )
            }
        </div>
        {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
};

export default ReservationsSection;