"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CampusEvent } from "@/types";
import allEvents from "@/data/events.json";

const PAGE_SIZE = 20;

export function useEvents() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageRef = useRef(1);

  useEffect(() => {
    const firstPage = (allEvents as CampusEvent[]).slice(0, PAGE_SIZE);
    setEvents(firstPage);
    setHasMore(PAGE_SIZE < allEvents.length);
    setLoading(false);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = pageRef.current + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const slice = (allEvents as CampusEvent[]).slice(start, start + PAGE_SIZE);
    setEvents((prev) => [...prev, ...slice]);
    setHasMore(start + PAGE_SIZE < allEvents.length);
    pageRef.current = nextPage;
    setLoadingMore(false);
  }, [loadingMore, hasMore]);

  return { events, loading, loadingMore, hasMore, loadMore };
}
