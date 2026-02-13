"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronUp,
  Copy,
  Eye,
  MoreHorizontal,
  Pen,
  PlusCircle,
  Search,
  Shield,
  Trash,
  UploadCloud,
  Users,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "react-toastify";
import $ from "jquery";
import "datatables.net-dt";

type EventStreamData = {
  id: number;
  title: string;
  organizer: string;
  engagement: string;
  lastStarts: string;
  streamEnded: string;
  status: "Live" | "Go Live" | "Draft";
  performanceStat: string;
  image: string;
};

const mockEventStreams: EventStreamData[] = [
  {
    id: 1,
    title: "Sunday Service - Divine Grace",
    organizer: "Zonal Event",
    engagement: "1.2k Prayer Requests",
    lastStarts: "Nov 20, 2023 - 08:00 AM",
    streamEnded: "Nov 20, 2023 - 10:30 AM",
    status: "Go Live",
    performanceStat: "600 | Plays: 3000 | AVG :32m",
    image: "/images/friends-group3.jpg",
  },
  {
    id: 2,
    title: "Midweek Fellowship",
    organizer: "Group 1",
    engagement: "850 Prayer Requests",
    lastStarts: "Dec 05, 2023 - 06:00 PM",
    streamEnded: "Dec 05, 2023 - 08:00 PM",
    status: "Draft",
    performanceStat: "0 | Plays: 0 | AVG :0",
    image: "/images/friends-group2.jpg",
  },
  {
    id: 3,
    title: "Youth Conference 2023",
    organizer: "Group 2",
    engagement: "5.5k Prayer Requests",
    lastStarts: "Dec 15, 2023 - 09:00 AM",
    streamEnded: "Dec 17, 2023 - 04:00 PM",
    status: "Live",
    performanceStat: "0 | Plays: 0 | AVG :0",
    image: "/images/friends-group.jpg",
  },
  {
    id: 4,
    title: "Night of Wonders",
    organizer: "Zonal Event",
    engagement: "12 Prayer Requests",
    lastStarts: "Dec 31, 2023 - 10:00 PM",
    streamEnded: "Jan 01, 2024 - 04:00 AM",
    status: "Draft",
    performanceStat: "600 | Plays: 3000 | AVG :32m",
    image: "/images/friends-group2.jpg",
  },
];

const cards = [
  { title: "Total Streams", value: "1500", color: "bg-[#1e2b5b] text-white" },
  { title: "Top Viewers", value: "150", color: "bg-[#FECACA7D]" },
  { title: "Average Watch Time", value: "50m 40s", color: "bg-[#F5FEF8]" },
  { title: "Total Engagement", value: "1.2k", color: "bg-[#fff7e6]" },
];

