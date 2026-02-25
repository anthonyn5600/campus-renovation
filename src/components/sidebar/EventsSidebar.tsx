"use client";

import { useRef, useCallback } from "react";
import { CampusEvent } from "@/types";
import EventCard from "./EventCard";

interface EventsSidebarProps {
  events: CampusEvent[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onEventClick: (event: CampusEvent) => void;
}

export default function EventsSidebar({
  events,
  loading,
  loadingMore,
  hasMore,
  onLoadMore,
  onEventClick,
}: EventsSidebarProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node || !hasMore) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [hasMore, onLoadMore]
  );

  if (loading) {
    return (
      <div className="space-y-3 p-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-navy-light rounded-lg p-3 animate-pulse">
            <div className="flex gap-3">
              <div className="w-10 h-12 bg-navy rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-navy rounded w-3/4" />
                <div className="h-2 bg-navy rounded w-1/2" />
                <div className="h-2 bg-navy rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-4 text-center text-gray-light text-sm">
        No events found
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3 overflow-y-auto">
      {events.map((event, i) => (
        <EventCard key={i} event={event} onClick={() => onEventClick(event)} />
      ))}

      {/* Sentinel element — triggers loadMore when scrolled into view */}
      {hasMore && (
        <div ref={sentinelRef} className="py-3 flex justify-center">
          {loadingMore ? (
            <div className="flex items-center gap-2 text-gray-light text-xs">
              <div className="h-4 w-4 border-2 border-gray-dark border-t-orange rounded-full animate-spin" />
              Loading more...
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}
    </div>
  );
}
