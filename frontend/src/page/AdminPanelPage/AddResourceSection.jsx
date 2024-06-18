import React, {useState} from "react";

function AddResourceSection() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
    }

    const handleAuthorChange = (index, e) => {
        const { name, value } = e.target;
        const newAuthors = credentials.authors.map((author, i) => {
            if (i === index) {
                return { ...author, [name]: value };
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