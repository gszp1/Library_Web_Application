import React, {useState} from "react";
import '../AdminPanelStyles.css';
import './PublishersSection.css';
import axios from "axios";
import ReservationPrompt from "../../../component/ReservationPrompt";

function AddPublisherSection({setSection}) {
    const [publisher, setPublisher] = useState({
        name: '',
        address: ''
    });
    const [showPrompt, setShowPrompt] = useState(false)
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    })

    const createPublisher = async () => {
        const url = 'http://localhost:9090/api/publishers/create';

        try {
            let response = await axios.post(url, publisher, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            setPromptContent({
                error:false,
                message: response.data
            });
            setShowPrompt(true);
            hidePromptAfterDelay();
            setPublisher({
                name: '',
                address: ''
            });
        } catch(error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            } else {
                setPromptContent({
                    error:true,
                    message: error.response.data
                });
                setShowPrompt(true);
                hidePromptAfterDelay();
            };
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (publisher.name === '' || publisher.address === '') {
            setPromptContent({
                error:true,
                message:'Name and Address field must be filled.'
            });
            setShowPrompt(true);
            hidePromptAfterDelay();
            return;
        } {
            createPublisher();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublisher((prev) => ({
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
            <h1>Add Publisher</h1>
            <form className="addPublisherForm" onSubmit={handleSubmit}>
                <label> Name </label>
                <input
                    type="text"
                    name="name"
                    value={publisher.name}
                    onChange={handleChange}
                />
                <label> Address </label>
                <input
                    type="text"
                    name="address"
                    value={publisher.address}
                    onChange={handleChange}
                />
                <button> Submit </button>
            </form>
        </div>
        {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default AddPublisherSection;