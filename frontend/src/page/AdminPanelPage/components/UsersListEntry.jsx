import React, { useState } from "react";

function UsersListEntry({user, saveUser}) {
    const [editableUser, setEditableUser] = useState(user);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditableUser({
            ...editableUser,
            [name]: value
        });
    };

    const handleSave = () => {
        saveUser(editableUser);
    };

    return (
        <tr>
            <td><input type="text" name="id" value={editableUser.id} onChange={handleChange} readOnly /></td>
            <td><input type="text" name="email" value={editableUser.email} onChange={handleChange} /></td>
            <td><input type="text" name="name" value={editableUser.name} onChange={handleChange} /></td>
            <td><input type="text" name="surname" value={editableUser.surname} onChange={handleChange} /></td>
            <td><input type="tel" name="phone" value={editableUser.phoneNumber} onChange={handleChange} /></td>
            <td><input type="text" name="joined" value={editableUser.joinDate} onChange={handleChange} readOnly /></td>
            <td><input type="text" name="image" value={editableUser.imageUrl} onChange={handleChange} /></td>
            <td>
                <select name="status" value={editableUser.status} onChange={handleChange}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CLOSED">CLOSED</option>
                </select>
            </td>
            <td>
                <select name="role" value={editableUser.role} onChange={handleChange}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </td>
            <td><button onClick={handleSave}>Save</button></td>
        </tr>
    );
}

export default UsersListEntry;