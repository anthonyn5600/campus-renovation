"use client";

import { useState, useRef, useCallback } from "react";
import SidebarTabs from "./SidebarTabs";
import EventsSidebar from "./EventsSidebar";
import BuildingsSidebar from "./BuildingsSidebar";
import { Building, CampusEvent } from "@/types";

type SheetState = "peek" | "half" | "full";

interface BottomSheetProps {
  events: CampusEvent[];
  eventsLoading: boolean;
  eventsLoadingMore: boolean;
  eventsHasMore: boolean;
  onLoadMoreEvents: () => void;
  onEventClick: (event: CampusEvent) => void;
  onBuildingClick: (building: Building) => void;
}

const sheetHeights: Record<SheetState, string> = {
  peek: "h-[140px]",
  half: "h-[50vh]",
  full: "h-[85vh]",
};

export default function BottomSheet({
  events,
  eventsLoading,
  eventsLoadingMore,
  eventsHasMore,
  onLoadMoreEvents,
  onEventClick,
  onBuildingClick,
}: BottomSheetProps) {
  const [state, setState] = useState<SheetState>("peek");
  const [activeTab, setActiveTab] = useState<"events" | "buildings">("events");
  const startY = useRef(0);
  const currentState = useRef(state);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentState.current = state;
  }, [state]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = startY.current - e.changedTouches[0].clientY;
    const threshold = 50;

    if (diff > threshold) {
      if (currentState.current === "peek") setState("half");
      else if (currentState.current === "half") setState("full");
    } else if (diff < -threshold) {
      if (currentState.current === "full") setState("half");
      else if (currentState.current === "half") setState("peek");
    }
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-navy rounded-t-2xl border-t border-navy-light transition-all duration-300 ease-in-out ${sheetHeights[state]}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-center py-2">
        <div className="w-10 h-1 rounded-full bg-gray-dark" />
      </div>
      <SidebarTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="overflow-y-auto" style={{ height: "calc(100% - 60px)" }}>
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
    </div>
  );
}
