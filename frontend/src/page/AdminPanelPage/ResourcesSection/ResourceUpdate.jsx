import React, {useEffect, useState} from "react";
import './ResourcesSectionStyles.css';
import axios from "axios";

function ResourceUpdate({resource, fetchDescription}) {
    const [updatedResource, setUpdatedResource] = useState({
        id: resource.id || 0,
        title: resource.title || '',
        identifier: resource.identifier || '',
        imageUrl: resource.imageUrl || '',
        publisher: resource.publisher || '',
        authors: resource.authors || [],
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedResource((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchDescription(updatedResource, setUpdatedResource);
    }, [])


    return (
        <form className="resourceUpdateForm">
            <label>ID</label>
            <input
                type='text'
                name='id'
                value={updatedResource.id}
                onChange={handleChange}
                readOnly
            />
            <label>Title</label>
            <input
                type='text'
                name='title'
                value={updatedResource.title}
                onChange={handleChange}
            />
            <label>Identifier</label>
            <input
                type='text'
                name='identifier'
                value={updatedResource.identifier}
                onChange={handleChange}
            />
            <label>Image URL</label>
            <input
                type='text'
                name='imageUrl'
                value={updatedResource.imageUrl}
                onChange={handleChange}
            />
            <label>Publisher</label>
            <input
                type='text'
                name='publisher'
                value={updatedResource.publisher}
                onChange={handleChange}
            />
            <label>Description</label>
            <textarea
                type='text'
                name='description'
                value={updatedResource.description}
                onChange={handleChange}
            />
            <label>Authors</label>
        </form>
    );
};

export default ResourceUpdate;