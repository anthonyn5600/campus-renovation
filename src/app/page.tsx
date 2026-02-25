"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import BottomSheet from "@/components/sidebar/BottomSheet";
import RoutePanel from "@/components/map/RoutePanel";
import { useEvents } from "@/hooks/useEvents";
import { useGeolocation } from "@/hooks/useGeolocation";
import { findBuilding } from "@/lib/building-lookup";
import { Building, CampusEvent } from "@/types";

const CampusMap = dynamic(() => import("@/components/map/CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-navy flex items-center justify-center">
      <div className="text-gray-light text-sm animate-pulse">Loading map...</div>
    </div>
  ),
});

export default function MapPage() {
  const { events, loading: eventsLoading, loadingMore: eventsLoadingMore, hasMore: eventsHasMore, loadMore: loadMoreEvents } = useEvents();
  const { position, setPosition, requestLocation } = useGeolocation();
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [routeDestination, setRouteDestination] = useState<Building | null>(null);

  const handleBuildingSelect = useCallback((building: Building | null) => {
    setSelectedBuilding(building);
  }, []);

  const handleEventClick = useCallback((event: CampusEvent) => {
    const building = findBuilding(event.location);
    if (building) {
      setSelectedBuilding(building);
    }
  }, []);

  const handleGetDirections = useCallback(
    (building: Building) => {
      if (!position) {
        requestLocation();
      }
      setRouteDestination(building);
    },
    [position, requestLocation]
  );

  const handleBuildingClick = useCallback(
    (building: Building) => {
      setSelectedBuilding(building);
    },
    []
  );

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar
        events={events}
        eventsLoading={eventsLoading}
        eventsLoadingMore={eventsLoadingMore}
        eventsHasMore={eventsHasMore}
        onLoadMoreEvents={loadMoreEvents}
        onEventClick={handleEventClick}
        onBuildingClick={handleBuildingClick}
      />

      <div className="relative flex-1">
        {/* Location + Directions controls */}
        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
          <button
            onClick={() => {
              if (!position) requestLocation();
              else setPosition(null);
            }}
            className={`p-2 rounded-lg shadow-lg transition-colors ${
              position ? "bg-success text-white" : "bg-navy text-gray-light hover:text-white"
            } border border-navy-light`}
            title={position ? "Hide your location" : "Show your location"}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {selectedBuilding && (
            <button
              onClick={() => handleGetDirections(selectedBuilding)}
              className="px-3 py-2 bg-orange text-white text-xs font-medium rounded-lg shadow-lg hover:bg-orange-hover transition-colors"
            >
              Get Directions
            </button>
          )}
        </div>

        <CampusMap
          selectedBuilding={selectedBuilding}
          onBuildingSelect={handleBuildingSelect}
          userPosition={position}
          onUserPositionChange={setPosition}
          routeDestination={routeDestination}
        />

        {routeDestination && position && (
          <RoutePanel
            origin={position}
            destination={routeDestination}
            onClose={() => setRouteDestination(null)}
          />
        )}
      </div>

      <BottomSheet
        events={events}
        eventsLoading={eventsLoading}
        eventsLoadingMore={eventsLoadingMore}
        eventsHasMore={eventsHasMore}
        onLoadMoreEvents={loadMoreEvents}
        onEventClick={handleEventClick}
        onBuildingClick={handleBuildingClick}
      />
    </div>
  );
}
