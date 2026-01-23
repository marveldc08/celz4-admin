'use client'
import React from "react";
import Image from "next/image";
import {Download, UploadCloud, Search, Users, ChevronUp, Share, Pen, Trash, Eye} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UsersTable } from "@/components/UsersTable";



type User = {
  name: string;
  profile: string;
  email: string;
  role: string;
  date: string;
  status: "Active" | "Inactive";
};

export default function DashboardPage() {


  const cards = [
    { title: "Total Users", value: "1500", color: "bg-[#1e2b5b] text-white" },
    { title: "All Registered Events", value: "1500", color: "bg-white" },
    { title: "Total Uploaded Sermons", value: "300", color: "bg-[#fff7e6]" },
  ];

   const users: User[] = Array.from({ length: 20 }).map(() => ({
     name: "Oluwajimiloju Paul",
     profile: '/images/profile.png',
     email: "oluwajimiloju@gmail.com",
     role: "Cell Leader",
     date: "09 Nov, 2025",
     status: "Active",
   }));

     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     const hours = ["12am", "1am", "2am"];
  



  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Overview</h1>
            </div>
            <div className="flex justify-between items-center gap-3">
              <button className=" flex justify-center cursor-pointer items-center gap-2 px-9 py-3 border border-[#F5F5F5] rounded-lg bg-[#FAFAFA]">
                {" "}
                <UploadCloud /> Export
              </button>
              <div className="relative cursor-pointer">
                <Search className="absolute left-3 top-3 w-5 h-5" />
                <select
                  name="month"
                  id="month"
                  className="flex justify-center items-center gap-2 px-9 py-3 border cursor-pointer border-[#F5F5F5] rounded-lg bg-[#FAFAFA]"
                >
                  <option value="">Select Month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* users table */}
            <Card className="xl:col-span-2 border-none px-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <Card
                    key={card.title}
                    className={`${card.color} bg-[url('/images/line-bg.png')] bg-cover bg-no-repeat ${card.color === "bg-white" ? "border-dashed" : "border-none"}`}
                  >
                    <CardContent className="p-6 space-y-2">
                      {card.color === "bg-white" ||
                      card.title === "Total Users" ? (
                        <div
                          className={`flex justify-center items-center rounded-full w-10 h-10 p-3  border border-dashed border-white ${card.color == "bg-white" || card.title === "Total Uploaded Sermons" ? "bg-secondary text-white" : "bg-none"}`}
                        >
                          <Users />
                        </div>
                      ) : (
                        <div
                          className={`flex justify-center items-center rounded-full w-10 h-10 p-3 bg-secondary border text-white border-dashed border-white`}
                        >
                          <UploadCloud />
                        </div>
                      )}
                      <p className="text-sm">{card.title}</p>
                      <h2 className="text-2xl font-bold">{card.value}</h2>
                      <div>
                        <div className="flex justify-left items-center gap-2 ">
                          <div
                            className={`flex justify-center items-center w-6 h-6 rounded-full text-white ${card.color === "bg-white" ? "bg-green-500" : "bg-secondary"}`}
                          >
                            <ChevronUp className={`inline-block w-4 h-4`} />
                          </div>
                          <span className="text-xs">+40% Than last week</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <UsersTable data={users} />

              {/* Calendar Grid */}

              <div className="bg-white rounded-xl p-6 shadow-sm overflow-x-auto">
                <div className="py-2">
                  <h4 className="text-md font-semibold">Events</h4>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-8 min-w-225">
                  {/* ===== Header Row ===== */}
                  <div /> {/* empty top-left cell */}
                  {days.map((day) => (
                    <div
                      key={day}
                      className="text-xs text-gray-500 text-center pb-2 border-b border-x border-gray-200"
                    >
                      <p>{day}</p>
                      <p className="font-medium">20/11</p>
                    </div>
                  ))}
                  {/* ===== Time Rows ===== */}
                  {hours.map((hour, hourIndex) => (
                    <>
                      {/* Time column */}
                      <div
                        key={hour}
                        className="text-xs text-gray-400 py-6 px-2 border-r border-b border-gray-200"
                      >
                        {hour}
                      </div>

                      {/* Day cells */}
                      {days.map((_, dayIndex) => (
                        <div
                          key={`${hourIndex}-${dayIndex}`}
                          className="relative h-20 border-r border-b border-gray-200"
                        >
                          {hourIndex === 0 && dayIndex === 0 && (
                            <CalendarEvent
                              title="Pastor’s birthday"
                              color="bg-[#1E2A5A]"
                            />
                          )}

                          {hourIndex === 1 && dayIndex === 1 && (
                            <CalendarEvent
                              title="Media Conference"
                              color="bg-[#FFF4CC]"
                              dark
                            />
                          )}

                          {hourIndex === 1 && dayIndex === 4 && (
                            <CalendarEvent
                              title="Pastor’s conference"
                              color="bg-[#FFE8E8]"
                              dark
                            />
                          )}
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </div>
            </Card>

            {/* Right Panel */}

            <div className="space-y-6">
              <Card className="border-none">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Sermons</h3>
                    <Button
                      variant={"outline"}
                      size="lg"
                      className="cursor-pointer px-10 py-3 border border-gray-200 text-[#334797]"
                    >
                      <UploadCloud size={14} /> Upload
                    </Button>
                  </div>
                  <div className="bg-[#202C5E] rounded-lg px-3 py-5 text-white">
                    <Image
                      src="/images/friends-group.jpg"
                      width={1000}
                      height={200}
                      alt="sermon image"
                      className="rounded-lg"
                    />
                    <p className="text-md font-medium my-1">
                      <span className="font-semibold">Theme:</span> The Fruit of
                      the Spirit
                    </p>
                    <p className="text-sm text-muted-foreground my-1">
                      <span className="font-semibold">Speaker:</span> Pastor
                      Jane Williams
                    </p>
                    <p className="text-xs text-muted-foreground my-2">
                      <span className="font-semibold">Duration:</span> 20:40 min
                    </p>
                    <div className="flex justify-between items-center gap-2 rounded-lg px-6 bg-white text-[#262626] py-2 mt-4">
                      <div className="flex">
                        <Button size="sm" className="cursor-pointer">
                          <Share size={14} /> Share
                        </Button>
                        <Button size="sm" className="cursor-pointer">
                          Edit <Pen size={14} />
                        </Button>
                      </div>
                      <Button size="sm" className="cursor-pointer">
                        Download <Download size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-6 py-3">
                    <div>
                      <p className="text-md text-[#262626] font-semibold">
                        Block Access
                      </p>
                      <p className="text-sm text-[#717171]">
                        Users on the block list are unable to login to the admin
                        section of the app anymore, ever, or again.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-0">
                    <input
                      type="text"
                      placeholder="Add User"
                      className="bg-[#FAFAFA] outline-none p-2 border border-[#F5F5F5] rounded-l-lg  w-[70%]"
                    />
                    <button className="bg-[#202C5E] p-2 text-white text-center rounded-r-lg w-[30%] cursor-pointer">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-col overflow-y-scroll h-50 py-5">
                    {users.map((user, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2 py-2">
                          <Image
                            src={user.profile}
                            width={30}
                            height={30}
                            alt="profile image"
                            className="rounded-full"
                          />
                          <span className="text-sm font-semibold">
                            {user.name}{" "}
                            <p className="text-xs text-[#717171] font-light">
                              {user.role}
                            </p>
                          </span>
                        </div>
                        <div>
                          <button className="flex justify-center items-center gap-1 cursor-pointer">
                            {" "}
                            <Trash className="w-4 h-4" />{" "}
                            <p className="text-[#717171] text-sm">
                              Remove User
                            </p>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="py-7">
                    <p className="text-md font-semibold mb-3">Today’s event</p>
                    <div>
                      <div className="flex gap-5 justify-center items-center bg-[#202C5E] rounded-l-full rounded-r-full py-4 px-2 my-3 ">
                        <div className="p-3 rounded-full bg-[#BCBFCE33] w-9 h-9 flex justify-center items-center text-white">
                          <Users />
                        </div>
                        <div className="text-white text-sm">
                          <p>Oladele Accepted invite link</p>
                        </div>
                        <button className="p-3 rounded-full bg-[#BCBFCE33] w-9 h-9 flex justify-center items-center text-white">
                          <Eye />
                        </button>
                      </div>
                      <div className="flex gap-5 justify-center items-center bg-[#149242] rounded-l-full rounded-r-full py-4 px-2 my-3 ">
                        <div className="p-3 rounded-full bg-[#BCBFCE33] w-9 h-9 flex justify-center items-center text-white">
                          <Users />
                        </div>
                        <div className="text-white text-sm">
                          <p>Oladele Accepted invite link</p>
                        </div>
                        <button className="p-3 rounded-full bg-[#BCBFCE33] w-9 h-9 flex justify-center items-center text-white">
                          <Eye />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface Props {
  title: string;
  color: string;
  dark?: boolean;
}

export function CalendarEvent({ title, color, dark }: Props) {
  return (
    <div
      className={`absolute inset-x-2 top-2 rounded-full px-3 py-1 text-xs flex items-center gap-2 ${color} ${
        dark ? "text-gray-800" : "text-white"
      }`}
    >
      <span className="w-4 h-4 rounded-full bg-white/60" />
      {title}
    </div>
  );
}
