import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom"
import "./ResourcesPageStyles.css";
import axios from "axios";
import bookPlaceholder from "../../assets/image/bookPlaceholder.jpg";
import ReservationPrompt from "../../component/ReservationPrompt";
import { jwtDecode } from "jwt-decode";

function ResourcePage(){
    const location = useLocation();
    const {resource} = location.state;
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imgSrc, setImgSrc] = useState(resource.imageUrl || bookPlaceholder);
    const [instances, setInstances] = useState([]);
    const [instanceError, setInstanceError] = useState(null);
    const [instanceLoading, setInstanceLoading] = useState(true);

    useEffect( () => {
        const fetchDescription = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/resources/${resource.id}/description`);
                setDescription(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchDescription();
    }, [resource.id, ]);

    useEffect( ()=> {
        const fetchInstances = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/resources/${resource.id}/instances`);
                setInstances(response.data);
                setInstanceLoading(false);
            } catch (error) {
                setInstanceError(error);
                setInstanceLoading(false);
            }
        }
        fetchInstances();
    }, [resource.id]);

    const handleImgError = () => {
        setImgSrc(bookPlaceholder);
    }

    const reserveInstance = async (instanceId) => {
        const requestBody = {
            userEmail,
            instanceId
        };
        const url = 'http://localhost:9090/api/reservations/create';

        // TODO: verify if user has token


        let decodedToken = jwtDecode(localStorage.getItem('WebLibToken'));
        

        try {
            let result = await axios.post(url, requestBody, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
        }
    }

    console.log(instances);

    let authorsFullNames = resource.authors.map(author => `${author.firstName} ${author.lastName}`);
    let authorsFullNamesJoined = authorsFullNames.join(', ');
    let counter = 0;

    return (
        <>
        <div className = "resourcePageContent">
            <div className = "resourceData">
                <div className="imageContainer">
                    <img
                        className="resourcePageImage"
                        src={imgSrc}
                        onError={handleImgError}
                        />
                </div>
                <ul className="resourceInformation">
                    <li>
                        <h2>Title</h2>
                        <p> {`${resource.title}`} </p>
                    </li>
                    <li>
                        <h2>Authors</h2>
                        <p> {`${authorsFullNamesJoined}`} </p>
                    </li>
                    <li>
                        <h2>Publisher</h2>
                        <p> {`${resource.publisher}`} </p>
                    </li>
                    <li>
                        <h2>Identifier</h2>
                        <p> {`${resource.identifier}`} </p>
                    </li>
                </ul>
            </div>
            <div className="descriptionreservationContainer">
                <div className="descriptionContainer">
                    <h1>{'Description'}</h1>
                    {loading ? (
                        <p>Loading description...</p>
                    ) : error ? (
                        <p>Failed to load description.</p>
                    ) : (
                        <p>{description.description}</p>
                    )}
                </div>
            </div>
            <div className="availableInstances">
                <h1>{'Available Copies'}</h1>
                {loading ? (
                    <p>Loading copies...</p>
                ) : instanceError ? (
                    <p>Failed to load instances.</p>
                ) : instances.length === 0 ? (
                    <p>No copies available for this resource.</p>
                ) : (
                    <table className="instancesTable">
                        <thead>
                            <tr>
                                <th>Nr.</th>
                                <th>Identifier</th>
                                <th>Status</th>
                                <th>Reserve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instances.map((instance, index) => (
                                <tr key={instance.id}>
                                    <td>{++counter}</td>
                                    <td>{instance.id}</td>
                                    <td>
                                        {instance.isReserved ? (
                                            <div style={{color:'red'}}>reserved</div>
                                        ) : (
                                            <div style={{color:'green'}}>available</div>
                                        )}
                                    </td>
                                    <td>
                                        {instance.isReserved ? (
                                            <button
                                                className='instanceDisabledButton'
                                                onClick={reserveInstance(instance.id)}
                                            >
                                                reserve
                                            </button>
                                        ) : (
                                            <button className='instanceEnabledButton'>reserve</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        </>
    );
}

export default ResourcePage;