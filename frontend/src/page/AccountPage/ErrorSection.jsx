import React from "react";

function ErrorSection({message}) {
    return(
        <div className='accountPageSection'>
            <h1 style={{color:'red', fontWeight:'bold'}}>
                {message}
            </h1>
        </div>
    );
}

export default ErrorSection;