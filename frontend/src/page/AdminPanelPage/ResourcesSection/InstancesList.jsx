import React from "react";
import './ResourcesSectionStyles.css';
import InstancesListEntry from "./InstancesListEntry";

function InstancesList({instances, withdrawInstance, updateInstance}) {
    return (
        <table className='instancesList'>
            <thead>
                <tr>
                    <td>Nr</td>
                    <td>ID</td>
                    <td>Reserved</td>
                    <td>Status</td>
                    <td>Withdraw</td>
                    <td>Update</td>
                </tr>
            </thead>
            <tbody>
                {instances.map((instance, index) => (
                    <InstancesListEntry
                        key={instance.id}
                        instance={instance}
                        listId = {index}
                        withdrawInstance={withdrawInstance}
                        updateInstance={updateInstance}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default InstancesList;