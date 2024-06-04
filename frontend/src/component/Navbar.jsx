import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar">
            <a href = "/" className="siteTitle"> LibraryApp</a>
            <ul>
                <li>
                    <a href="/Resources">Resources</a>
                </li>
                <li>
                    <a href="/UserAccount">Account</a>
                </li>
                <li>
                    <a href="/Contact">Contact</a>
                </li>
            </ul>
        </nav>
    )
}