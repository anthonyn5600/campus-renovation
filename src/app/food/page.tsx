import FoodGrid from "@/components/directory/FoodGrid";

export default function FoodPage() {
  return (
    <div className="min-h-screen bg-navy-dark px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Dining Near Campus</h1>
        <FoodGrid />
      </div>
    </div>
  );
}
