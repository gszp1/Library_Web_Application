import React, { useEffect, useState } from "react";
import "./ResourcesPageStyles.css";
import axios from "axios";
import bookPlaceholder from "../../assets/image/bookPlaceholder.jpg";

function ResourcePage({resource}){
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
    }, []);

    let authorsFullNames = resource.authors.map(author => `${author.firstName} ${author.lastName}`);
    let authorsFullNamesJoined = authorsFullNames.join(', ');

    console.log(description);

    return (
        <div>
            <div>
                <img src={resource.imageUrl || bookPlaceholder}/>
                <ul>
                    <li>
                        {`Title: ${resource.title}`}
                    </li>
                    <li>
                        {`Authors: ${authorsFullNamesJoined}`}
                    </li>
                    <li>
                        {`Publisher: ${resource.publisher}`}
                    </li>
                    <li>
                        {`Identifier: ${resource.identifier}`}
                    </li>
                </ul>
            </div>
            {loading ? (
                <p>Loading description...</p>
            ) : error ? (
                <p>Failed to load description.</p>
            ) : (
                <p>{description.description}</p>
            )}
            <button>
                Reserve
            </button>
        </div>
    );
}

export default ResourcePage;