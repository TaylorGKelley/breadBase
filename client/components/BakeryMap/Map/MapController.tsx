import { LatLngTuple } from 'leaflet';
import React, { FC, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

export default function MapController({
  selectedMarker,
}: {
  selectedMarker: LatLngTuple;
}) {
  const map = useMap();
  const flyToDuration = 1.5;
  const center: LatLngTuple = [32.3182, -86.9023];

  const flyTo = (location: LatLngTuple) => {
    map.flyTo(location, 5, { animate: true, duration: flyToDuration });
  };

  const flyToCenter = () => {
    map.flyTo(center, 15, { animate: true, duration: flyToDuration });
  };

  useEffect(() => {
    if (selectedMarker) {
      flyTo(selectedMarker);
    } else {
      flyToCenter();
    }
  }, [selectedMarker]);

  return (
    <Marker
      position={center}
      eventHandlers={{
        click: () => {
          flyTo(center);
        },
      }}
    >
      <Popup>Popup message!</Popup>
    </Marker>
  );
}
