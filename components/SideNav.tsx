import { Calendar, Settings, Users, Video } from "lucide-react";
import React from "react";

export default function SideNav() {
  const items = [
    { label: "Overview", icon: Users, active: true },
    { label: "Events", icon: Calendar },
    { label: "Live Stream", icon: Video },
    { label: "Users", icon: Users },
    { label: "Sermons", icon: Video },
    { label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#1e2b5b] text-white p-6 hidden lg:block">
      <div className="text-xl font-bold mb-10">logo</div>
      <nav className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
              item.active ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
