import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import "./ContactPageStyles.css";

function ContactData({phoneNumber="", address="", email="", days="", hours=""}) {
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
            <div className="contactItem">
                <strong>
                <FontAwesomeIcon icon={faClock} className="icon"/>
                {" Open Hours:"}
                </strong>
                <span>{days + ":  " + hours} </span>
            </div>
        </div>
    );
}

export default ContactData;