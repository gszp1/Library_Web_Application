import React from "react";
import "./AdminPanelStyles.css";

function ErrorSection() {
    return (
        <div className="adminPanelSection">
            <h1 style={{color:'red', fontWeight:'bold', height:100}}>
                Something went wrong with your login session. Try to log in again.
            </h1>
        </div>
    );
}

export default ErrorSection;