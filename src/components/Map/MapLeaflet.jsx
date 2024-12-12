import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapLeaflet = () => {
  return (
    <MapContainer
      center={[13.736717, 100.523186]} // Bangkok, Thailand coordinates
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[13.736717, 100.523186]}>
        <Popup>กรุงเทพมหานคร</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLeaflet;
