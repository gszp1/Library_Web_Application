import React, {useState, useEffect} from "react";
import '../AdminPanelStyles.css';
import axios from "axios";
import './AuthorsSectionStyles.css';
import AuthorsList from "./AuthorsList";
import ReservationPrompt from "../../../component/ReservationPrompt";

function AuthorsSection({setSection}) {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    });

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const fetchAuthors = async() => {
        const url = 'http://localhost:9090/api/authors/all';

        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setAuthors(response.data);
            setError(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
            setError(true);
        }
    }

    const hidePromptAfterDelay = () => {
        setTimeout(() => {
            setShowPrompt(false);
        }, 1500);
    };

    const displayPrompt = (errorOccurred, resultMessage) => {
        setPromptContent({
            error:errorOccurred,
            message: resultMessage
        })
        setShowPrompt(true);
        hidePromptAfterDelay();
    }

    useEffect(() => {
        fetchAuthors();
    }, [])

    const updateAuthor = async(updatedAuthor) => {
        if (updatedAuthor.firstName === '' ||
            updatedAuthor.lastName === '' ||
            updatedAuthor.email === ''
        )  {
            displayPrompt(true, 'All fields are required.')
            return;
        };

        if (!validateEmail(updatedAuthor.email)) {
            displayPrompt(true, 'Email is invalid.')
            return;
        };

        const url = 'http://localhost:9090/api/authors/update';
        try {
            let response = await axios.put(url, updatedAuthor, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            displayPrompt(false, response.data)
            fetchAuthors();
        } catch (error) {
            if (error.response) {
                let message = '';
                if (error.response.status === 403) {
                    setSection('Error');
                    return;
                } else if (error.response.status === 404) {
                    message = 'Author not found.';
                } else {
                    message = error.response.data;
                }
                displayPrompt(true, message);
            } else {
                displayPrompt(true, 'Failed to update author.');
            }
        }
    }

    return (
        <div className='adminPanelSection'>
            <>
                <h1>Authors</h1>
                {error ? (
                    <p>Error occurred during fetching authors. Refresh page.</p>
                ) : (
                    <AuthorsList authors={authors} updateAuthor={updateAuthor}/>
                )}
                {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
            </>
        </div>
    );
}

export default AuthorsSection;
