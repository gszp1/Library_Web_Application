import React from "react";
import './ResourcesSectionStyles.css';
import ResourcesListEntry from "./ResourcesListEntry";

function ResourcesList({resources, selectEntry}) {
    return (
        <table className="resourcesList">
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Identifier</th>
                    <th>Publisher</th>
                </tr>
            </thead>
            <tbody>
                {resources.map((resource, index) => (
                    <ResourcesListEntry
                        key={resource.id}
                        resource={resource}
                        listId={index + 1}
                        selectEntry={selectEntry}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ResourcesList;