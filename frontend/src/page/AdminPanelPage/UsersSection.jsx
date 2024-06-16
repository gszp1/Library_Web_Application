import React, {useState} from "react";
import UserIdAndEmailPicker from "./components/UserIdAndEmailPicker";
import UsersList from "./components/UsersList";

function UsersSection() {
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);

    return (
        <div className='adminPanelSection'>
            <h1>Users</h1>
            <UserIdAndEmailPicker
                userId={userId}
                userEmail={userEmail}
                setUserId={setUserId}
                setUserEmail={setUserEmail}
            />
            <UsersList
                users={users}
                setUsers={setUsers}
            />
        </div>
    );
}

export default UsersSection;