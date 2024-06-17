import React from "react";
import "../AdminPanelStyles.css";
import UsersListEntry from "./UsersListEntry";
import axios from "axios";

function UsersList({users, fetchUsersByKeyword, setSection}) {

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
            fetchUsersByKeyword();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSection('Error');
            }
        }
    };

    return (
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
    );
}

export default UsersList;