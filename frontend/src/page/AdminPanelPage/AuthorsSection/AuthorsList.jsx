import React from "react";
import './AuthorsSectionStyles.css';
import AuthorsListEntry from "./AuthorsListEntry";

function AuthorsList({authors, updateAuthor}) {
    return (
        <table className="authorsList">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                {authors.map((author) => (
                    <AuthorsListEntry
                        key={author.authorId}
                        author={author}
                        updateAuthor={updateAuthor}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default AuthorsList;