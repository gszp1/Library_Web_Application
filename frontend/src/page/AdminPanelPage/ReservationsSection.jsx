import React, {useState, useEffect} from "react";
import './AdminPanelStyles.css';
import axios from "axios";
import ReservationsList from "./components/ReservationsList";

function ReservationsSection({setSection}){
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(false);

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
                setSection('Error');
                return;
            }
            setError(true);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, [])

    return (
        <div className='adminPanelSection'>
            <h1>Reservations</h1>
            {error ? (
                    <p>Failed to fetch reservations</p>
                ) : (
                    <ReservationsList reservations={reservations}/>
                )
            }
        </div>
    );
};

export default ReservationsSection;