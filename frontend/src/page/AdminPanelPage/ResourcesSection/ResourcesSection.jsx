import React, {useState, useEffect} from "react";
import '../AdminPanelStyles.css';
import './ResourcesSectionStyles.css';
import ReservationPrompt from "../../../component/ReservationPrompt";
import axios from "axios";
import ResourcesList from "./ResourcesList";
import ResourceUpdate from "./ResourceUpdate";
import InstancesList from "./InstancesList";

function ResourcesSection({setSection}) {
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const [instances, setInstances] = useState([]);
    const [instancesError, setInstancesError] = useState(false);
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
        const url = 'http://localhost:9090/api/resources/update';
        try {
            let response = await axios.put(url, updatedResource, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            displayPrompt(false, 'Resource updated')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403){
                    setSection('Error');
                } else {
                    displayPrompt(true, error.response.data);
                }
            } else {
                displayPrompt(true, 'Failed to update resource');
            }
        }
    }

    const updateImage  = async (newImage, resId) => {
        const url = `http://localhost:9090/api/images/update/${resId}`;
        const formData = new FormData();
        formData.append("image", newImage);
        try {
            let response = await axios.put(url, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            displayPrompt(false, 'Image updated.');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403){
                    setSection('Error');
                } else {
                    displayPrompt(true, error.response.data);
                }
            } else {
                displayPrompt(true, 'Failed to update Image');
            }
        }
    }

    const fetchResources = async() => {
        const url = 'http://localhost:9090/api/resources/admin/all';
        try {
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            })
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
            if (error.resource && error.resource.status === 403) {
                setSection('Error');
            } else {
                displayPrompt(true, "Failed to fetch description.");
            }
        }
    }

    const fetchInstances = async () => {
        const url = `http://localhost:9090/api/instances/all/resource/${selectedResource.id}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                }
            })
            setInstances(response.data);
            setInstancesError(false);
        } catch (error) {
            if (error.resource && error.resource.status === 403) {
                setSection('Error');
            }
            setInstancesError(true)
        }
    }

    const updateInstance = async (updatedInstance) => {
        const url = 'http://localhost:9090/api/instances/update';
        try {
            let response = await axios.put(url, updatedInstance, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                'Content-Type': 'application/json'
            }
            });
            displayPrompt(false, "Update successful.");
            fetchInstances();
        } catch (error) {
            if (error.resource) {
                if (error.resource.status === 403) {
                    setSection('Error');
                } else {
                    displayPrompt(true, error.resource.data);
                }
            } else {
                displayPrompt(true, "Failed to fetch description.");
            }
        }
    }

    const withdrawInstance = async (id) => {
        const url = `http://localhost:9090/api/instances/${id}/withdraw`;
        try {
            let response = await axios.put(url, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                }
                });
                displayPrompt(false, "Resource withdrawn.");
                fetchInstances();
        } catch (error) {
            if (error.resource) {
                if (error.resource.status === 403) {
                    setSection('Error');
                } else {
                    displayPrompt(true, error.resource.data);
                }
            } else {
                displayPrompt(true, "Failed to fetch description.");
            }
        }
    }

    const createInstance = async() => {
        let url = `http://localhost:9090/api/instances/create/${selectedResource.id}`;
        try {
            let response = await axios.post(url, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                }
                });
                displayPrompt(false, "Instance created.");
                fetchInstances();
        } catch (error) {
            if (error.resource) {
                if (error.resource.status === 403) {
                    setSection('Error');
                } else {
                    displayPrompt(true, error.resource.data);
                }
            } else {
                displayPrompt(true, "Failed to create instance.");
            }
        }
    }

    useEffect(() => {
        fetchResources();
    }, []);

    useEffect(() => {
        if (selectedResource) {
            fetchInstances();
        }
    }, [selectedResource])

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
                            <ResourceUpdate
                                resource={selectedResource}
                                fetchDescription={fetchDescription}
                                updateResource={updateResource}
                                updateImage={updateImage}
                                fetchResources={fetchResources}
                            />
                        )
                    }
                    <h1>Instances</h1>
                    {selectedResource === null ? (
                        <p>No resource selected.</p>
                    ) : (
                        instancesError ? (<p>Failed to fetch instances</p>) : (
                            instances.length === 0 ? (
                                <p>Resource has no instances.</p>
                            ) : (
                                <InstancesList instances={instances} updateInstance={updateInstance} withdrawInstance={withdrawInstance}/>
                            )
                        )
                    )}
                    {selectedResource && (<button className="createInstanceButton" onClick={createInstance}>Create Instance</button>)}
            </div>
            {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default ResourcesSection;