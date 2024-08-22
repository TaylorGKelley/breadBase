'use client';

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapController from './MapController';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const [position, setPosition] = useState<LatLngTuple>([32.3182, -86.9023]);

  function successFunction(position: GeolocationPosition) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    setPosition([lat, long]);
    console.log('Your latitude is :' + lat + ' and longitude is ' + long);
  }

  function errorFunction() {
    console.log('Unable to retrieve your location');
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={3}
      // minZoom={3}
      maxBounds={[
        [-85, -180],
        [85, 180],
      ]}
      maxBoundsViscosity={1}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      // Disables user control
      dragging={false}
      keyboard={false}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      />
      <MapController selectedMarker={position} />

      <Marker
        position={[37.3, -86.0369]}
        eventHandlers={{
          click: () => {
            setPosition([37.3, -86.0369]);
          },
        }}
      >
        <Popup>Popup message!</Popup>
      </Marker>
    </MapContainer>
  );
}
