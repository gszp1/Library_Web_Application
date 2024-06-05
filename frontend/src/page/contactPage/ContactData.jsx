import React, { useEffect, useState } from "react";
import xml2js from 'xml2js';
import axios from 'axios';
import "./ContactPageStyles.css";

function ContactData() {
    const [contactData, setContactData] = useState({
        phone: '',
        email: '',
        address: {
            city: '',
            street: '',
            buildingNumber: ''
        }
    });

    return (
        <>
        
        </>
    );
}

export default ContactData;