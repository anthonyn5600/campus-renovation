import { buildings } from "@/data/buildings";
import { Building } from "@/types";

const lookupMap = new Map<string, Building>();

buildings.forEach((b) => {
  lookupMap.set(b.name.toLowerCase(), b);
  lookupMap.set(b.id, b);
  b.aliases.forEach((a) => lookupMap.set(a.toLowerCase(), b));
});

export function findBuilding(query: string): Building | undefined {
  if (!query) return undefined;
  const normalized = query.toLowerCase().trim();

  // Exact match
  const exact = lookupMap.get(normalized);
  if (exact) return exact;

  // Partial match - check if query contains a building name
  for (const building of buildings) {
    if (normalized.includes(building.name.toLowerCase())) return building;
    for (const alias of building.aliases) {
      if (normalized.includes(alias.toLowerCase())) return building;
    }
  }

  return undefined;
}
