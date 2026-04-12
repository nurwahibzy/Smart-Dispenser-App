import WaterLevelSection from "@/features/water/water-level-section";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <WaterLevelSection />
      </div>
    </div>
  );
}
