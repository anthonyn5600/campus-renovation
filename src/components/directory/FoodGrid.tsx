"use client";

import { useState } from "react";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import SearchInput from "./SearchInput";

const categories = ["All", ...Array.from(new Set(restaurants.map((r) => r.category)))];

export default function FoodGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || r.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search restaurants..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-orange text-white"
                  : "bg-navy-light text-gray-light hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((restaurant, i) => (
          <div
            key={i}
            className="bg-navy-light rounded-xl p-5 hover:bg-navy-light/80 transition-all duration-150"
          >
            <h3 className="text-white font-semibold text-base">{restaurant.name}</h3>
            <span className="inline-block mt-1 text-xs text-orange font-medium">{restaurant.category}</span>
            <p className="text-gray-light text-sm mt-2">{restaurant.address}</p>
            <p className="text-gray-light text-sm mt-1">{restaurant.phone}</p>
            <Link
              href="/"
              className="inline-block mt-3 px-4 py-1.5 bg-orange text-white text-xs font-medium rounded-lg hover:bg-orange-hover transition-colors"
            >
              View on Map
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-light text-sm py-12">
          No restaurants found matching your search.
        </div>
      )}
    </div>
  );
}
