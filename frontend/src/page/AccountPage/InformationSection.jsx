import React, {useState, useEffect} from "react";
import './AccountPageStyles.css';

function InformationSection({userCredentials}) {
    return (
        <div className='accountPageSection'>
            <h1> Account Information </h1>
            <div className="informationSectionContent">
                <div className="informationSectionUserImageContainer">

                </div>
                <ul className="informationSectionCredentials">
                    <li>
                        <h2>Email</h2>
                        <p>{userCredentials.email}</p>
                    </li>
                    <li>
                        <h2>Name</h2>
                        <p>{userCredentials.name}</p>
                    </li>
                    <li>
                        <h2>Surname</h2>
                        <p>{userCredentials.surname}</p>
                    </li>
                    <li>
                        <h2>Phone Number</h2>
                        <p>{userCredentials.phoneNumber}</p>
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