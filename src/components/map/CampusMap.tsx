"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import BuildingMarkerLayer from "./BuildingMarkerLayer";
import UserLocationMarker from "./UserLocationMarker";
import RoutingControl from "./RoutingControl";
import { Building } from "@/types";
import L from "leaflet";

// Fix default marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const CAMPUS_CENTER: [number, number] = [33.88041653, -117.88490707];
const DEFAULT_ZOOM = 17;

interface CampusMapProps {
  selectedBuilding: Building | null;
  onBuildingSelect: (building: Building | null) => void;
  userPosition: [number, number] | null;
  onUserPositionChange: (pos: [number, number]) => void;
  routeDestination: Building | null;
}

function FlyToBuilding({ building }: { building: Building | null }) {
  const map = useMap();
  useEffect(() => {
    if (building) {
      map.flyTo([building.lat, building.lng], 18);
    }
  }, [building, map]);
  return null;
}

export default function CampusMap({
  selectedBuilding,
  onBuildingSelect,
  userPosition,
  onUserPositionChange,
  routeDestination,
}: CampusMapProps) {
  return (
    <MapContainer
      center={CAMPUS_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <BuildingMarkerLayer
        selectedBuilding={selectedBuilding}
        routeDestination={routeDestination}
        onBuildingSelect={onBuildingSelect}
      />
      <FlyToBuilding building={selectedBuilding} />
      {userPosition && (
        <UserLocationMarker
          position={userPosition}
          onPositionChange={onUserPositionChange}
        />
      )}
      <RoutingControl
        origin={userPosition}
        destination={routeDestination ? [routeDestination.lat, routeDestination.lng] : null}
      />
    </MapContainer>
  );
}
