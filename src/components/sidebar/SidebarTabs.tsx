"use client";

interface SidebarTabsProps {
  activeTab: "events" | "buildings";
  onTabChange: (tab: "events" | "buildings") => void;
}

export default function SidebarTabs({ activeTab, onTabChange }: SidebarTabsProps) {
  return (
    <div className="flex border-b border-navy-light">
      <button
        onClick={() => onTabChange("events")}
        className={`flex-1 py-2 text-xs font-medium transition-colors ${
          activeTab === "events"
            ? "text-orange border-b-2 border-orange"
            : "text-gray-light hover:text-white"
        }`}
      >
        Events
      </button>
      <button
        onClick={() => onTabChange("buildings")}
        className={`flex-1 py-2 text-xs font-medium transition-colors ${
          activeTab === "buildings"
            ? "text-orange border-b-2 border-orange"
            : "text-gray-light hover:text-white"
        }`}
      >
        Buildings
      </button>
    </div>
  );
}
