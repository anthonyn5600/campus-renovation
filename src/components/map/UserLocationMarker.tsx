"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";

interface UserLocationMarkerProps {
  position: [number, number];
  onPositionChange: (pos: [number, number]) => void;
}

export default function UserLocationMarker({ position, onPositionChange }: UserLocationMarkerProps) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div style="width:16px;height:16px;background:#4CAF50;border:3px solid white;border-radius:50%;box-shadow:0 0 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    []
  );

  return (
    <Marker
      position={position}
      icon={icon}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          onPositionChange([latlng.lat, latlng.lng]);
        },
      }}
    >
      <Popup>
        <span className="text-xs text-gray-900">Your Location (drag to move)</span>
      </Popup>
    </Marker>
  );
}
