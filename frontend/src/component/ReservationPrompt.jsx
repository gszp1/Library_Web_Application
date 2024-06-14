import React from "react";

function ReservationPrompt({error, message}) {
    const textColor = error ? 'red' : 'green';
    const title = error ? 'Failure' : 'Success';

    return (
        <div className='reservationPrompt' style={{color:textColor}}>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    );
}

export default ReservationPrompt;