"use client";

import { useState } from "react";
import Link from "next/link";
import { departments } from "@/data/departments";
import SearchInput from "./SearchInput";

const colleges = ["All", ...Array.from(new Set(departments.map((d) => d.college)))];

export default function ContactList() {
  const [search, setSearch] = useState("");
  const [activeCollege, setActiveCollege] = useState("All");

  const filtered = departments.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    const matchCollege = activeCollege === "All" || d.college === activeCollege;
    return matchSearch && matchCollege;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search departments..."
          />
        </div>
        <select
          value={activeCollege}
          onChange={(e) => setActiveCollege(e.target.value)}
          className="bg-navy border border-navy-light text-white text-sm rounded-lg py-2.5 px-4 focus:outline-none focus:border-orange"
        >
          {colleges.map((college) => (
            <option key={college} value={college}>
              {college === "All" ? "All Colleges" : college}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((dept, i) => (
          <div
            key={i}
            className="bg-navy-light rounded-lg p-4 hover:bg-navy-light/80 transition-all duration-150"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{dept.name}</h3>
                <span className="text-orange text-sm">{dept.college}</span>
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                  <span className="text-gray-light text-sm flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {dept.phone}
                  </span>
                  {dept.email !== "Unlisted" && (
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-gray-light text-sm hover:text-white flex items-center gap-1.5"
                    >
                      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {dept.email}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {dept.room !== "Unlisted" && (
                  <span className="bg-navy text-orange rounded px-2 py-1 text-xs font-medium">
                    {dept.room}
                  </span>
                )}
                <Link
                  href="/"
                  className="text-orange text-xs hover:text-orange-hover flex items-center gap-1"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Map
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-light text-sm py-12">
          No departments found matching your search.
        </div>
      )}
    </div>
  );
}
