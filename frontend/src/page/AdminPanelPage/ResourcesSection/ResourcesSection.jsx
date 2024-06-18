import React, {useState, useEffect} from "react";
import '../AdminPanelStyles.css';
import './ResourcesSectionStyles.css';
import ReservationPrompt from "../../../component/ReservationPrompt";


function ResourcesSection() {
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const [error, setError] = useState();
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    });

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

    const fetchResources = async() => {
        const url = 'http://localhost:9090/api/resources/all'
    };

    return (
        <>
            <div className='adminPanelSection'>
                <h1>Resources</h1>
                <h1>Update Resource</h1>
                    {selectedResource == null ? (
                            <p>No resource selected.</p>
                        ) : (
                            <div/>
                        )
                    }
                    <h1>Instances</h1>
                    
            </div>
            {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default ResourcesSection;