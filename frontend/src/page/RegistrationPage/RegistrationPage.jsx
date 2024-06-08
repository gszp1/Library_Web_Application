import React, { useState } from "react";
import "./RegistrationPageStyles.css";

function RegistrationPage() {
    const [credentials, setCredentials] = useState(null);

    return (
        <form className="registrationForm">
            <h1>Register</h1>
            <div className="inputs">
                <div className="requiredInputs">
                    <h2>Required Fields</h2>
                    <label>E-Mail</label>
                    <input></input>
                    <label>Confirm E-Mail</label>
                    <input></input>
                    <label>Password</label>
                    <input></input>
                    <label>Confirm Password</label>
                    <input></input>
                </div>
                <div className="optionalInputs">
                    <h2>Optional Fields</h2>
                    <label>Name</label>
                    <input></input>
                    <label>Surname</label>
                    <input></input>
                    <label>Phone Number</label>
                    <input></input>
                </div>
            </div>
            <button>Create account</button>
        </form>
    );
}

export default RegistrationPage;