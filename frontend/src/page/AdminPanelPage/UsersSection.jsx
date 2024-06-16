import React, {useState} from "react";
import UserIdAndEmailPicker from "./components/UserIdAndEmailPicker";

function UsersSection() {
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    return (
        <div className='adminPanelSection'>
            <h1>Users</h1>
            <UserIdAndEmailPicker
                userId={userId}
                userEmail={userEmail}
                setUserId={setUserId}
                setUserEmail={setUserEmail}
            />
        </div>
    );
}

export default UsersSection;