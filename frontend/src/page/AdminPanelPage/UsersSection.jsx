import React, {useState, useEffect} from "react";
import UserIdAndEmailPicker from "./components/UserIdAndEmailPicker";
import UsersList from "./components/UsersList";
import axios from "axios";
import useDebounce from "../../customHooks/useDebounce";

function UsersSection({setSection}) {
    const [emailKeyword, setEmailKeyword] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [fetchingError, setFetchingError] = useState(false);

    const debouncedEmailKeyword = useDebounce(emailKeyword, 500);
    const debouncedId = useDebounce(userId, 500);

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
            if (error.response && error.response.status == 403) {
                setSection("Error");
            }
            setFetchingError(true);
        }
    };

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
            }
        } catch (error) {
            if (error.response && error.response.status == 403) {
                setSection("Error");
            }
            setFetchingError(true);
        }
    };

    useEffect(() => {
        fetchUsersByKeyword();
    }, [debouncedEmailKeyword])

    useEffect(() => {
        if (debouncedId) {
            fetchUserWithId();
        } else {
            fetchUsersByKeyword();
        }
    }, [debouncedId])

    return (
        <div className='adminPanelSection'>
            <h1>Users</h1>
            {fetchingError ? (
                <p>Error occurred while fetching users</p>
            ) : (
                <>
                    <UserIdAndEmailPicker
                        userId={userId}
                        userEmail={emailKeyword}
                        setUserId={setUserId}
                        setUserEmail={setEmailKeyword}
                    />
                    <UsersList
                        users={users}
                        fetchUsersByKeyword={fetchUsersByKeyword}
                        setSection={setSection}
                    />
                </>
            )}
        </div>
    );
}

export default UsersSection;