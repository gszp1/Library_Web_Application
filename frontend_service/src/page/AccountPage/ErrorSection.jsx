import React from "react";

function ErrorSection() {
    return(
        <div className='accountPageSection'>
            <h1 style={{color:'red', fontWeight:'bold', height:100}}>
                Something went wrong with your login session. Try logging in again.
            </h1>
        </div>
    );
}

export default ErrorSection;