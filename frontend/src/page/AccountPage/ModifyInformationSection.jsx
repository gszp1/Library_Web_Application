import React, {useState} from "react";

function ModifyInformationSection({credentials, setCredentials}) {
    const [newCredentials, setNewCredentials] = useState({...credentials})
    
    const [prompts, setPrompts] = useState({
        result: {
            message: '',
            color: ''
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCredentials({
            ...newCredentials,
            [name]: value
        });
    };

    return (
        <div className="accountPageSection">
            <h1>Modify Information</h1>
            <form
                className='credentialUpdateForm'
                onSubmit={handleSubmit}
            >
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    value={newCredentials.name}
                    onChange={handleChange}
                 />
                <label>Surname</label>
                <input
                    name="surname"
                    type="text"
                    value={newCredentials.surname}
                    onChange={handleChange}
                />
                <label>Phone Number</label>
                <input
                    name="phoneNumber"
                    type="tel"
                    value={newCredentials.phoneNumber}
                    onChange={handleChange}
                />
                <button>
                    Submit
                </button>
                <p style={{color: prompts.result.color}}>
                    {prompts.result.message}
                </p>
            </form>
        </div>
    );
}

export default ModifyInformationSection;
