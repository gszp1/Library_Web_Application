import React from "react";

function ModifyInformationSection() {
    return (
        <div className="accountPageSection">
            <h1>Modify Information</h1>
            <form className='credentialUpdateForm'>
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                 />
                <label>Surname</label>
                <input
                    name="surname"
                    type="text"
                />
                <label>Phone Number</label>
                <input
                    name="phoneNumber"
                    type="tel"
                />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default ModifyInformationSection;
