import React, { useState } from "react";
import "./RegistrationPageStyles.css";

function RegistrationPage() {
    const [credentials, setCredentials] = useState({
        email: '',
        emailConfirmation: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        surname: '',
        phone: ''
    });

    const [prompts, setPrompts] = useState ({
        email: '',
        emailConfirmation: '',
        password: '',
        passwordConfirmation: '',
        phone: ''
    })

    return (
        <form className="registrationForm">
            <h1>Register</h1>
            <div className="inputs">
                <div className="requiredInputs">
                    <h2>Required Fields</h2>
                    <label>E-Mail</label>
                    <input></input>
                    <p id="emailPrompt"></p>
                    <label>Confirm E-Mail</label>
                    <input></input>
                    <p id="emailConfirmPrompt"></p>
                    <label>Password</label>
                    <input></input>
                    <p id="passwordPrompt"></p>
                    <label>Confirm Password</label>
                    <input></input>
                    <p id="passwordConfirmPrompt"></p>
                </div>
                <div className="optionalInputs">
                    <h2>Optional Fields</h2>
                    <label>Name</label>
                    <input></input>
                    <label>Surname</label>
                    <input></input>
                    <label>Phone Number</label>
                    <input></input>
                    <p id="phonePrompt"></p>
                </div>
            </div>
            <button>Create account</button>
        </form>
    );
}

export default RegistrationPage;