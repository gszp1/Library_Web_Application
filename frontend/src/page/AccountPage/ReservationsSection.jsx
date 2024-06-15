import React, {useState, useEffect} from "react";
import axios from "axios";
import './AccountPageStyles.css';
import ReservationPrompt from "../../component/ReservationPrompt";

function ReservationsSection({userEmail}) {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [displayPrompt, setDisplayPrompt] = useState(false);
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    });

    const fetchReservations = async () => {
        const url = `http://localhost:9090/api/reservations/${userEmail}/all`;
        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            })
            setError(false);
            setLoading(false);
            setReservations(response.data);
            console.log(response.data);
        } catch {
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, []);

    const hidePromptAfterDelay = () => {
        setTimeout(() => {
            setDisplayPrompt(false);
        }, 3000);
    };

    const extendReservation = async(id) => {
        const url = `http://localhost:9090/api/reservations/${id}/extend`;
        try {
            let response = await axios.put(url, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setPromptContent({
                error: false,
                message: 'Reservation extended.'
            });
            setDisplayPrompt(true);
            hidePromptAfterDelay();
            fetchReservations();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setPromptContent({
                    error: true,
                    message: 'Reservation not found.'
                });
            } else {
                setPromptContent({
                    error: true,
                    message: error.response?.data || 'Failed to extend reservation.'
                });
            }
            setDisplayPrompt(true);
            hidePromptAfterDelay();
        }
    }

    const cancelReservation = async(id) => {
        const url = `http://localhost:9090/api/reservations/${id}/cancel`;
        try {
            let response = await axios.put(url, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setPromptContent({
                error: false,
                message: 'Reservation cancelled.'
            })
            setDisplayPrompt(true);
            hidePromptAfterDelay();
            fetchReservations();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setPromptContent({
                    error: true,
                    message: 'Reservation not found.'
                });
            } else {
                setPromptContent({
                    error: true,
                    message: error.response?.data || 'Failed to cancel reservation.'
                });
            }
            setDisplayPrompt(true);
            hidePromptAfterDelay();
        }
    }

    return (
        <div className='accountPageSection'>
            <h1> Reservations </h1>
            {error ? (
                <h2>Failed to load reservations.</h2>
            ) : (
                loading ? (
                    <h2>Loading reservations. Please wait.</h2>
                ) : (
                    reservations.length === 0 ? (
                        <h2>You have no reservations</h2>
                    ) : (
                        <>
                        <table className="userReservationsTable">
                            <thead>
                                <tr className="headTh">
                                    <th>Id</th>
                                    <th>Copy Id</th>
                                    <th>Title</th>
                                    <th>Reservation Start</th>
                                    <th>Reservation End</th>
                                    <th>Extension count</th>
                                    <th>Status</th>
                                    <th>Extend</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((res)=>(
                                    <tr key={res.reservationId}>
                                        <td>{res.reservationId}</td>
                                        <td>{res.instanceId}</td>
                                        <td>{res.title}</td>
                                        <td>{res.start}</td>
                                        <td>{res.end}</td>
                                        <td>{res.numberOfExtensions}</td>
                                        <td>{res.status}</td>
                                        <td>
                                            {res.status === "ACTIVE" ? (
                                                <button
                                                    className="reservationButtonActive"
                                                    onClick={() => extendReservation(res.reservationId)}
                                                >
                                                    Extend
                                                </button>
                                                ) : (
                                                <button className="reservationButtonDisabled">
                                                    Extend
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            {res.status === "ACTIVE" ? (
                                                <button
                                                    className="reservationButtonActive"
                                                    onClick={() => cancelReservation(res.reservationId)}
                                                >
                                                    Cancel
                                                </button>
                                                ) : (
                                                <button className="reservationButtonDisabled">
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {displayPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
                        </>
                    )
                )
            )}
        </div>
    );
}

export default ReservationsSection;