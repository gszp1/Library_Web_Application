import React from "react";
import { faPhone, faMapMarkerAlt, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import "./ContactPageStyles.css";
import ContactItem from "./ContactItem";

function ContactData({phoneNumber="", address="", email="", days="", hours=""}) {
    return (
        <div className="contactData">
            <div className="contactHeader">Contact Information</div>
            <ContactItem name={"Phone Number"} fontAwesomeIconName={faPhone} content={phoneNumber} />
            <ContactItem name={"Address"} fontAwesomeIconName={faMapMarkerAlt} content={address} />
            <ContactItem name={"Email"} fontAwesomeIconName={faEnvelope} content={email} />
            <ContactItem name={"Open Hours"} fontAwesomeIconName={faClock} content={days + ":  " + hours} />
        </div>
    );
}

export default ContactData;