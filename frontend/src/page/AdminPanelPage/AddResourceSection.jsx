import React, {useState} from "react";
import axios from "axios";
import './AdminPanelStyles.css';
import ReservationPrompt from "../../component/ReservationPrompt";

function AddResourceSection(setSection) {
    const [credentials, setCredentials] = useState({
        title: '',
        identifier: '',
        description: '',
        publisher: '',
        authors: ['']
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const createResource = async() => {
        const url = 'http://localhost:9090/api/resources/create';

        try {
            let response = await axios.post(url, credentials, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data);
            setCredentials({
                title: '',
                identifier: '',
                description: '',
                publisher: '',
                authors: ['']
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setSection('Error');
                    return;
                }
                if (error.response.status === 400) {
                    console.log(error.response.data);
                }
            } else {

            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createResource();
    }

    const handleAuthorChange = (index, e) => {
        const { value } = e.target;
        const newAuthors = credentials.authors.map((author, i) => {
            if (i === index) {
                return value;
            }
            return author;
        });
        setCredentials({ ...credentials, authors: newAuthors });
    };


    const addAuthor = () => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            authors: [...prevCredentials.authors, '']
        }));
    };

    const removeAuthor = (index) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            authors: prevCredentials.authors.filter((_, i) => i !== index)
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="adminPanelSection">
            <h1>Add Resource</h1>
            <form onSubmit={handleSubmit} className="resourceCreateForm">
                <label>Title: </label>
                <input
                    name="title"
                    value={credentials.title}
                    onChange={handleChange}
                />
                <label>Identifier: </label>
                <input
                    name="identifier"
                    value={credentials.identifier}
                    onChange={handleChange}
                />
                <label>Description: </label>
                <textarea
                    name="description"
                    value={credentials.description}
                    onChange={handleChange}
                />
                <label>Publisher: </label>
                <input
                    name="publisher"
                    value={credentials.publisher}
                    onChange={handleChange}
                />
                <h2 style={{color:'orange'}}>Authors:</h2>
                {credentials.authors.map((email, index) => (
                    <div key={index} className="authorFields">
                        <label>Author {index + 1}:</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => handleAuthorChange(index, e)}
                        />
                        <button type="button" onClick={() => removeAuthor(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" style={{width: '20%'}} onClick={addAuthor}>
                    Add Author
                </button>
                <label>Image: </label>
                <input
                    style={{marginBottom:'1rem', border:'none', backgroundColor:'transparent', boxShadow:'none', height:'2rem'}}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default AddResourceSection;