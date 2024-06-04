import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar">
            <a href = "/" className="siteTitle"> LibraryApp</a>
            <ul>
                <li>
                    <a href="../page/Resources">Resources</a>
                    <a href="../page/UserAccount">Account</a>
                </li>
            </ul>
        </nav>
    )
}