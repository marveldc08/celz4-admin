"use client";
import {
  PlusCircle,
  Filter,
  UploadCloud,
  Eye,
  MoreHorizontal,
  Pen,
  Search,
  Trash,
  Users,
  Shield,
  Key,
  UserCircle,
  FileText,
  Square,
  Link2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import Image from "next/image";
import $ from "jquery";
import "datatables.net-dt";

const Page = () => {
  const path = usePathname();
  const [activeTab, setActiveTab] = useState("All Users");
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const tabs = [
    { name: "All Users", icon: <Users size={18} /> },
    { name: "Roles", icon: <Shield size={18} /> },
    { name: "Permissions", icon: <Key size={18} /> },
    { name: "Accounts", icon: <UserCircle size={18} /> },
    { name: "Logs", icon: <FileText size={18} /> },
  ];

  const userData: User[] = Array.from({ length: 10 }).map((_, i) => ({
    name: "John Doe",
    email: "johndoe@example.com",
    role: i % 2 === 0 ? "Admin" : "Editor",
    joinedDate: "12 Jan, 2024",
    lastLogin: "28 Jan, 2024",
    status: i % 3 === 0 ? "Active" : "Inactive",
    image: "/images/profile.png",
  }));

  return (
    <div className="flex min-h-screen px-7 py-10 w-full bg-white">
      <div className="flex flex-col w-full">
        {/* Breadcrumb & Actions */}
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
            <button
              onClick={() => setOpenCreateUserModal(true)}
              className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 border border-[#F5F5F5] rounded-lg bg-[#202C5E] text-white text-xs font-medium transition-all hover:bg-[#1a244d]"
            >
              <PlusCircle className="w-4 h-4" /> Add New User
            </button>
            <button className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 rounded-lg bg-[#FAFAFA] text-xs text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all">
              <UploadCloud className="w-4 h-4" /> Export as CSV
            </button>
          </div>
        </div>

        {/* Content Area with Vertical Tabs */}
        <div className="flex gap-8 w-full">
          {/* Vertical Tabs Sidebar */}
          <div className="w-64 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab.name
                    ? "bg-[#334797] text-white shadow-md"
                    : "bg-[#FAFAFA] text-[#262626] hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* Main Content (Table) */}
          <div className="flex-1 bg-[#FAFAFA] rounded-xl overflow-hidden min-h-[600px]">
            {activeTab === "All Users" ? (
              <UsersTable data={userData} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="p-4 bg-white rounded-full mb-4 shadow-sm text-[#334797]">
                  {tabs.find((t) => t.name === activeTab)?.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {activeTab} content
                </h3>
                <p>This section is currently under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create User Dialog */}
      <Dialog open={openCreateUserModal} onOpenChange={setOpenCreateUserModal}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl p-0 border-0">
          <DialogHeader className="bg-[#FAFAFA] p-4 rounded-t-2xl">
            <DialogTitle className="text-xl font-bold">
              Create New User
            </DialogTitle>
          </DialogHeader>
          <div className="px-8 space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium my-2">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                placeholder="jane@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium my-2"> Assign Role</label>
              <select
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="media">Media Team</option>
                <option value="pastor">Pastor</option>
                <option value="finance">Finance </option>
                <option value="support">Support</option>
                <option value="security">Security</option>
                <option>Usher</option>
              </select>
            </div>
          </div>
          <DialogFooter className="bg-[#FAFAFA] p-4 rounded-b-2xl">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-lg cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-[#202C5E] text-white hover:bg-[#2a3a7a] rounded-lg cursor-pointer"
              disabled={email === "" || role === ""}
              onClick={() => {
                setOpenCreateUserModal(false);
                toast.success("User created successfully");
              }}
            >
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;

type User = {
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  lastLogin: string;
  status: string;
  image: string;
};

type Props = {
  data: User[];
};

export function UsersTable({ data }: Props) {
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

  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);

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
        <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-[#334797] pl-3">
          All Users
        </h3>
        <div className="flex items-center gap-3">
          {/* Role Filter */}
          <div className="relative">
            <Shield
              className="absolute left-3 top-1 translate-y-1/2 text-[#262626]"
              size={16}
            />
            <select
              onChange={(e) => handleFilter(1, e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#FAFAFA] border border-[#F5F5F5] rounded-lg text-sm outline-none transition-all cursor-pointer appearance-none min-w-[140px]"
            >
              <option value="All" className="m-4">
                All Roles
              </option>
              <option value="Admin" className="m-4">
                Admin
              </option>
              <option value="Media Team" className="m-4">
                Media Team
              </option>
              <option value="Pastor" className="m-4">
                Pastor
              </option>
              <option value="Support" className="m-4">
                Support
              </option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1 translate-y-1/2 text-[#262626]"
              size={16}
            />
            <select
              onChange={(e) => handleFilter(4, e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#FAFAFA] border border-[#F5F5F5] rounded-lg text-sm outline-none transition-all cursor-pointer appearance-none min-w-[140px]"
            >
              <option value="All" className="m-4">
                All Status
              </option>
              <option value="Active" className="m-4">
                Active
              </option>
              <option value="Inactive" className="m-4">
                Inactive
              </option>
              <option value="Blocked" className="m-4">
                Blocked
              </option>
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
              placeholder="Search User"
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="dataTable w-full text-sm">
          <thead>
            <tr className="bg-white border-y border-gray-100">
              <th className="py-4 px-4 text-left font-semibold text-gray-600 first:rounded-l-lg last:rounded-r-lg">
                User
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Role
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Joined date
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Last login
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Status
              </th>
              <th className="py-4 px-4 text-right font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, index) => (
              <tr
                key={index}
                className="group border-b border-gray-100 hover:bg-white/50 transition-all"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex items-center">
                      {/* <Image
                        src={user.image}
                        fill
                        alt={user.name}
                        className="rounded-full object-cover"
                      /> */}
                      <Square className="text-[#404040] w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">
                  <div className="rounded-lg text-[#404040] bg-[#F5F5F5] border border-[#E5E5E5] text-center px-3 py-1">
                    {user.role}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">{user.joinedDate}</td>
                <td className="py-4 px-4 text-gray-600">{user.lastLogin}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md transition-all hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreHorizontal size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-white border border-gray-100 p-2 shadow-xl rounded-xl z-50"
                    >
                      <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#262626] hover:bg-[#F5F5F5] hover:text-gray-900 transition-all cursor-pointer">
                        Select{" "}
                        <Square
                          size={14}
                          className="opacity-60 text-[#262626]"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#262626] hover:bg-[#F5F5F5] hover:text-gray-900 transition-all cursor-pointer">
                        View Details{" "}
                        <Eye size={14} className="opacity-60 text-[#262626]" />
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setOpenDeleteUserModal(true)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg  hover:bg-[#F5F5F5] text-sm text-[#262626] transition-all cursor-pointer"
                      >
                        Delete{" "}
                        <Trash
                          size={14}
                          className="opacity-60 text-[#262626]"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenDeleteUserModal(true)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F5F5F5] text-sm text-[#262626] transition-all cursor-pointer"
                      >
                        Account Link{" "}
                        <Link2
                          size={14}
                          className="opacity-60 text-[#262626]"
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={openDeleteUserModal} onOpenChange={setOpenDeleteUserModal}>
        <DialogContent className="sm:max-w-[400px] border-t-4 border-t-rose-500 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Delete User?
            </DialogTitle>
            <DialogDescription className="py-4 text-gray-500">
              Are you sure you want to delete this user? This action will remove
              all associated data and cannot be undone.
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
                setOpenDeleteUserModal(false);
                toast.success("User deleted successfully");
              }}
            >
              Delete User
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
