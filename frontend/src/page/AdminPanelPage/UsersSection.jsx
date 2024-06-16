import React, {useState, useEffect} from "react";
import UserIdAndEmailPicker from "./components/UserIdAndEmailPicker";
import UsersList from "./components/UsersList";
import axios from "axios";

function UsersSection() {
    const [emailKeyword, setEmailKeyword] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [fetchingError, setFetchingError] = useState(false);

    useEffect(() => {
        const fetchUsersByKeyword = async () => {
            try {
                let url = `http://localhost:9090/api/users/all`;
                const params = {
                keyword: emailKeyword
                };
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                    },
                    params: params
                });
                setUsers(response.data);
                setFetchingError(false);
            } catch (error) {
                setFetchingError(true);
            }
        };

        fetchUsersByKeyword();
    }, [emailKeyword])

    useEffect(() => {
        const fetchUserWithId = async () => {
            try {
                let url = `http://localhost:9090/api/users/${userId}`;
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                    }
                });
                if (!response.data) {
                    setUsers([]);
                    setFetchingError(false);
                } else {
                    setUsers([response.data]);
                    setFetchingError(false);
                    setUserId('');
                }
            } catch (error) {
                setFetchingError(true);
            }
        };
        if (userId) {
            fetchUserWithId();
        }
    }, [userId])

    return (
        <div className='adminPanelSection'>
            <h1>Users</h1>
            {fetchingError && (<p>Error occurred while fetching users</p>)}
            <UserIdAndEmailPicker
                userId={userId}
                userEmail={emailKeyword}
                setUserId={setUserId}
                setUserEmail={setEmailKeyword}
            />
            <UsersList
                users={users}
                setUsers={setUsers}
            />
        </div>
    );
}

export default UsersSection;