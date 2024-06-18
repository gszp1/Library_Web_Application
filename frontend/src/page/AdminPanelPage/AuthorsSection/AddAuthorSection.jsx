import React, {useState} from "react";
import '../AdminPanelStyles.css';
import './AuthorsSectionStyles.css';

function AddAuthorSection({setSection}) {
    const [author, setAuthor] = useState({
        
    });
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='adminPanelSection'>
            <h1>Add Author</h1>
            <form className="addAuthorForm" onSubmit={handleSubmit}>
                <label> Name </label>
                <input/>
                <label> Surname</label>
                <input/>
                <label> E-Mail </label>
                <input/>
                <button> Submit </button>
            </form>
        </div>
    );
}

export default AddAuthorSection;