"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Pen, Trash, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

type Event = {
  title: string;
  description: string;
  date: string;
  location: string;
  status: string;
  rsvp: string[];
  image: string[];
};
const Page = () => {
  const path = usePathname();

  const [openCreateEventModal, setOpenCreateEventModal] = useState(false);

  const events: Event[] = Array.from({ length: 12 }).map(() => ({
    title: "Pastor’s Conference",
    description: "Those who are led by the spirit are the..........",
    date: "09 Nov, 2025 12 : 00 PM",
    location: "Lagos, Nigeria",
    status: "Approved",
    rsvp: ["/images/profile.png", "/images/rsvp2.png", "/images/profile.png"],
    image: [
      "/images/friends-group2.jpg",
      "/images/friends-group.jpg",
      "/images/friends-group3.jpg",
      "/images/friends-group.jpg",
      "/images/rsvp1.png",
    ],
  }));
  const event = events[0];

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const allUsers = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Williams",
    "Robert Brown",
    "Emily Davis",
    "David Wilson",
    "Chris Evans",
    "Scarlett Johansson",
  ];

  const filteredUsers = allUsers.filter(
    (user) =>
      user.toLowerCase().includes(userSearch.toLowerCase()) &&
      !selectedUsers.includes(user),
  );

  const handleEditEvent = () => {
    setOpenCreateEventModal(false);
    toast.success("Event edited successfully");
  };
  const back = path.split("/details");
  const current = path.split("/events")[1];
  return (
    <div className="flex min-h-screen px-7 py-10 w-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center">
            <Link href={"/dashboard"} className="font-semibold mx-1">
              Dashboard{" "}
            </Link>{" "}
            <Link href={"/events"} className="font-semibold mx-1">
              {" "}
              {back}
            </Link>{" "}
            <h2 className="text-[#717171] mx-1">{current}</h2>
          </div>
          <div></div>
        </div>
        <div className="mt-10 flex flex-col gap-6 rounded-lg">
          <Image
            src="/images/decor1.png"
            alt=""
            width={160}
            height={160}
            className="rounded-t-lg rounded-r-none"
          />

          <div className="flex flex-col gap-6 px-7">
            <div className="flex justify-between items-center">
              <h2 className="text-[#262626] mb-2 font-semibold">
                Event Information
              </h2>
              <Dialog
                open={openCreateEventModal}
                onOpenChange={setOpenCreateEventModal}
              >
                <DialogTrigger>
                  <button className=" flex justify-center cursor-pointer items-center gap-2 px-7 py-3  rounded-lg bg-[#202C5E] text-white text-sm">
                    <Pen className="w-4 h-4" /> Edit
                  </button>
                </DialogTrigger>
                <DialogContent className=" w-full border-t-9 border-t-[#202C5E]">
                  <DialogHeader>
                    <DialogTitle>Edit Event Information</DialogTitle>
                  </DialogHeader>
                  <div>
                    <form action="" className=" text-sm ">
                      <div className="py-1">
                        <label
                          htmlFor=""
                          className="text-[#262626] text-sm font-semibold"
                        >
                          Event Title
                        </label>
                        <input
                          type="text"
                          placeholder="Event Title"
                          className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                        />
                      </div>
                      <div className="py-1">
                        <label
                          htmlFor=""
                          className="text-[#262626] text-sm font-semibold"
                        >
                          Event Description
                        </label>
                        <input
                          type="text"
                          placeholder="Event Description"
                          className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                        />
                      </div>
                      <div className="flex gap-5 py-1">
                        <div>
                          <label
                            htmlFor=""
                            className="text-[#262626] text-sm font-semibold"
                          >
                            Event Date
                          </label>
                          <input
                            type="date"
                            placeholder="Event Date"
                            className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="text-[#262626] text-sm font-semibold"
                          >
                            Event Time
                          </label>
                          <input
                            type="time"
                            placeholder="Event Time"
                            className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                          />
                        </div>
                      </div>
                      <div className="py-1">
                        <label
                          htmlFor=""
                          className="text-[#262626] text-sm font-semibold"
                        >
                          Event Status
                        </label>
                        <select
                          name=""
                          id=""
                          className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                        >
                          <option value="">Select Status</option>
                          <option value="">Active</option>
                          <option value="">Inactive</option>
                        </select>
                      </div>
                      <div className="relative mt-4 py-1">
                        <label
                          htmlFor="notifyUsers"
                          className="text-[#262626] text-sm font-semibold block"
                        >
                          Notify All Users Via Email
                        </label>
                        <div
                          className="min-h-[44px] w-full bg-[#FAFAFA] border border-gray-200 rounded-lg flex flex-wrap gap-2 p-2 cursor-text transition-all"
                          onClick={() => setShowUserDropdown(true)}
                        >
                          {selectedUsers.map((user) => (
                            <span
                              key={user}
                              className="bg-[#202C5E] text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 animate-in fade-in zoom-in duration-200"
                            >
                              {user}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUsers(
                                    selectedUsers.filter((u) => u !== user),
                                  );
                                }}
                                className="hover:text-gray-400 border rounded-full p-[0.5] transition-colors"
                              >
                                <X size={10} />
                              </button>
                            </span>
                          ))}
                          <input
                            type="text"
                            className="bg-transparent outline-none flex-1 min-w-[80px] text-sm "
                            placeholder={
                              selectedUsers.length === 0
                                ? "Select users to notify"
                                : ""
                            }
                            value={userSearch}
                            onChange={(e) => {
                              setUserSearch(e.target.value);
                              setShowUserDropdown(true);
                            }}
                            onFocus={() => setShowUserDropdown(true)}
                          />
                        </div>

                        {showUserDropdown && filteredUsers.length > 0 && (
                          <>
                            <div
                              className="fixed inset-0 z-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUserDropdown(false);
                              }}
                            />
                            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                              {filteredUsers.map((user) => (
                                <div
                                  key={user}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedUsers([...selectedUsers, user]);
                                    setUserSearch("");
                                    setShowUserDropdown(false);
                                  }}
                                >
                                  {user}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        <label htmlFor="">Event Location</label>
                        <input
                          type="text"
                          placeholder="Event Location"
                          className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Attach File</label>
                        <input
                          type="file"
                          className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                        />
                      </div>
                    </form>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="cursor-pointer">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="bg-[#202C5E] text-white cursor-pointer"
                      onClick={handleEditEvent}
                    >
                      Edit Event
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <p className="text-[#525252] text-sm mb-2">Event Title</p>
              <p className="text-[#262626] text-sm font-semibold">
                Pastor’s Conference
              </p>
            </div>
            <div>
              <p className="text-[#525252] text-sm mb-2">User Role</p>

              <p className="text-[#262626] text-sm font-semibold">Admin</p>
            </div>
            <div>
              <p className="text-[#525252] text-sm mb-2">Event Description</p>
              <p className="text-[#262626] text-sm font-semibold">
                We often seek instant growth, but spiritual maturity requires
                steadfast endurance. This week, Pastor Jane explores the
                metaphor of the vine and branches, teaching us how to remain
                rooted in Christ so that our labor—even when unseen—will
                eventually yield the lasting fruit of the Spirit. Learn how to
                fight burnout and embrace the quiet, persistent work of faith.
              </p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-[#525252] text-sm mb-2">
                  Event Date {"&"} Time
                </p>

                <p className="text-[#262626] text-sm font-semibold">
                  09 Nov, 2025 12 : 00 PM
                </p>
              </div>
              <div>
                <p className="text-[#525252] text-sm mb-2">Event Location</p>

                <p className="text-[#262626] text-sm font-semibold">
                  Lagos, Nigeria
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#525252] text-sm mb-2">RSVP</p>
              <div className="flex justify-left pl-3 items-center">
                {event.rsvp.map((i) => (
                  <div key={i} className="rounded-full -ml-4">
                    <Image
                      src={i}
                      width={50}
                      height={50}
                      alt="ravp image"
                      className="rounded-full"
                    />
                  </div>
                ))}

                <div className="flex justify-center items-center text-xs rounded-full text-white -ml-4 p-1 w-12 h-12 bg-[#334797]">
                  + 12
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#525252] text-sm mb-2">Event Status</p>
              <div
                className={`w-[15%] px-2 py-3 text-center rounded-lg ${event.status === "Approved" && "bg-[#F5FEF8] border border-[#149242] text-[#149242]"} ${event.status === "Pending" && "bg-[#FEE2E2] border border-[#991B1B] text-[#991B1B]"} ${event.status === "Approved" && "bg-[#BCBFCE33] border border-[#4C567E] text-[#4C567E]"}`}
              >
                {event.status}
              </div>
            </div>
            <div>
              <p className="text-[#525252] text-sm mb-2">File attached</p>
              <div className="flex justify-left items-center">
                {event.image.map((i) => (
                  <div
                    key={i}
                    className="relative flex justify-center items-center hover:z-10"
                  >
                    <Image
                      src={i}
                      width={200}
                      height={200}
                      alt="event image"
                      className=" hover:-z-20 rounded-lg mx-2"
                    />
                    <div className="absolute top-13 right-22 -z-20 hover:z-10 cursor-pointer flex justify-center items-center text-xs rounded-full text-white p-1 w-9 h-9 bg-[#991B1B]">
                      <Trash className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
