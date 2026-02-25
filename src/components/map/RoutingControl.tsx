"use client";

import { Polyline } from "react-leaflet";

interface RoutingControlProps {
  origin: [number, number] | null;
  destination: [number, number] | null;
}

export default function RoutingControl({ origin, destination }: RoutingControlProps) {
  if (!origin || !destination) return null;

  return (
    <Polyline
      positions={[origin, destination]}
      pathOptions={{
        color: "#F47920",
        weight: 4,
        opacity: 0.8,
        dashArray: "8, 12",
      }}
    />
  );
}
