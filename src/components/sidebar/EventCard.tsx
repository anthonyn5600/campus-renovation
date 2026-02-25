"use client";

import { CampusEvent } from "@/types";

interface EventCardProps {
  event: CampusEvent;
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const date = new Date(event.datetime);
  const isValidDate = !isNaN(date.getTime());
  const month = isValidDate ? date.toLocaleDateString("en-US", { month: "short" }) : "TBD";
  const day = isValidDate ? String(date.getDate()) : "—";
  const time = isValidDate ? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "";

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-navy-light rounded-lg p-3 border-l-3 border-orange hover:bg-navy-light/80 hover:scale-[1.01] transition-all duration-150 cursor-pointer"
    >
      <div className="flex gap-3">
        <div className="flex flex-col items-center min-w-[40px]">
          <span className="text-orange text-xs font-bold uppercase">{month}</span>
          <span className="text-orange text-lg font-bold">{day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-semibold truncate">{event.title}</h4>
          <p className="text-gray-light text-xs mt-0.5">{time}</p>
          {event.location && (
            <p className="text-gray-light text-xs mt-0.5 flex items-center gap-1">
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{event.location}</span>
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
