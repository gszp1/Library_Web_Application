import React, {useState, useEffect} from "react";
import './AccountPageStyles.css';
import defaultUserImage from '../../assets/image/defaultUserImage.webp';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function InformationSection({userCredentials, setUserCredentials, setSection}) {
    const [imgSrc, setImgSrc] = useState(userCredentials.imageUrl || defaultUserImage);

    useEffect(() => {
        const fetchCredentials = async () => {
            let decodedToken = '';
            let email = '';
            try {
                decodedToken = jwtDecode(localStorage.getItem('WebLibToken'));
                email = decodedToken.sub;
            } catch (error) {
                console.log("failed to parse token");
            }
            let url = `http://localhost:9090/api/users/${email}/credentials`;
            try {
                let response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('WebLibToken')}`
                    }
                });
                let fetchedData = {
                    name: response.data.name,
                    surname: response.data.surname,
                    phoneNumber: response.data.phoneNumber,
                    joinDate: response.data.joinDate,
                    email: response.data.email,
                    imageUrl: response.data.imageUrl
                }
                console.log(fetchedData);
                setUserCredentials(fetchedData);
            } catch (error) {
                setSection("Error");
            }
        }
        fetchCredentials();
    }, [])

    useEffect(() => {
        setImgSrc(userCredentials.imageUrl || defaultUserImage);
    }, [userCredentials.imageUrl]);

    const handleImageError = () => {
        setImgSrc(defaultUserImage);
    }

    return (
        <div className='accountPageSection'>
            <h1> Account Information </h1>
            <div className="informationSectionContent">
                <div className="informationSectionUserImageContainer">
                    <h2 style={{color:"orange"}}>User Image</h2>
                    <img
                        className="informationSectionImage"
                        src={imgSrc}
                        onError={handleImageError}
                    />
                </div>
                <ul className="informationSectionCredentials">
                    <li>
                        <h2>Email</h2>
                        <p>{userCredentials.email}</p>
                    </li>
                    <li>
                        <h2>Name</h2>
                        {userCredentials.name === null ? (
                                <p style={{color: 'gray'}}>Not provided</p>
                            ) : (
                                <p>{userCredentials.name}</p>
                            )
                        }
                    </li>
                    <li>
                        <h2>Surname</h2>
                        {userCredentials.surname === null ? (
                                <p style={{color: 'gray'}}>Not provided</p>
                            ) : (
                                <p>{userCredentials.surname}</p>
                            )
                        }
                    </li>
                    <li>
                        <h2>Phone Number</h2>
                        {userCredentials.phoneNumber === null ? (
                                <p style={{color: 'gray'}}>Not provided</p>
                            ) : (
                                <p>{userCredentials.phoneNumber}</p>
                            )
                        }
                    </li>
                    <li>
                        <h2>Join Date</h2>
                        <p>{userCredentials.joinDate}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default InformationSection;