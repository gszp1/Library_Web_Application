import React from "react";
import './ResourcesSectionStyles.css';

function ResourcesList({resources}) {
    let counter = 1;
    return (
        <table>
            <thead>
                <th>Nr</th>
                <th>ID</th>
                <th>Title</th>
                <th>Identifier</th>
                <th>Publisher</th>
            </thead>
            <tbody>

            </tbody>
        </table>
    );
};

export default ResourcesList;