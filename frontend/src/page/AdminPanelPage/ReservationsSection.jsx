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

    const updateReservation = async (updatedReservation) => {
        const url = `http://localhost:9090/api/reservations/update`;
        let newData = {
            ...updatedReservation,
            title: updatedReservation.title || null,
            start: updatedReservation.start || null,
            end: updatedReservation.end || null,
            numberOfExtensions: updatedReservation.numberOfExtensions === '' ? 0 : updatedReservation.numberOfExtensions
        };
        try {
            await axios.put(url, newData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            } else {
                setPromptContent({
                    error: 'true',
                    message: error.response?.data || 'Failed to update reservation.'
                });
                setShowPrompt(true);
                hidePromptAfterDelay();
            }
        }
        fetchReservations();
    }

    const borrowResource = async (id) => {
        const url = `http://localhost:9090/api/reservations/${id}/borrow`;
        try {
            await axios.put(url, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            } else {
                setPromptContent({
                    error: 'true',
                    message: error.response?.data || 'Failed to borrow resource.'
                });
                setShowPrompt(true);
                hidePromptAfterDelay();
            }
        }
        fetchReservations();
    }

    const fetchReservations = async () => {
        let url = `http://localhost:9090/api/reservations/all`
        console.log(url);
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
                        borrowResource={borrowResource}
                        updateReservation={updateReservation}
                    />
                )
            }
        </div>
        {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
};

export default ReservationsSection;