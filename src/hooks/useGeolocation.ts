"use client";

import { useState, useCallback } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setError(null);
      },
      (err) => {
        setError(err.message);
        // Default to center of campus if geolocation fails
        setPosition([33.8804, -117.8849]);
      }
    );
  }, []);

  return { position, setPosition, error, requestLocation };
}
