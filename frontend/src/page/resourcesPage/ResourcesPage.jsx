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

    console.log(resources);

    return (
        <div className="pageContent">
          {loading ? (
            <div>Loading library resources...</div>
          ) : error ? (
            <div>Failed to load library resources.</div>
          ) : resources.length === 0 ? (
            <div>No library resources available.</div>
          ) : (
            resources.map((resource, index) => (
              <Resource
                key={index}
                image={resource.image}
                title={resource.title}
                authors={resource.authors}
              />
            ))
          )}
        </div>
      );
}

export default ResourcesPage;