import React, { useState } from "react";
import './AccountPageStyles.css';

function AccountPage() {
    const [selectedSection, setSelectedSection] = useState("Information")

    return (
        <div className="pageContent">
            <ul className="accountNavigation">
                <li>
                    <p>Information</p>
                </li>
                <li>
                    <p>Reservations</p>
                </li>
            </ul>
        </div>
    );
}

export default AccountPage;