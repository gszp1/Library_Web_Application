import React, { forwardRef,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginWindow = forwardRef(({ closeLoginWindow }, ref) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [prompts, setPrompts] = useState ({
        login: {
            message: '',
            color: ''
        }
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateCredentials = () => {
        return validateEmail(credentials.email) && validatePassword(credentials.password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const outputPrompts = {
            login: {
                message: '',
                color: ''
            }
        }
        if (!validateCredentials()) {
            outputPrompts.login.message='Provided credentials are invalid!';
            outputPrompts.login.color='red';
            setPrompts(outputPrompts);
            return;
        }

        const url = 'http://localhost:9090/api/auth/authenticate'

        try {
            let response = await axios.post(url, credentials, {
                headers: {'Content-Type': 'application/json'}
            })
            console.log(response.data);
            prompts.login.message="Login successful!";
            prompts.login.color="green";
            localStorage.setItem("WebLibToken", response.data);
        } catch (error) {
            prompts.login.message="Provided credentials are invalid.";
            prompts.login.color='red';
        }

        setPrompts(outputPrompts);
    }


    return (
        <div className="loginWindow" ref={ref}>
            <form className="credentialsForm" onSubmit={handleSubmit} noValidate>
                <label>E-Mail</label>
                <input
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <p style={{color: prompts.login.color}}>
                    {prompts.login.message}
                </p>
                <button>
                    Submit
                </button>
            </form>
            <Link to={'/register'} className="registerButton" onClick={closeLoginWindow}>
                Register
            </Link>
        </div>
    );
});

export default LoginWindow;