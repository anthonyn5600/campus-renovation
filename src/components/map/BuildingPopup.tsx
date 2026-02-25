import { Building } from "@/types";

interface BuildingPopupProps {
  building: Building;
  categoryLabel: string;
}

export default function BuildingPopup({ building, categoryLabel }: BuildingPopupProps) {
  return (
    <div className="min-w-[180px]">
      <h3 className="text-sm font-semibold text-gray-900 m-0">{building.name}</h3>
      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-orange/20 text-orange font-medium">
        {categoryLabel}
      </span>
    </div>
  );
}
