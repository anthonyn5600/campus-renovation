"use client";

import { useState } from "react";
import { buildings } from "@/data/buildings";
import { Building } from "@/types";

interface BuildingsSidebarProps {
  onBuildingClick: (building: Building) => void;
}

export default function BuildingsSidebar({ onBuildingClick }: BuildingsSidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search buildings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-light border border-navy-light text-white text-xs rounded-lg py-2 pl-9 pr-3 placeholder-gray-dark focus:outline-none focus:border-orange"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 px-3 pb-3">
        {filtered.map((building) => (
          <button
            key={building.id}
            onClick={() => onBuildingClick(building)}
            className="w-full text-left p-2 rounded-lg hover:bg-navy-light transition-colors"
          >
            <div className="text-white text-sm font-medium">{building.name}</div>
            <div className="text-gray-dark text-xs capitalize">{building.category}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
