import React, {useEffect, useState} from "react";
import './ResourcesSectionStyles.css';
import axios from "axios";
import placeholder from '../../../assets/image/bookPlaceholder.jpg';

function ResourceUpdate({resource, fetchDescription}) {
    const [updatedResource, setUpdatedResource] = useState({
        id: resource.id || 0,
        title: resource.title || '',
        identifier: resource.identifier || '',
        imageUrl: resource.imageUrl || '',
        publisher: resource.publisher || '',
        authors: resource.authors || [''],
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

    const handleAuthorChange = (index, e) => {
        const { value } = e.target;
        const newAuthors = updatedResource.authors.map((author, i) => {
            if (i === index) {
                return value;
            }
            return author;
        });
        setUpdatedResource({ ...updatedResource, authors: newAuthors });
    };

    const addAuthor = () => {
        setUpdatedResource((prevResource) => ({
            ...prevResource,
            authors: [...prevResource.authors, '']
        }));
    };

    const removeAuthor = (index) => {
        setUpdatedResource((prevResource) => ({
            ...prevResource,
            authors: prevResource.authors.filter((_, i) => i !== index)
        }));
    };

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
            {updatedResource.authors.map((email, index) => (
                <div key={index} className="authorFields">
                    <label>Author {index + 1}:</label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleAuthorChange(index, e)}
                    />
                    <button type="button" onClick={() => removeAuthor(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={addAuthor}>
                Add Author
            </button>
        </form>
    );
};

export default ResourceUpdate;