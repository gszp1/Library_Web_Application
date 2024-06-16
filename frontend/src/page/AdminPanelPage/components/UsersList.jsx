import React from "react";
import "../AdminPanelStyles.css";


function UsersList({users, setUsers}) {
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
                    <th>status</th>
                    <th>Disable</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    );
}

export default UsersList;