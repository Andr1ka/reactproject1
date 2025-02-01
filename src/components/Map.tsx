import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/Map.css'; 

interface MapProps {
    coord1: { lat: number; lng: number };
    coord2: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({ coord1, coord2 }) => {
    const position1 = [coord1.lat, coord1.lng];
    const position2 = [coord2.lat, coord2.lng];

    return (
        <div className="map-container">
            <MapContainer center={position1} zoom={5}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position1}>
                    <Popup>City 1</Popup>
                </Marker>
                <Marker position={position2}>
                    <Popup>City 2</Popup>
                </Marker>
                <Polyline positions={[position1, position2]} color="blue" />
            </MapContainer>
        </div>
    );
};

export default Map;