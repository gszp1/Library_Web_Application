import React, {useState} from "react";
import './ResourcesSectionStyles.css';

function InstancesListEntry({instance, listId, withdrawInstance, updateInstance}) {
    const [updatedInstance, setUpdatedInstance] = useState({
        resourceId: instance.resourceId || 0,
        id: instance.id || 0,
        isReserved: instance.isReserved,
        instanceStatus: instance.instanceStatus || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInstance((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        updateInstance(updatedInstance);
    }

    const handleWithdraw = () => {
        withdrawInstance(updatedInstance.id);
    }

    return (
        <tr>
            <td>{listId}</td>
            <td>
                <input
                    name='id'
                    value={updatedInstance.id}
                    onChange={handleChange}
                    readOnly
                />
            </td>
            <td>
                <select
                    name='isReserved'
                    value={updatedInstance.isReserved}
                    onChange={handleChange}
                >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </td>
            <td>
                <select
                    name='instanceStatus'
                    value={updatedInstance.instanceStatus}
                    onChange={handleChange}
                >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="WITHDRAWN">WITHDRAWN</option>
                    <option value="AWAITING_WITHDRAWAL">AWAITING_WITHDRAWAL</option>
                </select>
            </td>
            <td>
                <button onClick = {handleWithdraw}>
                    Withdraw
                </button>
            </td>
            <td>
                <button onClick = {handleUpdate}>
                    Update
                </button>
            </td>
        </tr>
    );
}

export default InstancesListEntry;
