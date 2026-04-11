import Sidebar from "@/components/layouts/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
