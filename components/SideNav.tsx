'use client'

import { Calendar, Settings, Users, Video } from "lucide-react";
import Link from "next/link";
import React from "react";
import  { usePathname } from 'next/navigation'

export default function SideNav() {

  const items = [
    { label: "Overview", icon: Users, active: true, url: "/dashboard" },
    { label: "Events", icon: Calendar, active: true, url: "/events" },
    { label: "Live Stream", icon: Video, active: true, url: "/live-stream" },
    { label: "Users", icon: Users, active: true, url: "/users" },
    { label: "Sermons", icon: Video, active: true, url: "/sermons" },
    { label: "Settings", icon: Settings, active: true, url: "/settings" },
  ];

  const path = usePathname()
  return (
    <aside className="w-64 bg-[#1e2b5b] text-white p-6 hidden lg:block rounded-t-lg mt-3">
      <div className="text-xl font-bold mb-10">logo</div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.url} 
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
             item.url === path ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
