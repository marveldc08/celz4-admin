import { Bell, Search, CirclePlus, Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";



export default function TopNav() {
  return (
    <header className="flex items-center justify-between px-6 py-4 z-20 bg-white  shadow-md">
      <h1 className="text-sm text-[#717171] font-light">
        Welcome,{" "}
        <span className="text-md text-[#262626] font-semibold">Josh</span>
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            placeholder="Type to search"
            className="pl-9 py-3 w-64 bg-[#FAFAFA] rounded-lg"
          />
        </div>
        <button className="bg-[#FAFAFA] rounded-full p-3 flex items-center justify-center cursor-pointer border border-[#F5F5F5]">
          <Bell size={18} />
        </button>
        <button className="bg-[#FAFAFA] rounded-full p-3 flex items-center justify-center cursor-pointer border border-[#F5F5F5]">
          <CirclePlus size={18} />
        </button>
        <button className="bg-[#FAFAFA] rounded-full p-3 flex items-center justify-center cursor-pointer border border-[#F5F5F5]">
          <Calendar size={18} />
        </button>

        <div className="flex items-center gap-2">
          <Image
            src="/images/profile.png"
            width={50}
            height={50}
            alt="profile image"
            className="rounded-full"
          />
          <span className="text-md font-semibold">
            Josh Ola <p className="text-sm text-[#717171] font-light">Admin</p>
          </span>
        </div>
      </div>
    </header>
  );
}