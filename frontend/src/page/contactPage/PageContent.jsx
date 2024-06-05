import React from "react";
import ContactData from "./ContactData";
import LocationMap from "./LocationMap";

function PageContent() {
    let latitude = 51.745599409156924;
    let longitude = 19.454487459806266;
    let zoomLevel = 13;
    let markers = [{geocode:[latitude, longitude]}];
    return (
        <div className="pageContent">
            <ContactData />
            <LocationMap
                latitude = {latitude}
                longitude = {longitude}
                zoomLevel = {zoomLevel}
                markers = {markers}
            />
        </div>
    );
}

export default PageContent;