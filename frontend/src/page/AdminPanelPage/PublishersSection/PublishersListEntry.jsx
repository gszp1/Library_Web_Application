import React, {useState} from "react";
import './PublishersSectionStyles.css';

function PublishersListEntry({publisher, updatePublisher}) {
    const [updatedPublisher, setUpdatedPublisher] = useState({
            publisherId: publisher.publisherId || 0,
            name: publisher.name || '',
            address: publisher.address || '',
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPublisher((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        updatePublisher(updatedPublisher);
    }

    return (
        <tr>
            <td>
                <input
                    type='text'
                    name='publisherId'
                    value={updatedPublisher.publisherId}
                    onChange={handleChange}
                    readOnly
                />
            </td>
            <td>
                <input
                    type='text'
                    name='name'
                    value={updatedPublisher.name}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='address'
                    value={updatedPublisher.address}
                    onChange={handleChange}
                />
            </td>
            <td>
                <button onClick={handleSubmit}>Submit</button>
            </td>
        </tr>
    );
}

export default PublishersListEntry;