import React, {useState, useEffect} from "react";
import './AccountPageStyles.css';

function InformationSection() {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        imageUrl: ''
    });

    // useEffect (async () => {
    //     let url = ''
    // }, []);

    return (
        <div className='accountPageSection'>
            <h1> Account Information </h1>
        </div>
    );
}

export default InformationSection;