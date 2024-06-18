import React from "react";
import './ResourcesSectionStyles.css';

function ResourcesListEntry({resource, listId, selectEntry}) {
    const handleClick = () => {
        selectEntry(resource);
    }

    return (
        <tr className="clickableEntry" onClick={handleClick}>
            <td>{listId}</td>
            <td>{resource.id}</td>
            <td>{resource.title}</td>
            <td>{resource.identifier}</td>
            <td>{resource.publisher}</td>
        </tr>
    );
}

export default ResourcesListEntry;
