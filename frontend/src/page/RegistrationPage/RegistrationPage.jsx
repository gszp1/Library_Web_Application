import React, { useState } from "react";
import "./RegistrationPageStyles.css";
import axios from "axios";

function RegistrationPage() {
    const [credentials, setCredentials] = useState({
        email: '',
        emailConfirmation: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        surname: '',
        phoneNumber: ''
    });

    const [prompts, setPrompts] = useState({
        email: {
            message: '',
            color: 'black'
        },
        emailConfirmation: {
            message: '',
            color: 'black'
        },
        password: {
            message: '',
            color: 'black'
        },
        passwordConfirmation: {
            message: '',
            color: 'black'
        },
        phone: {
            message: '',
            color: 'black'
        },
        registerResult: {
            message: '',
            color: 'black'
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber) && phoneNumber.length >= 9 && phoneNumber.length <= 12;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateCredentials = (validationPrompts) => {
        let isValid = true;

        if (credentials.email === '') {
            validationPrompts.email.message = 'Email is required!\n';
            validationPrompts.email.color = 'red';
            isValid = false;
        } else  if (!validateEmail(credentials.email)) {
            validationPrompts.email.message = 'Provided email is invalid!\n';
            validationPrompts.email.color = 'red';
            isValid = false;
        }

        if (credentials.email !== credentials.emailConfirmation) {
            validationPrompts.emailConfirmation.message = 'Emails do not match!\n';
            validationPrompts.emailConfirmation.color = 'red';
            isValid = false;
        }

        if (credentials.password === '') {
            validationPrompts.password.message = 'Password is required.\n';
            validationPrompts.password.color = 'red';
            isValid = false;
        } else if (!validatePassword(credentials.password)) {
            validationPrompts.password.message = 'Password must be at least 8 characters long, include at least one uppercase letter and one digit.\n';
            validationPrompts.password.color = 'red';
            isValid = false;
        }

        if (credentials.password !== credentials.passwordConfirmation) {
            validationPrompts.passwordConfirmation.message = 'Passwords do not match!\n';
            validationPrompts.passwordConfirmation.color = 'red';
            isValid = false;
        }

        if (credentials.phoneNumber && !validatePhoneNumber(credentials.phoneNumber)) {
            validationPrompts.phone.message = 'Provided phone number is invalid!\n';
            validationPrompts.phone.color = 'red';
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationPrompts = {
            email: {
                message: '',
                color: 'black'
            },
            emailConfirmation: {
                message: '',
                color: 'black'
            },
            password: {
                message: '',
                color: 'black'
            },
            passwordConfirmation: {
                message: '',
                color: 'black'
            },
            phone: {
                message: '',
                color: 'black'
            },
            registerResult: {
                message: '',
                color: 'black'
            }
        };

        if (!validateCredentials(validationPrompts)) {
            validationPrompts.registerResult.message='Failed to register user due to invalid credentials!';
            validationPrompts.registerResult.color='red';
            setPrompts(validationPrompts);
            return;
        }

        // Perform form submission logic here (e.g., send credentials to an API)
        console.log("Form submitted", credentials);
        const userCredentials = {
            name: credentials.name,
            surname: credentials.surname,
            phoneNumber: credentials.phoneNumber,
            email: credentials.email,
            password: credentials.password
        }

        const url = 'http://localhost:9090/api/auth/register'
        try {
            const response = await axios.post(url, userCredentials, {
                headers: {'Content-Type': 'application/json'}
            });
            validationPrompts.registerResult.message = 'Account successfully created.';
            validationPrompts.registerResult.color = 'green';
        } catch (error) {
            validationPrompts.registerResult.message = 'Failed to create account!';
            validationPrompts.registerResult.color = 'red';
        } finally {
            setPrompts(validationPrompts);
        }
    };

    return (
        <form className="registrationForm" onSubmit={handleSubmit} noValidate>
            <h1>Register</h1>
            <div className="inputs">
                <div className="requiredInputs">
                    <h2>Required Fields</h2>
                    <label>E-Mail</label>
                    <input
                        name="email"
                        type="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <p id="emailPrompt" style={{ color: prompts.email.color }}>
                        {prompts.email.message}
                    </p>
                    <label>Confirm E-Mail</label>
                    <input
                        name="emailConfirmation"
                        type="email"
                        value={credentials.emailConfirmation}
                        onChange={handleChange}
                    />
                    <p id="emailConfirmPrompt" style={{ color: prompts.emailConfirmation.color }}>
                        {prompts.emailConfirmation.message}
                    </p>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <p id="passwordPrompt" style={{ color: prompts.password.color }}>
                        {prompts.password.message}
                    </p>
                    <label>Confirm Password</label>
                    <input
                        name="passwordConfirmation"
                        type="password"
                        value={credentials.passwordConfirmation}
                        onChange={handleChange}
                    />
                    <p id="passwordConfirmPrompt" style={{ color: prompts.passwordConfirmation.color }}>
                        {prompts.passwordConfirmation.message}
                    </p>
                </div>
                <div className="optionalInputs">
                    <h2>Optional Fields</h2>
                    <label>Name</label>
                    <input
                        name="name"
                        type="text"
                        value={credentials.name}
                        onChange={handleChange}
                    />
                    <label>Surname</label>
                    <input
                        name="surname"
                        type="text"
                        value={credentials.surname}
                        onChange={handleChange}
                    />
                    <label>Phone Number</label>
                    <input
                        name="phoneNumber"
                        type="tel"
                        value={credentials.phoneNumber}
                        onChange={handleChange}
                    />
                    <p id="phonePrompt" style={{ color: prompts.phone.color }}>
                        {prompts.phone.message}
                    </p>
                </div>
            </div>
            <button type="submit">
                Create account
            </button>
            <p style={{color: prompts.registerResult.color, fontWeight: "bold"}}>
                {prompts.registerResult.message}
            </p>
        </form>
    );
}

export default RegistrationPage;
