import React, {useState, useEffect} from "react";
import '../AdminPanelStyles.css';
import './ResourcesSectionStyles.css';
import ReservationPrompt from "../../../component/ReservationPrompt";
import axios from "axios";
import ResourcesList from "./ResourcesList";
import ResourceUpdate from "./ResourceUpdate";

function ResourcesSection({setSection}) {
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

    const selectEntry = (entry) => {
        setSelectedResource(entry);
    }

    const updateResource = async (updatedResource) => {

    }
    
    const updateImage  = async (newImage, resId) => {

    }

    const fetchResources = async() => {
        const url = 'http://localhost:9090/api/resources/admin/all';
        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            })
            console.log(response.data);
            setResources(response.data);
            setError(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
                return;
            }
            setError(true);
        }
    };

    const fetchDescription = async (updatedResource, setUpdatedResource) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/resources/${updatedResource.id}/description`);
            console.log(response.data);
            setUpdatedResource({...updatedResource, description: response.data.description || ''})
        } catch (error) {
            console.log(error);
            if (error.resource && error.resource.status === 403) {
                setSection('Error');
            } else {
                displayPrompt(true, "Failed to fetch description.");
            }
        }
    }

    useEffect(() => {
        fetchResources();
    }, []);

    return (
        <>
            <div className='adminPanelSection'>
                <h1>Resources</h1>
                    {error ? (
                        <p>Failed to fetch resources.</p>
                    ) : (
                        <ResourcesList resources={resources} selectEntry={selectEntry}/>
                    )}
                <h1>Update Resource</h1>
                    {selectedResource === null ? (
                            <p>No resource selected.</p>
                        ) : (
                            <ResourceUpdate resource={selectedResource} fetchDescription={fetchDescription}/>
                        )
                    }
                    <h1>Instances</h1>
                    {selectedResource === null ? (
                        <p>No resource selected.</p>
                    ) : (
                        <div/>
                    )}
            </div>
            {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default ResourcesSection;