import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar">
            <a href = "/" className="siteTitle"> LibraryApp</a>
            <ul>
                <li>
                    <a href="../page/resources/Resources">Resources</a>
                    <a href="../page/useraccount/UserAccount">Account</a>
                    <a href="../page/contact/Contact">Contact</a>
                </li>
            </ul>
        </nav>
    )
}