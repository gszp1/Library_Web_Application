import React from "react";
import './ResourcesPageStyles.css';
import Resource from "./Resource";

function ResourcesPage() {
    return (
        <div className="pageContent">
            <Resource image="" title="book" authors={["philip", "jan"]} />
        </div>
    );
}

export default ResourcesPage;