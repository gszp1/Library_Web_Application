import React, {useState, useEffect} from "react";
import '../AdminPanelStyles.css';
import axios from "axios";
import './PublishersSectionStyles.css';
import PublishersList from "./PublishersList";
import ReservationPrompt from "../../../component/ReservationPrompt";

function PublishersSection({setSection}) {
    const [publishers, setPublishers] = useState([]);
    const [error, setError] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    });
    
    const fetchPublishers = async() => {
        const url = 'http://localhost:9090/api/publishers/all';

        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            });
            setPublishers(response.data);
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
        fetchPublishers();
    }, [])

    const updatePublisher = async(updatedPublisher) => {
        if (updatedPublisher.name === '' ||
            updatedPublisher.address === ''
        )  {
            displayPrompt(true, 'All fields are required.')
            return;
        };

        const url = 'http://localhost:9090/api/publishers/update';
        try {
            let response = await axios.put(url, updatedPublisher, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            displayPrompt(false, response.data)
            fetchPublishers();
        } catch (error) {
            if (error.response) {
                let message = '';
                if (error.response.status === 403) {
                    setSection('Error');
                    return;
                } else if (error.response.status === 404) {
                    message = 'Publisher not found.';
                } else {
                    message = error.response.data;
                }
                displayPrompt(true, message);
            } else {
                displayPrompt(true, 'Failed to update publisher.');
            }
        }
    }

    return (
        <div className='adminPanelSection'>
            <>
                <h1>Publishers</h1>
                {error ? (
                    <p>Error occurred during fetching publishers. Refresh page.</p>
                ) : (
                    <PublishersList publishers={publishers} updatePublisher={updatePublisher}/>
                )}
                {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
            </>
        </div>
    );
}

export default PublishersSection;
