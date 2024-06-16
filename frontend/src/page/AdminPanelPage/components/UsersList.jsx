import React from "react";
import "../AdminPanelStyles.css";
import UsersListEntry from "./UsersListEntry";

function UsersList({users, setUsers}) {

    const saveUser = async (updatedUser) => {
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