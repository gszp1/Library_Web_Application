import React from "react";
import './PublishersSectionStyles.css';
import PublishersListEntry from "./PublishersListEntry.jsx";

function PublishersList({publishers, updatePublisher}) {
    return (
        <table className="publishersList">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                {publishers.map((publisher) => (
                    <PublishersListEntry
                        key={publisher.publisherId}
                        publisher={publisher}
                        updatePublisher={updatePublisher}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default PublishersList;