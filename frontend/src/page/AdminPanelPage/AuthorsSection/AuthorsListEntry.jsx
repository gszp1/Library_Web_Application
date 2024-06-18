import React, {useState} from "react";
import './AuthorsSectionStyles.css';

function AuthorsListEntry({author, updateAuthor}) {
    const [updatedAuthor, setUpdatedAuthor] = useState({
            authorId: author.authorId || 0,
            firstName: author.firstName || '',
            lastName: author.lastName || '',
            email: author.email || ''
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAuthor((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        updateAuthor(updatedAuthor);
    }

    return (
        <tr>
            <td>
                <input
                    type='text'
                    name='authorId'
                    value={updatedAuthor.authorId}
                    onChange={handleChange}
                    readOnly
                />
            </td>
            <td>
                <input
                    type='text'
                    name='email'
                    value={updatedAuthor.email}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='firstName'
                    value={updatedAuthor.firstName}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='lastName'
                    value={updatedAuthor.lastName}
                    onChange={handleChange}
                />
            </td>
            <td>
                <button onClick={handleSubmit}>Submit</button>
            </td>
        </tr>
    );
}

export default AuthorsListEntry;