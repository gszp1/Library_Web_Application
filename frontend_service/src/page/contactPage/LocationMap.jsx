import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ContactPageStyles.css";
import { Icon } from "leaflet";
import mapPin from "../../assets/image/mapPin.png";

function LocationMap({latitude, longitude, zoomLevel, markers}) {

    const customIcon = new Icon({
        iconUrl: mapPin,
        iconSize: [30, 30]
    })

    return (
        <MapContainer center={[latitude, longitude]} zoom={zoomLevel}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((marker, index) => (
                <Marker key={index} position={marker.geocode} icon={customIcon}></Marker>
            ))}
        </MapContainer>
    )
}

export default LocationMap;