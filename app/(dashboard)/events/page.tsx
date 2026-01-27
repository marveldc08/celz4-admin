"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Filter,
  MapPin,
  PlusCircle,
  Search,
  UploadCloud,
  Eye,
  MoreHorizontal,
  Pen,
  Square,
  Trash,
  Share,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";

import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Label } from "@radix-ui/react-dropdown-menu";

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
    image: "/images/profile.png",
  }));

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

  const handleCreateEvent = () => {
    setOpenCreateEventModal(false);
    toast.success("Event created successfully");
  };
  return (
    <div className="flex min-h-screen px-7 py-10 w-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center">
            <Link href={"/dashboard"} className="font-semibold">
              Dashboard{" "}
            </Link>{" "}
            <h2 className="text-[#717171]">{path}</h2>
          </div>
          <button className=" flex justify-center cursor-pointer items-center gap-2 px-7 py-3 border-[#F5F5F5] rounded-lg bg-[#FAFAFA] text-sm border ">
            <UploadCloud className="w-4 h-4" /> Export as CSV
          </button>
        </div>
        <div className="w-full flex justify-end items-center my-6">
          <div className="flex gap-5 items-center">
            <button
              onClick={() => setOpenCreateEventModal(true)}
              className="flex justify-center cursor-pointer items-center gap-2 px-7 py-3 border border-[#F5F5F5] rounded-lg bg-[#202C5E] text-white text-sm"
            >
              {" "}
              <PlusCircle className="w-4 h-4" /> Create Event{" "}
            </button>
            <button className=" flex justify-center cursor-pointer items-center gap-2 px-7 py-3  rounded-lg bg-[#FAFAFA] text-sm border border-gray-200 ">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
        <div className="grid grid-cols-12 items-center w-full gap-6">
          <div className="col-span-4">
            <label htmlFor="" className="text-[#262626] text-sm font-semibold">
              Event Title
            </label>
            <div className="relative bg-[#FAFAFA] rounded-lg border border-gray-200 ">
              <Search className="w-4 h-4 absolute top-3 left-2" />
              <input
                type="text"
                className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-4">
            <label htmlFor="" className="text-[#262626] text-sm font-semibold">
              Event Date
            </label>
            <div className="relative bg-[#FAFAFA] rounded-lg ">
              <Calendar className="w-4 h-4 absolute top-3 left-2" />
              <input
                type="text"
                className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-gray-200 "
              />
            </div>
          </div>
          <div className="col-span-4">
            <label htmlFor="" className="text-[#262626] text-sm font-semibold">
              Event Location
            </label>
            <div className="relative bg-[#FAFAFA] rounded-lg border border-gray-200 ">
              <MapPin className="w-4 h-4 absolute top-3 left-2" />
              <input
                type="text"
                className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg "
              />
            </div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] mt-10 rounded-lg">
          <EventsTable
            data={events}
            setOpenCreateEventModal={setOpenCreateEventModal}
          />
        </div>
      </div>

      <Dialog
        open={openCreateEventModal}
        onOpenChange={setOpenCreateEventModal}
      >
        <DialogContent className=" w-full border-t-9 border-t-[#202C5E]">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
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
                      selectedUsers.length === 0 ? "Select users to notify" : ""
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
              onClick={handleCreateEvent}
            >
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;

type Event = {
  title: string;
  description: string;
  date: string;
  location: string;
  status: string;
  rsvp: string[];
  image: string;
};

type Props = {
  data: Event[];
  setOpenCreateEventModal: (open: boolean) => void;
};

