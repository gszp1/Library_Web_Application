import React, {useState} from "react";
import "../AdminPanelStyles.css";
import UsersListEntry from "./UsersListEntry";
import axios from "axios";
import ReservationPrompt from "../../../component/ReservationPrompt";

function UsersList({users, fetchUsersByKeyword, setSection}) {
    const [showPrompt, setShowPrompt] = useState(false)
    const [promptContent, setPromptContent] = useState({
        error: false,
        message: ''
    });

    const hidePromptAfterDelay = () => {
        setTimeout(() => {
            setShowPrompt(false);
        }, 1500);
    };


    const saveUser = async (updatedUser) => {
        try {
            const url = `http://localhost:9090/api/users/admin/update`;
            console.log(updatedUser);
            const response = await axios.put(url, updatedUser, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            setPromptContent({
                error: false,
                message: 'Credentials updated.'
            });
            setShowPrompt(true);
            hidePromptAfterDelay();
            fetchUsersByKeyword();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            } else {
                setPromptContent({
                    error: true,
                    message: 'Failed to update user credentials.'
                });
                setShowPrompt(true);
                hidePromptAfterDelay();
            }
        }
    };

    return (
        <>
            <table className="usersList">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone</th>
                        <th>Joined</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UsersListEntry key={user.id} user={user} saveUser={saveUser}/>
                    ))}
                </tbody>
            </table>
            {showPrompt && <ReservationPrompt error={promptContent.error} message={promptContent.message}/>}
        </>
    );
}

export default UsersList;