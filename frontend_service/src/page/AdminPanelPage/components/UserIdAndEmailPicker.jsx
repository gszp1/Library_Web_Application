import React from "react";
import '../AdminPanelStyles.css'

function UserIdAndEmailPicker({userId, setUserId, userEmail, setUserEmail}) {

    const handleIdChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) === false) {
            return;
        }
        setUserId(value);
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    return (
        <div className="userIdAndEmailPicker">
            <label>ID</label>
            <input
                name='userId'
                type='text'
                value={userId}
                className='idInput'
                onChange={handleIdChange}
            />
            <label>Email</label>
            <input
                name="userEmail"
                type="text"
                value={userEmail}
                className="emailInput"
                onChange={handleEmailChange}
            />
        </div>
    );
}

export default UserIdAndEmailPicker;