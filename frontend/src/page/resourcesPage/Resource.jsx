import React from "react";
import bookPlaceholder from "../../assets/image/bookPlaceholder.jpg";
import "./ResourcesPageStyles.css";
import { Link } from "react-router-dom";

function Resource({resource, id}) {

    const authorsFullNames = resource.authors.map(author => `${author.firstName} ${author.lastName}`)
    return (
        <Link to={`/resources/${id}`} state={{resource}} className="resource">
            <img src={resource.imageUrl || bookPlaceholder} className="resourceImage"/>
            <h3 className="resourceTitle">{resource.title}</h3>
            <p className="authors">{authorsFullNames.join(', ')}</p>
        </Link>
    );
}

export default Resource;