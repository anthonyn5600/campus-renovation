"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CampusEvent } from "@/types";

const PAGE_SIZE = 20;

export function useEvents() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  useEffect(() => {
    async function fetchFirstPage() {
      try {
        const res = await fetch(`/api/events?page=1&limit=${PAGE_SIZE}`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data.events);
        setHasMore(data.hasMore);
        pageRef.current = 1;
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFirstPage();
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = pageRef.current + 1;
      const res = await fetch(`/api/events?page=${nextPage}&limit=${PAGE_SIZE}`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents((prev) => [...prev, ...data.events]);
      setHasMore(data.hasMore);
      pageRef.current = nextPage;
    } catch (err) {
      console.error("Error loading more events:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  return { events, loading, loadingMore, hasMore, loadMore };
}
