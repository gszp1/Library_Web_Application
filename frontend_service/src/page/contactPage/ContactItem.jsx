import React from "react";
import "./ContactPageStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ContactItem({name, fontAwesomeIconName, content}) {
    return (
        <div className="contactItem">
            <strong>
                <FontAwesomeIcon icon={fontAwesomeIconName} className="icon"/>
                {` ${name}:`}
            </strong>
            <span>{content}</span>
        </div>
    );
}

export default ContactItem;