import React, { useEffect, useState } from "react";
import './ResourcesPageStyles.css';
import Resource from "./Resource";

import axios from "axios";

function ResourcesPage() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/resources/all');
                setResources(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        
        fetchResources();
    }, []);

    if (loading) {
        return <div> Loading library resources...</div>;
    }

    if (error) {
        return <div> Failed to load library resources.</div>;
    }

    console.log(resources.length);
    if (resources.length === 0) {
        return <div> No library resources available.</div>;
    }

    
    return (
        <div className="pageContent">
            <Resource image="" title="book" authors={["philip", "jan"]} />
        </div>
    );
}

export default ResourcesPage;