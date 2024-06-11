import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ModifyInformationSection({credentials, setCredentials, setSection}) {
    const [newCredentials, setNewCredentials] = useState({...credentials,
        name: credentials.name || '',
        surname: credentials.surname || '',
        phoneNumber: credentials.phoneNumber || ''
    });

    const [prompts, setPrompts] = useState({
        result: {
            message: '',
            color: ''
        },
        phoneNumber: {
            message: '',
            color: ''
        }
    });

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber) && phoneNumber.length >= 9 && phoneNumber.length <= 12;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCredentials({
            ...newCredentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPrompts = {
            result: {
                message: '',
                color: ''
            },
            phoneNumber: {
                message: '',
                color: ''
            }
        };

        if (!validatePhoneNumber(newCredentials.phoneNumber)) {
            newPrompts.result.message="Failed to modify due to invalid credentials.";
            newPrompts.result.color='red';
            newPrompts.phoneNumber.message="Invalid phone number.";
            newPrompts.phoneNumber.color='red';
            setPrompts(newPrompts);
            return;
        }

        if ((credentials.name === newCredentials.name) &&
            (credentials.surname === newCredentials.surname) &&
            (credentials.phoneNumber === newCredentials.phoneNumber)
        ) {
            newPrompts.result.message="New credentials are equal to current ones.";
            newPrompts.result.color='red';
            setPrompts(newPrompts);
            return;
        }

        let url = `http://localhost:9090/api/users/update`;
        console.log(url);
        try {
            console.log(newCredentials);
            let response = await axios.put(url, newCredentials, {
                'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                'Content-Type': 'application/json'
            });
            newPrompts.result.message="Credentials successfully updated.";
            newPrompts.result.color='green';
            setCredentials(newCredentials);
            setPrompts(newPrompts);
        } catch (error) {
            if (error.response) {
                if(error.response.status === 400 || error.response.status === 403) {
                    setSection("Error");
                }
            } else if (error.request) {
                newPrompts.result.message="Network error. Try again.";
                newPrompts.result.color='red';
                setPrompts(newPrompts);
            } else {
                newPrompts.result.message="Something went wrong during request handling.";
                newPrompts.result.color='red';
                setPrompts(newPrompts);
            }
            return;
        }
    }

    return (
        <div className="accountPageSection">
            <h1>Modify Information</h1>
            <form
                className='credentialUpdateForm'
                onSubmit={handleSubmit}
                noValidate
            >
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    value={newCredentials.name}
                    onChange={handleChange}
                 />
                <label>Surname</label>
                <input
                    name="surname"
                    type="text"
                    value={newCredentials.surname}
                    onChange={handleChange}
                />
                <label>Phone Number</label>
                <input
                    name="phoneNumber"
                    type="tel"
                    value={newCredentials.phoneNumber}
                    onChange={handleChange}
                    style={{marginBottom: 0.5}}
                />
                <p style = {{color: prompts.phoneNumber.color}}>
                    {prompts.phoneNumber.message}
                </p>
                <button>
                    Submit
                </button>
                <p style={{color: prompts.result.color}}>
                    {prompts.result.message}
                </p>
            </form>
        </div>
    );
}

export default ModifyInformationSection;
