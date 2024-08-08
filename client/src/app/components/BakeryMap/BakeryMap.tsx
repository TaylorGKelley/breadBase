import React from 'react';
import styles from './BakeryMap.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function BakeryMap() {
  const coordinates = ['', ''];

  const handleMarkerClick = (coord: string) => {
    return;
  };
  return (
    <div className={styles.BakeryMap}>
      <MapContainer
        // center={[51.505, -0.09]}
        // zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            position={coord}
            eventHandlers={{ click: () => handleMarkerClick(coord) }}
          >
            <Popup>
              A pretty CSS3 Popup. <br /> easily customizable
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
