"use client";

import { Building } from "@/types";

interface RoutePanelProps {
  origin: [number, number];
  destination: Building;
  onClose: () => void;
}

function haversineDistance(a: [number, number], b: [number, number]): number {
  const R = 3958.8; // Earth radius in miles
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * sinLng * sinLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function RoutePanel({ origin, destination, onClose }: RoutePanelProps) {
  const miles = haversineDistance(origin, [destination.lat, destination.lng]);
  const walkMinutes = Math.max(1, Math.round(miles / 0.05)); // ~3 mph walking

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-surface backdrop-blur-md rounded-xl p-4 min-w-[280px] border border-navy-light">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Walking Directions</h3>
        <button
          onClick={onClose}
          className="text-gray-light hover:text-white"
          aria-label="Close route panel"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-success shrink-0" />
          <span className="text-gray-light">Your Location</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-orange shrink-0" />
          <span className="text-white font-medium">{destination.name}</span>
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-navy-light">
          <span className="text-white text-sm font-semibold">~{walkMinutes} min</span>
          <span className="text-gray-light text-xs">
            {miles < 0.1 ? `${Math.round(miles * 5280)} ft` : `${miles.toFixed(2)} mi`}
          </span>
        </div>
      </div>
    </div>
  );
}
