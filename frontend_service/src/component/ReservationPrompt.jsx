import React from "react";

function ReservationPrompt({error, message}) {
    const textColor = error ? 'red' : 'green';
    const title = error ? 'Failure' : 'Success';

    const reservationPromptStyles = {
        reservationPrompt: {
            position: 'fixed',
            top: 'calc(50% - 5rem)',
            left: 'calc(50% - 15rem)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10rem',
            width: '30rem',
            fontWeight: 'bold',
            border: '1px solid orange',
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '1rem 0',
            boxShadow: '0 3px 5px rgb(48, 43, 43)'
        },
        h1: {
            color: textColor,
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%',
            fontSize: '2rem',
            margin: '0 0 1rem 0',
            padding: '0'
        },
        p: {
            color: textColor,
            width: '100%',
            textAlign: 'center',
            fontSize: '1rem'
        }
    };

    return (
        <div
            className='reservationPrompt'
            style={reservationPromptStyles.reservationPrompt}
        >
            <h1 style={reservationPromptStyles.h1}>{title}</h1>
            <p style={reservationPromptStyles.p}>{message}</p>
        </div>
    );
}

export default ReservationPrompt;