import React from "react";
import bookPlaceholder from "../../assets/image/bookPlaceholder.jpg";
import "./ResourcesPageStyles.css";

function Resource({image, title, authors}) {
    return (
        <div className="resource">
            <img src={image || bookPlaceholder} className="resourceImage"/>
            <h3 className="resourceTitle">{title}</h3>
            <p className="authors">{authors.join(', ')}</p>
        </div>
    );
}

export default Resource;