import React from "react";
import bookPlaceholder from "../../assets/image/bookPlaceholder.jpg";
import "./ResourcesPageStyles.css";

function Resource({image, title, authors}) {

    const authorsFullNames = authors.map(author => `${author.firstName} ${author.lastName}`)
    return (
        <div className="resource">
            <img src={image || bookPlaceholder} className="resourceImage"/>
            <h3 className="resourceTitle">{title}</h3>
            <p className="authors">{authorsFullNames.join(', ')}</p>
        </div>
    );
}

export default Resource;