export function EventsTable({ data, setOpenCreateEventModal }: Props) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dtInstance = useRef<DataTables.Api | null>(null);

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 1,
  });

  useEffect(() => {
    if (!tableRef.current) return;

    const table = $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 5,
      lengthChange: false,

      // 🔥 Hide default DataTables UI
      dom: "t",

      destroy: true,
    });

    dtInstance.current = table;

    const updatePageInfo = () => {
      const info = table.page.info();
      setPageInfo({
        page: info.page + 1,
        pages: info.pages,
      });
    };

    updatePageInfo();
    table.on("draw", updatePageInfo);

    return () => {
      table.destroy();
    };
  }, [data]);

  const nextPage = () => dtInstance.current?.page("next").draw("page");
  const prevPage = () => dtInstance.current?.page("previous").draw("page");

  const [openDeleteEventModal, setOpenDeleteEventModal] = useState(false);

  return (
    <CardContent className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">All Events</h3>
        <div className="flex justify-center items-center gap-1">
          <div className="relative bg-[#F5F5F5] rounded-lg px-3 border border-gray-100">
            <Search className={"absolute top-4 left-2 w-4 h-4"} />
            <input
              type="text"
              placeholder="Search Event"
              className="w-full px-4 py-3 border-none outline-none"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md cursor-pointer hover:bg-gray-100 border-none">
                <MoreHorizontal size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 border border-gray-100 bg-white p-4"
            >
              <DropdownMenuItem asChild className="hover:bg-gray-100 my-2 ">
                <Link
                  href={`/users/user-detail?id=`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  Last 30 Days
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gray-100 my-2">
                <Link
                  href={`/users/user-detail?id=`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  This Month
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gray-100 my-2">
                <Link
                  href={`/users/user-detail?id=`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  Last month
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <table
        ref={tableRef}
        className="dataTable w-full text-sm border-collapse"
      >
        <thead className="text-muted-foreground rounded-lg px-3 py-5 border border-[#F5F5F5] bg-[#FAFAFA]">
          <tr>
            <th className="py-2">Event Title </th>
            <th>Event Description</th>
            <th>Event Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>RSVP</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((event, index) => (
            <tr
              key={index}
              className="border-b border-b-gray-200 last:border-0"
            >
              <td className="py-3">{event.title}</td>
              <td>{event.description}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td className=" pr-4">
                <div
                  className={`py-1 px-2 text-center rounded-lg ${event.status === "Approved" && "bg-[#F5FEF8] border border-[#149242] text-[#149242]"} ${event.status === "Pending" && "bg-[#FEE2E2] border border-[#991B1B] text-[#991B1B]"} ${event.status === "Approved" && "bg-[#BCBFCE33] border border-[#4C567E] text-[#4C567E]"}`}
                >
                  {event.status}
                </div>
              </td>
              <td className="py-3">
                <div className="flex justify-center items-center">
                  {event.rsvp.map((i) => (
                    <div key={i} className="rounded-full -ml-4">
                      <Image
                        src={i}
                        width={30}
                        height={30}
                        alt="ravp image"
                        className="rounded-full"
                      />
                    </div>
                  ))}

                  <div className="flex justify-center items-center text-xs rounded-full text-white -ml-4 p-1 w-9 h-9 bg-[#334797]">
                    + 12
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <Image
                    src={event.image}
                    width={50}
                    height={50}
                    alt="event image"
                    className="rounded-lg"
                  />
                </div>
              </td>
              <td className="px-3 py-2 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-md cursor-pointer hover:bg-gray-100 border-none">
                      <MoreHorizontal size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 border border-gray-100 bg-white p-4"
                  >
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-gray-100 my-2 "
                    >
                      <Link
                        href={`/events/details`}
                        className="flex justify-between items-center gap-2 cursor-pointer"
                      >
                        Select <Square size={14} />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-gray-100 my-2 "
                    >
                      <Link
                        href={`#`}
                        className="flex justify-between items-center gap-2 cursor-pointer"
                        onClick={() => setOpenCreateEventModal(true)}
                      >
                        Edit <Pen size={14} />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-gray-100 my-2 "
                    >
                      <Link
                        href={`/events/details`}
                        className="flex justify-between items-center gap-2 cursor-pointer"
                      >
                        View <Eye size={14} />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-gray-100 my-2 "
                    >
                      <Link
                        href={`#`}
                        className="flex justify-between items-center gap-2 cursor-pointer"
                        onClick={() => setOpenDeleteEventModal(true)}
                      >
                        Delete <Trash size={14} />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-gray-100 my-2 "
                    >
                      <Link
                        href={`/events/details`}
                        className="flex justify-between items-center gap-2 cursor-pointer"
                      >
                        Share <Share size={14} />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
        <Dialog
          open={openDeleteEventModal}
          onOpenChange={setOpenDeleteEventModal}
        >
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Event?</DialogTitle>
                <DialogDescription className="py-5">
                  Are you sure you want to delete this event?. This action will
                  delete this particular event and can’t be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    No, don&apos;t
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-[#202C5E] text-white cursor-pointer"
                  onClick={() => (
                    setOpenDeleteEventModal(false),
                    toast.success("Event deleted successfully")
                  )}
                >
                  Yes, Delete Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </table>

      {/* ✅ Tailwind Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground">
          Page {pageInfo.page} of {pageInfo.pages}
        </span>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={prevPage}
            className="cursor-pointer"
            disabled={pageInfo.page === 1}
          >
            {"<"} Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={nextPage}
            className="cursor-pointer"
            disabled={pageInfo.page === pageInfo.pages}
          >
            Next {">"}
          </Button>
        </div>
      </div>
    </CardContent>
  );
}
