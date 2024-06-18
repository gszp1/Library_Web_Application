import React, {useState} from "react";
import '../AdminPanelStyles.css';
import './AuthorsSectionStyles.css';
import axios from "axios";
import ReservationPrompt from "../../../component/ReservationPrompt";

function AddAuthorSection({setSection}) {
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [showPrompt, setShowPrompt] = useState(false)
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    })

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const createAuthor = async () => {
        const url = 'http://localhost:9090/api/authors/create';
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (author.firstName === '' || author.lastName === '') {
            setPromptContent({
                error:true,
                message:'Name and Surname field must be filled.'
            });
            setShowPrompt(true);
            hidePromptAfterDelay();
            return;
        }

        if (!validateEmail(author.email)) {
            setPromptContent({
                error:true,
                message:'Invalid email.'
            });
            setShowPrompt(true);
            hidePromptAfterDelay();
            return;
        }

        setAuthor({
            firstName: '',
            lastName: '',
            email: ''
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const hidePromptAfterDelay = () => {
        setTimeout(() => {
            setShowPrompt(false);
        }, 1500);
    };

    return (
        <>
        <div className='adminPanelSection'>
            <h1>Add Author</h1>
            <form className="addAuthorForm" onSubmit={handleSubmit}>
                <label> Name </label>
                <input
                    type="text"
                    name="firstName"
                    value={author.firstName}
                    onChange={handleChange}
                />
                <label> Surname</label>
                <input
                    type="text"
                    name="lastName"
                    value={author.lastName}
                    onChange={handleChange}
                />
                <label> E-Mail </label>
                <input
                    type="text"
                    name="email"
                    value={author.email}
                    onChange={handleChange}
                />
                <button> Submit </button>
            </form>
        </div>
        {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default AddAuthorSection;