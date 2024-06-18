import React, {useState} from "react";
import '../AdminPanelStyles.css';
import './AuthorsSectionStyles.css';
import ReservationPrompt from "../../../component/ReservationPrompt";

function AddAuthorSection({setSection}) {
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [showPrompt, setShowPrompt] = useState(false)
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
        <div className='adminPanelSection'>
            <h1>Add Author</h1>
            <form className="addAuthorForm" onSubmit={handleSubmit}>
                <label> Name </label>
                <input
                    type="text"
                    name="firstName"
                    value={author.firstName}
                    onChange={handleChange}
                />
                <label> Surname</label>
                <input
                    type="text"
                    name="lastName"
                    value={author.lastName}
                    onChange={handleChange}
                />
                <label> E-Mail </label>
                <input
                    type="text"
                    name="email"
                    value={author.email}
                    onChange={handleChange}
                />
                <button> Submit </button>
            </form>
        </div>
        {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default AddAuthorSection;