import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ModifyInformationSection({credentials, setCredentials, setSection}) {
    const [selectedImage, setSelectedImage] = useState(null);
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
        },
        imageResult: {
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
            },
            imageResult: {
                message: '',
                color: ''
            }
        };

        if (!validatePhoneNumber(newCredentials.phoneNumber) && newCredentials.phoneNumber !== '') {
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
            const sentCredentials = {...newCredentials,
                name: newCredentials.name.trim() === '' ? null : newCredentials.name.trim(),
                surname: newCredentials.surname.trim() === '' ? null : newCredentials.surname.trim(),
                phoneNumber: newCredentials.phoneNumber.trim() === '' ? null : newCredentials.phoneNumber.trim()
            }
            let response = await axios.put(url, sentCredentials, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            newPrompts.result.message="Credentials successfully updated.";
            newPrompts.result.color='green';
            setCredentials(sentCredentials);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const maxSizeInBytes = 2 * 1024 * 1024;

        if (file && file.size > maxSizeInBytes) {
            setPrompts(prev => ({
                ...prev,
                imageResult: { message: "File size exceeds the 2MB limit.", color: 'red' }
            }));
            return;
        }
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleImageSubmit = async(e) => {
        e.preventDefault();

        if (!selectedImage) {
            setPrompts(prev => ({
                ...prev,
                imageResult: {message: "Please select an image before submitting."}
            }));
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            await axios.put(`http://localhost:9090/api/images/user/${credentials.email}/image`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPrompts(prev => ({
                ...prev,
                imageResult: { message: "Image updated successful.", color: 'green' }
            }));
        } catch (error) {
            setPrompts(prev => ({
                ...prev,
                imageResult: { message: "Failed to update image.", color: 'red' }
            }));
        }
    };

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
            <h1>Modify Image</h1>
            <form
                className="userImageUpdateForm"
                onSubmit={handleImageSubmit}
            >
                <label>Upload Image</label>
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {selectedImage && (
                    <div>
                        <img alt="Selected" style={{width:320, height: 320}} src={URL.createObjectURL(selectedImage)} />
                    </div>
                )}
                <button type="submit">
                    Submit
                </button>
                <p style={{color: prompts.imageResult.color}}>
                    {prompts.imageResult.message}
                </p>
            </form>
        </div>
    );
}

export default ModifyInformationSection;
