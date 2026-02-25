"use client";

import { CircleMarker, Popup } from "react-leaflet";
import { buildings } from "@/data/buildings";
import { Building } from "@/types";
import BuildingPopup from "./BuildingPopup";

interface BuildingMarkerLayerProps {
  selectedBuilding: Building | null;
  routeDestination: Building | null;
  onBuildingSelect: (building: Building) => void;
}

const categoryLabels: Record<string, string> = {
  academic: "Academic",
  parking: "Parking",
  athletics: "Athletics",
  housing: "Housing",
  services: "Services",
  dining: "Dining",
  facilities: "Facilities",
};

export default function BuildingMarkerLayer({
  selectedBuilding,
  routeDestination,
  onBuildingSelect,
}: BuildingMarkerLayerProps) {
  return (
    <>
      {buildings.map((building) => {
        const isSelected = selectedBuilding?.id === building.id;
        const isRouted = routeDestination?.id === building.id;

        let color = "#F47920";
        let fillOpacity = 0;
        let opacity = 0;

        if (isRouted) {
          color = "#4CAF50";
          fillOpacity = 0.8;
          opacity = 1;
        } else if (isSelected) {
          color = "#F47920";
          fillOpacity = 0.8;
          opacity = 1;
        }

        return (
          <CircleMarker
            key={building.id}
            center={[building.lat, building.lng]}
            radius={20}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity,
              opacity,
              weight: 2,
            }}
            eventHandlers={{
              click: () => onBuildingSelect(building),
              mouseover: (e) => {
                if (!isSelected && !isRouted) {
                  e.target.setStyle({ opacity: 1, fillOpacity: 0.3 });
                }
              },
              mouseout: (e) => {
                if (!isSelected && !isRouted) {
                  e.target.setStyle({ opacity: 0, fillOpacity: 0 });
                }
              },
            }}
          >
            <Popup>
              <BuildingPopup
                building={building}
                categoryLabel={categoryLabels[building.category] || building.category}
              />
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
