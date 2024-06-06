import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./ContactPageStyles.css";

function ContactData({phoneNumber="1", address="1", email="1"}) {
    return (
        <div className="contactData">
            <div className="contactHeader">Contact Information</div>
            <div className="contactItem">
                <strong>
                    <FontAwesomeIcon icon={faPhone} className="icon"/>
                    {" Phone Number:"}
                </strong>
                <span>{phoneNumber}</span>
            </div>
            <div className="contactItem">
                <strong>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/>
                    {" Address:"}
                </strong>
                <span>{address}</span>
            </div>
            <div className="contactItem">
                <strong>
                    <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                    {" Email:"}
                </strong>
                <span>{email}</span>
            </div>
        </div>
    );
}

export default ContactData;