"use client";

import { useState } from "react";
import SidebarTabs from "./SidebarTabs";
import EventsSidebar from "./EventsSidebar";
import BuildingsSidebar from "./BuildingsSidebar";
import { Building, CampusEvent } from "@/types";

interface SidebarProps {
  events: CampusEvent[];
  eventsLoading: boolean;
  eventsLoadingMore: boolean;
  eventsHasMore: boolean;
  onLoadMoreEvents: () => void;
  onEventClick: (event: CampusEvent) => void;
  onBuildingClick: (building: Building) => void;
}

export default function Sidebar({
  events,
  eventsLoading,
  eventsLoadingMore,
  eventsHasMore,
  onLoadMoreEvents,
  onEventClick,
  onBuildingClick,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"events" | "buildings">("events");

  return (
    <>
      <div
        className={`hidden md:flex flex-col bg-navy border-r border-navy-light transition-all duration-300 ease-in-out ${
          collapsed ? "w-0 overflow-hidden" : "w-80"
        }`}
      >
        <SidebarTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
          {activeTab === "events" ? (
            <EventsSidebar
              events={events}
              loading={eventsLoading}
              loadingMore={eventsLoadingMore}
              hasMore={eventsHasMore}
              onLoadMore={onLoadMoreEvents}
              onEventClick={onEventClick}
            />
          ) : (
            <BuildingsSidebar onBuildingClick={onBuildingClick} />
          )}
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-2 text-gray-light hover:text-white text-xs border-t border-navy-light"
        >
          &larr; Hide sidebar
        </button>
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-[400] bg-navy border border-navy-light rounded-r-lg p-2 text-gray-light hover:text-white"
          aria-label="Show sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </>
  );
}