const Page = () => {
  const path = usePathname();
  const router = useRouter();
  const [openCreateLink, setOpenCreateLink] = useState(false);

  return (
    <div className="flex min-h-screen px-7 py-10 w-full bg-white">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full mb-8">
          <div className="flex items-center">
            <Link href={"/dashboard"} className="font-semibold text-gray-900">
              Dashboard
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <h2 className="text-[#717171] capitalize">
              {path.split("/").pop()}
            </h2>
          </div>

          <div className="flex gap-4 items-center">
            <button className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 rounded-lg bg-[#FAFAFA] text-xs text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all">
              <UploadCloud className="w-4 h-4" /> Export as CSV
            </button>
            <button
              onClick={() => setOpenCreateLink(true)}
              className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 border border-[#F5F5F5] rounded-lg bg-[#202C5E] text-white text-xs font-medium transition-all hover:bg-[#1a244d]"
            >
              <PlusCircle className="w-4 h-4" /> Create Stream Link
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#ffffff] rounded-xl overflow-hidden min-h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
            {cards.map((card) => (
              <Card
                key={card.title}
                className={` ${card.title === "Total Streams" ? "bg-[url('/images/geometric_pattern.png')] text-white" : "text-gray-900"} relative overflow-hidden bg-cover bg-no-repeat ${card.color === "bg-white" ? "border-dashed border-gray-200" : "border-none shadow-md"}`}
              >
                {card.title === "Total Streams" && (
                  <div className="absolute inset-0 bg-[#1e2b5b]/90" />
                )}
                <CardContent className="p-6 space-y-4 relative z-10">
                  <div className="w-full flex justify-between items-center">
                    <p
                      className={`text-sm ${card.title === "Total Streams" ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {card.title}
                    </p>
                    <div
                      className={`flex justify-center items-center rounded-full w-10 h-10 border border-dashed ${
                        card.title === "Total Streams"
                          ? "border-white/30 bg-white text-[#262626]"
                          : `border-gray-300 ${card.color} text-[#262626]`
                      }`}
                    >
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">{card.value}</h2>
                  {/* <div className="pt-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex justify-center items-center w-6 h-6 rounded-full ${
                          card.title === "Total Streams"
                            ? "bg-white/20 text-white"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-xs ${card.title === "Total Streams" ? "text-gray-300" : "text-gray-500"}`}
                      >
                        +40% Than last week
                      </span>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            ))}
          </div>
          <LiveStreamTable
            data={mockEventStreams}
            onViewAnalytics={(id) => router.push(`/live-stream/${id}`)}
          />
        </div>
      </div>

      <Dialog open={openCreateLink} onOpenChange={setOpenCreateLink}>
        <DialogContent className="sm:max-w-[500px] border border-gray-200 bg-white rounded-2xl p-6 shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Create Stream Link
            </DialogTitle>
            <DialogDescription className="py-2 text-gray-500">
              Generate a new live stream link for your event.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Stream Title
              </label>
              <input
                type="text"
                placeholder="Enter stream title"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#334797]/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Organizer
              </label>
              <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#334797]/20">
                <option>Pastor Adeboye</option>
                <option>Pastor Chris</option>
                <option>Media Team</option>
              </select>
            </div>
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1 bg-[#202C5E] text-white hover:bg-[#1a244d] rounded-lg transition-all cursor-pointer"
              onClick={() => {
                setOpenCreateLink(false);
                toast.success("Stream link created successfully");
              }}
            >
              Create Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;

export function LiveStreamTable({
  data,
  onViewAnalytics,
}: {
  data: EventStreamData[];
  onViewAnalytics: (id: number) => void;
}) {
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
      pageLength: 7,
      lengthChange: false,
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

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleFilter = (columnIndex: number, value: string) => {
    if (value === "All") {
      dtInstance.current?.column(columnIndex).search("").draw();
    } else {
      dtInstance.current?.column(columnIndex).search(value).draw();
    }
  };

  return (
    <CardContent className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-md text-gray-900 border-l-4 border-[#334797] pl-3">
          Event Live Streams
        </h3>
        <div className="flex items-center gap-3">
          {/* Date Range Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nov 20 - Dec 31, 2023"
              className="pl-4 pr-4 py-2 bg-[#FAFAFA] border border-[#F5F5F5] rounded-lg text-sm outline-none transition-all cursor-pointer min-w-[200px]"
            />
          </div>

          {/* Organizer Filter */}
          <div className="relative">
            <Shield
              className="absolute left-3 top-1 translate-y-1/2 text-[#262626]"
              size={16}
            />
            <select
              onChange={(e) => handleFilter(1, e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#FAFAFA] border border-[#F5F5F5] rounded-lg text-sm outline-none transition-all cursor-pointer appearance-none min-w-[160px]"
            >
              <option value="All">Filter by Organizer</option>
              <option value="Pastor Adeboye">Zonal Event</option>
              <option value="Pastor Chris">Group 1</option>
              <option value="Media Team">Group 2</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1 translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              onChange={(e) =>
                dtInstance.current?.search(e.target.value).draw()
              }
              placeholder="Search Stream"
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="dataTable w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-y border-[#F5F5F5]">
              <th className="py-4 px-4 text-left font-semibold text-gray-600 first:rounded-l-lg last:rounded-r-lg">
                Stream Title
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Organizer
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Engagement
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Last starts
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Stream Ended
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Status
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Performance Stat
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Image
              </th>
              <th className="py-4 px-4 text-right font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((stream, index) => (
              <tr
                key={index}
                className="group text-sm border-b border-gray-100 hover:bg-gray-100 transition-all"
              >
                <td className="py-4 px-4">
                  <p className="text-gray-900">{stream.title}</p>
                </td>
                <td className="py-4 px-2 text-gray-600">{stream.organizer}</td>
                <td className="py-4 px-4 text-gray-600 font-medium">
                  {stream.engagement}
                </td>
                <td className="py-4 px-4 text-gray-600">{stream.lastStarts}</td>
                <td className="py-4 px-4 text-gray-600">
                  {stream.streamEnded}
                </td>
                <td className="py-4 px-2">
                  <span
                    className={`inline-flex justify-center items-center w-15 px-2 py-1.5 rounded-lg text-xs  font-medium border 
                        ${stream.status === "Live" && "bg-emerald-50 text-emerald-700 border-emerald-200"}
                        ${stream.status === "Draft" && "bg-[#BCBFCE33] text-[#4C567E] border-[#4C567E]"} 
                        ${stream.status === "Go Live" && "bg-rose-50 text-rose-700 border-rose-200"}`}
                  >
                    {stream.status}
                  </span>
                </td>
                <td className="py-4 px-4">{stream.performanceStat}</td>
                <td className="py-4 px-4">
                  <div className="h-15 w-15 flex items-center justify-center bg-gray-100 rounded">
                    <Image
                      src={stream.image}
                      height={200}
                      width={200}
                      alt="stream image"
                      className="rounded-lg"
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md transition-all outline-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreHorizontal size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-white border border-gray-100 p-2 shadow-xl rounded-xl z-50"
                    >
                      <DropdownMenuItem className="flex items-center justify-between px-3 py-3 rounded-lg text-sm text-[#262626] hover:bg-gray-100 hover:text-gray-900 outline-0 transition-all cursor-pointer">
                        Select{" "}
                        {/* <Eye size={18} className="opacity-60 text-[#262626]" /> */}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center justify-between px-3 py-3 rounded-lg text-sm text-[#262626] hover:bg-gray-100 hover:text-gray-900 outline-0 transition-all cursor-pointer"
                        onClick={() => onViewAnalytics(stream.id)}
                      >
                        View Analytics{" "}
                        <Eye size={18} className="opacity-60 text-[#262626]" />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenDeleteModal(true)}
                        className="flex items-center justify-between px-3 py-3 rounded-lg  hover:bg-gray-100 text-sm text-[#262626] transition-all cursor-pointer outline-0"
                      >
                        Edit Information{" "}
                        <Pen size={18} className="opacity-60 text-[#262626]" />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenDeleteModal(true)}
                        className="flex items-center justify-between px-3 py-3 rounded-lg  hover:bg-gray-100 text-sm text-[#262626] transition-all cursor-pointer outline-0"
                      >
                        Copy Stream Link{" "}
                        <Copy size={18} className="opacity-60 text-[#262626]" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="sm:max-w-[400px] border-t-4 border-t-rose-500 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Delete Stream?
            </DialogTitle>
            <DialogDescription className="py-4 text-gray-500">
              Are you sure you want to delete this stream? This action will
              remove all associated data and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-3 sm:gap-0">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1 sm:flex-none bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-all cursor-pointer"
              onClick={() => {
                setOpenDeleteModal(false);
                toast.success("Stream deleted successfully");
              }}
            >
              Delete Stream
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500 font-medium">
          Showing {pageInfo.page} of {pageInfo.pages} pages
        </span>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={prevPage}
            className="px-4 py-2 border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all rounded-lg cursor-pointer"
            disabled={pageInfo.page === 1}
          >
            Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={nextPage}
            className="px-4 py-2 border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all rounded-lg cursor-pointer"
            disabled={pageInfo.page === pageInfo.pages}
          >
            Next
          </Button>
        </div>
      </div>
    </CardContent>
  );
}
