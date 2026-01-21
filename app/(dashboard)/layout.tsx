import React from "react";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full  bg-[#FFFFFA] text-gray-900">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <TopNav />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
