import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom"
import "./ResourcesPageStyles.css";
import axios from "axios";
import bookPlaceholder from "../../assets/image/bookPlaceholder.jpg";

function ResourcePage(){
    const location = useLocation();
    const {resource} = location.state;
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [resource.id]);

    let authorsFullNames = resource.authors.map(author => `${author.firstName} ${author.lastName}`);
    let authorsFullNamesJoined = authorsFullNames.join(', ');

    console.log(description);

    return (
        <div className = "resourcePageContent">
            <div className = "resourceData">
                <div className="imageContainer">
                    <img className="resourcePageImage" src={resource.imageUrl || bookPlaceholder}/>
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
                <div className="buttonContainer">
                    <button className="reservationButton">
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResourcePage;