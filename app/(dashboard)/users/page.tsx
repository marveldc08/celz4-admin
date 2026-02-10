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
  Calendar,
  CircleCheckBig,
  CircleAlert,
  Copy,
  X,
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
import Jumbo from "@/components/Jumbo";

type User = {
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  lastLogin: string;
  status: string;
  image: string;
};

type Log = {
  id: string;
  user: string;
  severity: "high" | "low";
  date: string;
  time: string;
  ipAddress: string;
  message: string;
};

type RoleData = {
  id: string;
  name: string;
  slug: string;
  permissions: string[];
};
type PermissionData = {
  id: string;
  slug: string;
  permission: string;
  dateCreated: string;
  description: string;
};

type UserProps = {
  data: User[];
};

const Page = () => {
  const path = usePathname();
  const [activeTab, setActiveTab] = useState("All Users");
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [openEditAccess, setOpenEditAccess] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [openAddPermission, setOpenAddPermission] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  };

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

  const mockLogs: Log[] = Array.from({ length: 15 }).map((_, i) => ({
    id: `LOG-00${i + 1}`,
    user: "Olamide bab",
    severity: i % 3 === 0 ? "high" : "low",
    date: "02 Feb, 2026",
    time: "12:00 PM",
    ipAddress: "192.168.1.1",
    message:
      i % 2 === 0
        ? "User logged in successfully"
        : "Failed login attempt detected",
  }));

  const mockRoles: RoleData[] = [
    {
      id: "1",
      name: "Admin",
      slug: "User-Admin",
      permissions: [
        "Create-User",
        "Delete-User",
        "Edit-User",
        "View-Logs",
        "Manage-Roles",
      ],
    },
    {
      id: "2",
      name: "Media Team",
      slug: "User-Media",
      permissions: ["Create-Media", "Edit-Media", "View-Media"],
    },
    {
      id: "3",
      name: "Pastor",
      slug: "User-Pastor",
      permissions: ["View-Reports", "Manage-Events", "View-Members"],
    },
    {
      id: "4",
      name: "Support",
      slug: "User-Support",
      permissions: ["Manage-Tickets", "View-Users"],
    },
    {
      id: "5",
      name: "Zone",
      slug: "User-Zone",
      permissions: ["Manage-Zone", "View-Zone-Members"],
    },
    {
      id: "6",
      name: "Member",
      slug: "User-Member",
      permissions: ["View-Events", "Edit-Profile"],
    },
  ];
  const mockPermissions: PermissionData[] = [
    {
      id: "1",
      slug: "User-Admin",
      permission: "Create-User",
      dateCreated: "09 Nov, 2025 20 :10:00 PM",
      description: "Permission to edit user details",
    },
    {
      id: "2",
      slug: "User-Admin",
      permission: "User-delete",
      dateCreated: "09 Nov, 2025 20 :10:00 PM",
      description: "Permission to edit user details",
    },
    {
      id: "3",
      slug: "User-Admin",
      permission: "User-add",
      dateCreated: "09 Nov, 2025 20 :10:00 PM",
      description: "Permission to edit user details",
    },
    {
      id: "4",
      slug: "User-Admin",
      permission: "User-Create",
      dateCreated: "09 Nov, 2025 20 :10:00 PM",
      description: "Permission to edit user details",
    },
    {
      id: "5",
      slug: "User-Admin",
      permission: "User-edit",
      dateCreated: "09 Nov, 2025 20 :10:00 PM",
      description: "Permission to edit user details",
    },
  ];

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
          {activeTab === "All Users" && (
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
          )}
          {activeTab === "Roles" && (
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setOpenAddRole(true)}
                className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 border border-[#F5F5F5] rounded-lg bg-[#202C5E] text-white text-xs font-medium transition-all hover:bg-[#1a244d]"
              >
                <PlusCircle className="w-4 h-4" /> Add Role
              </button>
            </div>
          )}
          {activeTab === "Permissions" && (
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setOpenAddPermission(true)}
                className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 border border-[#F5F5F5] rounded-lg bg-[#202C5E] text-white text-xs font-medium transition-all hover:bg-[#1a244d]"
              >
                <PlusCircle className="w-4 h-4" /> Add Permission
              </button>
            </div>
          )}
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
          <div className="flex-1 bg-[#ffffff] rounded-xl overflow-hidden min-h-[600px]">
            {activeTab === "All Users" && <UsersTable data={userData} />}
            {activeTab === "Accounts" && (
              <div>
                <Jumbo
                  hasButton={true}
                  openEditAccess={openEditAccess}
                  openDeleteUser={openDeleteUser}
                  setOpenEditAccess={setOpenEditAccess}
                  setOpenDeleteUser={setOpenDeleteUser}
                />
                <div className="flex flex-col justify-center items-start w-full mt-15">
                  <div className="flex flex-col text-start border-b border-b-gray-200 w-full mb-5 pb-1">
                    <h3 className="font-semibold text-[#262626]">Profile</h3>
                    <p className="text-[#525252] text-sm">User information</p>
                  </div>
                  <div className="flex flex-col text-start border-b border-b-gray-200 pb-4 w-full gap-5">
                    <div className="flex justify-start items-center gap-2  pb-2">
                      <p className="font-semibold">Full-name:</p>
                      <p className="text-[#525252] text-sm"> Olamide bab</p>
                    </div>
                    <div className="flex justify-start items-center gap-2 pb-2">
                      <p className="font-semibold">Email:</p>
                      <p className="text-[#525252] text-sm">
                        {" "}
                        Olamide jane@gmail.com{" "}
                      </p>
                      <div className="rounded-lg border border-[#F59E08] text-[#F59E08] text-sm bg-[#FEF3C7] p-2 text-center">
                        Pending Verification
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-2 pb-2">
                      <p className="font-semibold">Role:</p>
                      <p className="text-[#525252] text-sm">Admin</p>
                    </div>
                    <div className="flex justify-start items-center gap-2 pb-2">
                      <p className="font-semibold">Status:</p>
                      <p className="text-[#525252] flex justify-center items-center gap-2 text-sm">
                        {" "}
                        <span className="rounded-full bg-green-700 p-1 w-3 h-3"></span>{" "}
                        Active
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-2 pb-2">
                      <p className="font-semibold">Last Sign In:</p>
                      <p className="text-[#525252] text-sm">Newly Created</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-start w-full mt-5 pb-1">
                    <h3 className="font-semibold text-[#262626] pb-1">
                      Delete Account
                    </h3>
                    <p className="text-[#525252] pb-1 text-sm">
                      This action will permanently delete the user and all
                      related data. It cannot be undone.
                    </p>
                    <button
                      className="flex justify-center items-center rounded-lg text-white text-xs bg-[#EF4444] px-2 py-3 mt-2 gap-2 w-[20%] text-center cursor-pointer hover:bg-[#dc2626] transition-all"
                      onClick={() => setOpenDeleteUser(true)}
                    >
                      <Trash className="h-4 w-4" />
                      Delete User Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Logs" && (
              <div>
                <Jumbo
                  hasButton={false}
                  openEditAccess={false}
                  openDeleteUser={false}
                  setOpenEditAccess={setOpenEditAccess}
                  setOpenDeleteUser={setOpenDeleteUser}
                />
                <div className="flex flex-col justify-center items-start w-full mt-15">
                  <div className="flex flex-col text-start border-b border-b-gray-200 w-full mb-5 pb-1">
                    <h3 className="font-semibold text-[#262626]">
                      Activity logs
                    </h3>
                    <p className="text-[#525252] text-sm">
                      User logins and logout history
                    </p>
                  </div>
                  <div className="flex flex-col text-start py-4 w-full gap-5">
                    <div className="flex items-center justify-between gap-5">
                      <div className="w-[50%] rounded-lg bg-[#334797] p-2 flex items-center justify-between py-3 px-10">
                        <div>
                          <p className="text-white">Number of logins</p>
                          <p className="text-white text-2xl font-semibold flex items-center gap-2">
                            12{" "}
                            <span className="text-xs text-[#C3A253]">00%</span>
                          </p>
                        </div>
                        <div>
                          <Image
                            src="/images/chart.png"
                            alt="chart"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className="w-[50%] rounded-lg bg-linear-to-r from-[#FFFFFF] to-[#e3e6ef] border border-[#e6e8eb] py-3 px-10 flex items-center justify-between">
                        <div>
                          <p>Failed Attempts</p>
                          <p className="text-black text-2xl font-semibold">
                            30
                          </p>
                        </div>
                        <div>
                          <Image
                            src="/images/bars.png"
                            alt="chart"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative cursor-pointer flex justify-end items-center">
                      <Calendar className="absolute right-37 top-4 w-4 h-4" />
                      <select
                        name="month"
                        id="month"
                        className="flex justify-center items-center text-sm gap-2 px-9 py-3 outline-0 border cursor-pointer border-gray-200 rounded-lg bg-[#FAFAFA]"
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
                    <div className="w-full mt-10">
                      <LogsTable data={mockLogs} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Roles" && (
              <div className="w-full mb-4">
                <div className="flex justify-between items-center w-full mb-8 px-2">
                  <div className="flex items-center">
                    <h4 className="font-semibold text-gray-900">All Roles</h4>
                  </div>
                </div>
                <div className="w-full">
                  <RolesTable data={mockRoles} />
                </div>
              </div>
            )}
            {activeTab === "Permissions" && (
              <div className="w-full mb-4">
                <div className="flex justify-between items-center w-full mb-8 px-2">
                  <div className="flex items-center">
                    <h4 className="font-semibold text-gray-900">
                      All Permissions
                    </h4>
                  </div>
                </div>
                <div className="w-full">
                  <PermissionsTable data={mockPermissions} />
                </div>
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

      {/* Edit user asscess dialog */}
      <Dialog open={openEditAccess} onOpenChange={setOpenEditAccess}>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle>Edit User Access</DialogTitle>
          </DialogHeader>
          <div>
            <form action="" className=" text-sm my-4 px-3">
              <div className="py-2">
                <label
                  htmlFor=""
                  className="text-[#262626] text-sm font-semibold mb-2"
                >
                  Assign Role
                </label>
                <select
                  name=""
                  id=""
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="media">Media Team</option>
                  <option value="pastor">Pastor</option>
                  <option value="finance">Finance</option>
                  <option value="support">Support</option>
                  <option value="security">Security</option>
                  <option value="">Usher</option>
                </select>
              </div>
              <div className="py-2">
                <label
                  htmlFor=""
                  className="text-[#262626] text-sm font-semibold mb-2"
                >
                  Status
                </label>
                <select
                  name=""
                  id=""
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </form>
          </div>
          <DialogFooter className="border-t border-[#E5E5E5] p-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-[#202C5E] text-white cursor-pointer"
              onClick={() => (
                setOpenEditAccess(false),
                toast.success("User access updated successfully")
              )}
            >
              Update Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={openDeleteUser} onOpenChange={setOpenDeleteUser}>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="my-1 text-sm">
              Deleting user{" "}
              <span className="font-semibold text-[#262626]">
                Olamideo@gmail.com
              </span>{" "}
              will permanently remove the account and all related data. This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form action="" className=" text-sm my-1 px-3">
              <div className="py-2">
                <label
                  htmlFor=""
                  className="text-[#262626] text-sm font-semibold mb-2"
                >
                  Confirm the user&apos;s email address
                </label>
                <input
                  type="email"
                  placeholder="Olamideo@gmail.com"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 mt-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
            </form>
          </div>
          <DialogFooter className="border-t border-[#E5E5E5] p-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-[#EF4444] text-white cursor-pointer"
              onClick={() => setOpenDeleteUser(false)}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Role Dialog */}
      <Dialog open={openAddRole} onOpenChange={setOpenAddRole}>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle className="text-sm">Add Role</DialogTitle>
          </DialogHeader>
          <div>
            <form action="" className=" text-sm my-1 px-3">
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm  mb-2">
                  Role Name
                </label>
                <input
                  type="text"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="for example: User-media"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Permission
                </label>
                <div className="flex flex-wrap gap-2 bg-[#FAFAFA] w-full p-2 rounded-lg border border-[#E5E5E5] items-center">
                  {selectedPermissions.map((perm) => (
                    <span
                      key={perm}
                      className="flex items-center gap-1 px-3 py-1 bg-[#F5F5F5] text-[#525252] rounded-full text-xs font-medium"
                    >
                      {perm}
                      <button
                        type="button"
                        onClick={() => togglePermission(perm)}
                        className="cursor-pointer rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <select
                    name=""
                    id=""
                    value=""
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !selectedPermissions.includes(val)) {
                        togglePermission(val);
                      }
                    }}
                    className="flex-1 bg-transparent outline-none border-none text-sm min-w-[120px] cursor-pointer"
                  >
                    <option value="" disabled hidden className="text-sm">
                      {selectedPermissions.length > 0
                        ? " "
                        : "No Permission assigned by default"}
                    </option>
                    {!selectedPermissions.includes("User:create") && (
                      <option value="User:create">User:create</option>
                    )}
                    {!selectedPermissions.includes("User:delete") && (
                      <option value="User:delete">User:delete</option>
                    )}
                    {!selectedPermissions.includes("User:view") && (
                      <option value="User:view">User:view</option>
                    )}
                    {!selectedPermissions.includes("User:edit") && (
                      <option value="User:edit">User:edit</option>
                    )}
                  </select>
                </div>
              </div>
            </form>
          </div>
          <DialogFooter className="border-t border-[#E5E5E5] p-4 mt-10">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-[#202C5E] text-white cursor-pointer"
              onClick={() => (
                setOpenAddRole(false),
                toast.success("Role was created successfully")
              )}
            >
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Permission Dialog */}
      <Dialog open={openAddPermission} onOpenChange={setOpenAddPermission}>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle className="text-sm">Add Permission</DialogTitle>
          </DialogHeader>
          <div>
            <form action="" className=" text-sm my-1 px-3">
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm  mb-2">
                  Permission Name
                </label>
                <input
                  type="text"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="for example: User-media"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
                <p className="text-[#202C5E] font-semibold text-xs pt-2">
                  Slug for permission can’t be changed
                </p>
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Description
                </label>
                <textarea
                  placeholder="less than 15 words to describe this..."
                  className="bg-[#FAFAFA] w-full h-30 outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
            </form>
          </div>
          <DialogFooter className="border-t border-[#E5E5E5] p-4 mt-10">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-[#202C5E] text-white cursor-pointer"
              onClick={() => (
                setOpenAddPermission(false),
                toast.success("Permission was created successfully")
              )}
            >
              Create Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Page;

export function UsersTable({ data }: UserProps) {
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
            <tr className="bg-[#FAFAFA] border-y border-[#F5F5F5]">
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
                className="group border-b border-gray-100 hover:bg-gray-500/10 transition-all"
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

export function RolesTable({ data }: { data: RoleData[] }) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dtInstance = useRef<DataTables.Api | null>(null);
  const [openDeleteRoleModal, setOpenDeleteRoleModal] = useState(false);
  const [openEditRole, setOpenEditRole] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  };

  useEffect(() => {
    if (!tableRef.current) return;

    const table = $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,
      lengthChange: false,
      dom: "t",
      destroy: true,
    });

    dtInstance.current = table;

    return () => {
      table.destroy();
    };
  }, [data]);

  return (
    <div className="w-full bg-white py-6 border-t border-t-gray-100">
      <div className="flex justify-end mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            onChange={(e) => dtInstance.current?.search(e.target.value).draw()}
            placeholder="Search roles..."
            className="pl-10 pr-4 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#334797]/20 transition-all w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table ref={tableRef} className="dataTable w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-y border-[#F5F5F5]">
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Roles
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Slug
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Permission
              </th>
              <th className="py-4 px-4 text-right font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((role) => (
              <tr
                key={role.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-all text-xs"
              >
                <td className="py-4 px-4 text-[#262626] font-medium">
                  {role.name}
                </td>
                <td className="py-4 px-4 rounded-lg text-[#404040]">
                  <p className="p-2 rounded-lg text-[#404040] border border-[#E5E5E5] text-center">
                    {role.slug}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-2 max-w-[400px]">
                    {role.permissions.slice(0, 3).map((perm, idx) => (
                      <span
                        key={idx}
                        className="p-2 rounded-lg text-[#404040] bg-[#F5F5F5] border border-[#E5E5E5] text-center whitespace-nowrap"
                      >
                        {perm}
                      </span>
                    ))}

                    {role.permissions.length > 3 && (
                      <span className="p-2  text-[#262626] whitespace-nowrap text-center">
                        +{role.permissions.length - 3} More
                      </span>
                    )}
                  </div>
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
                      <DropdownMenuItem
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#262626] hover:bg-[#F5F5F5] hover:text-gray-900 transition-all cursor-pointer"
                        onClick={() => setOpenEditRole(true)}
                      >
                        Edit Role{" "}
                        <Pen size={14} className="opacity-60 text-[#262626]" />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#262626] hover:bg-[#f5f5f5] transition-all cursor-pointer"
                        onClick={() => setOpenDeleteRoleModal(true)}
                      >
                        Delete Role <Trash size={14} className="opacity-60" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={openDeleteRoleModal} onOpenChange={setOpenDeleteRoleModal}>
        <DialogContent className="sm:max-w-[400px] border-t-4 border-t-rose-500 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Delete Role?
            </DialogTitle>
            <DialogDescription className="py-4 text-gray-500">
              Are you sure you want to delete this role? This action will remove
              all associated data and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-3 sm:gap-0">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer mx-2"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1 sm:flex-none bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-all cursor-pointer mx-2"
              onClick={() => {
                setOpenDeleteRoleModal(false);
                toast.success("Role deleted successfully");
              }}
            >
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditRole} onOpenChange={setOpenEditRole}>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle className="text-sm">Edit Role</DialogTitle>
          </DialogHeader>
          <div>
            <form action="" className=" text-sm my-1 px-3">
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm  mb-2">
                  Role Name
                </label>
                <input
                  type="text"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="for example: User-media"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Permission
                </label>
                <div className="flex flex-wrap gap-2 bg-[#FAFAFA] w-full p-2 rounded-lg border border-[#E5E5E5] items-center">
                  {selectedPermissions.map((perm) => (
                    <span
                      key={perm}
                      className="flex items-center gap-1 px-3 py-1 bg-[#F5F5F5] text-[#525252] rounded-full text-xs font-medium"
                    >
                      {perm}
                      <button
                        type="button"
                        onClick={() => togglePermission(perm)}
                        className="cursor-pointer rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <select
                    name=""
                    id=""
                    value=""
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !selectedPermissions.includes(val)) {
                        togglePermission(val);
                      }
                    }}
                    className="flex-1 bg-transparent outline-none border-none text-sm min-w-[120px] cursor-pointer"
                  >
                    <option value="" disabled hidden className="text-sm">
                      {selectedPermissions.length > 0
                        ? " "
                        : "No Permission assigned by default"}
                    </option>
                    {!selectedPermissions.includes("User:create") && (
                      <option value="User:create">User:create</option>
                    )}
                    {!selectedPermissions.includes("User:delete") && (
                      <option value="User:delete">User:delete</option>
                    )}
                    {!selectedPermissions.includes("User:view") && (
                      <option value="User:view">User:view</option>
                    )}
                    {!selectedPermissions.includes("User:edit") && (
                      <option value="User:edit">User:edit</option>
                    )}
                  </select>
                </div>
              </div>
            </form>
          </div>
          <DialogFooter className="border-t border-[#E5E5E5] p-4 mt-10">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-[#202C5E] text-white cursor-pointer"
              onClick={() => (
                setOpenEditRole(false),
                toast.success("Role was updated successfully")
              )}
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function PermissionsTable({ data }: { data: PermissionData[] }) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dtInstance = useRef<DataTables.Api | null>(null);
  const [openDeletePermissionModal, setOpenDeletePermissionModal] =
    useState(false);
  const [openEditPermission, setOpenEditPermission] = useState(false);

  useEffect(() => {
    if (!tableRef.current) return;

    const table = $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,
      lengthChange: false,
      dom: "t",
      destroy: true,
    });

    dtInstance.current = table;

    return () => {
      table.destroy();
    };
  }, [data]);

  return (
    <div className="w-full bg-white py-6 border-t border-t-gray-100">
      <div className="flex justify-end mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            onChange={(e) => dtInstance.current?.search(e.target.value).draw()}
            placeholder="Search permissions..."
            className="pl-10 pr-4 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#334797]/20 transition-all w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table ref={tableRef} className="dataTable w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-y border-[#F5F5F5]">
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                ID
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Slug
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Permission
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Date Created
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Description
              </th>
              <th className="py-4 px-4 text-right font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((permission) => (
              <tr
                key={permission.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-all text-xs"
              >
                <td className="py-4 px-4 text-[#262626] font-medium">
                  {permission.id}
                </td>
                <td className="py-4 px-2 rounded-lg text-[#404040]">
                  <p className="p-2 rounded-lg text-[#404040] border border-[#E5E5E5] text-center">
                    {permission.slug}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-2 max-w-[400px]">
                    {permission.permission}
                  </div>
                </td>
                <td className="py-4 px-4 text-[#262626] font-medium">
                  {permission.dateCreated}
                </td>
                <td className="py-4 px-4 text-[#262626] font-medium">
                  {permission.description}
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
                      <DropdownMenuItem
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#262626] hover:bg-[#F5F5F5] hover:text-gray-900 transition-all cursor-pointer"
                        onClick={() => setOpenEditPermission(true)}
                      >
                        Edit Permission{" "}
                        <Pen size={14} className="opacity-60 text-[#262626]" />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#262626] hover:bg-[#f5f5f5] transition-all cursor-pointer"
                        onClick={() => setOpenDeletePermissionModal(true)}
                      >
                        Delete Permission{" "}
                        <Trash size={14} className="opacity-60" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={openDeletePermissionModal}
        onOpenChange={setOpenDeletePermissionModal}
      >
        <DialogContent className="sm:max-w-[400px] border-t-4 border-t-rose-500 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Delete Permission?
            </DialogTitle>
            <DialogDescription className="py-4 text-gray-500">
              Are you sure you want to delete this permiassion? This action will
              remove all associated data and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-3 sm:gap-0">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer mx-2"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1 sm:flex-none bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-all cursor-pointer mx-2"
              onClick={() => {
                setOpenDeletePermissionModal(false);
                toast.success("Permission deleted successfully");
              }}
            >
              Delete Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditPermission} onOpenChange={setOpenEditPermission}>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle className="text-sm">Edit Permission</DialogTitle>
          </DialogHeader>
          <div>
            <form action="" className=" text-sm my-1 px-3">
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm  mb-2">
                  Permission Name
                </label>
                <input
                  type="text"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="for example: User-media"
                  className="bg-[#FAFAFA] w-full outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
                <p className="text-[#202C5E] font-semibold text-xs pt-2">
                  Slug for permission can’t be changed
                </p>
              </div>
              <div className="py-2">
                <label htmlFor="" className="text-[#262626] text-sm mb-2">
                  Description
                </label>
                <textarea
                  placeholder="for example: User-media"
                  className="bg-[#FAFAFA] w-full h-30 outline-none px-8 py-2 rounded-lg border border-[#E5E5E5]"
                />
              </div>
            </form>
          </div>
          <DialogFooter className="border-t border-[#E5E5E5] p-4 mt-10">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-[#202C5E] text-white cursor-pointer"
              onClick={() => (
                setOpenEditPermission(false),
                toast.success("Permission was updated successfully")
              )}
            >
              Update Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function LogsTable({ data }: { data: Log[] }) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dtInstance = useRef<DataTables.Api | null>(null);

  useEffect(() => {
    if (!tableRef.current) return;

    const table = $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,
      lengthChange: false,
      dom: "t",
      destroy: true,
    });

    dtInstance.current = table;

    return () => {
      table.destroy();
    };
  }, [data]);

  return (
    <div className="w-full bg-white py-10 -mt-5 border-t border-t-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-50 justify-between items-center">
          <div>
            <h4 className="text-md  text-[#131313]">All Logs</h4>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2">
              <div className="relative">
                <select className="pl-4 pr-10 py-2 bg-[#FAFAFA] border border-[#F5F5F5] rounded-lg text-sm outline-none cursor-pointer appearance-none min-w-[160px]">
                  <option value="">Bulk Actions</option>
                  <option value="delete">Delete Selected</option>
                  <option value="export">Export Selected</option>
                </select>
              </div>
              <button className="px-6 py-2 bg-[#F5F5F5] text-[#4C567E] text-sm rounded-lg transition-all cursor-pointer border border-[#4C567E]">
                Apply
              </button>
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                onChange={(e) =>
                  dtInstance.current?.search(e.target.value).draw()
                }
                placeholder="Search logs..."
                className="pl-10 pr-4 py-2 bg-[#FAFAFA] border border-[#F5F5F5] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#334797]/20 transition-all w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="dataTable w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-y border-[#F5F5F5]">
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                ID
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                User
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Severity
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Date
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                IP Address
              </th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600">
                Message
              </th>
              <th className="py-4 px-4 text-right font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((log) => (
              <tr
                key={log.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-all text-xs"
              >
                <td className="py-4 px-4 text-[#262626] font-medium">
                  {log.id}
                </td>
                <td className="py-4 px-4 text-[#525252]">{log.user}</td>
                <td className="py-4 px-4 flex justify-center items-center">
                  <div className="flex items-center">
                    <div>
                      {log.severity === "high" ? (
                        <CircleAlert className="w-4 h-4 text-red-500" />
                      ) : (
                        <CircleCheckBig className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    {/* <span className="capitalize">{log.severity}</span> */}
                  </div>
                </td>
                <td className="py-4 px-4 text-[#525252]">
                  {log.date}
                  <p>{log.time}</p>
                </td>
                <td className="py-4 px-4 text-[#334797] font-mono">
                  {log.ipAddress}
                </td>
                <td className="py-4 px-4 text-[#525252]">{log.message}</td>
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

                      <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg  hover:bg-[#F5F5F5] text-sm text-[#262626] transition-all cursor-pointer">
                        Delete{" "}
                        <Trash
                          size={14}
                          className="opacity-60 text-[#262626]"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#262626] hover:bg-[#F5F5F5] hover:text-gray-900 transition-all cursor-pointer">
                        Copy User Id{" "}
                        <Copy size={14} className="opacity-60 text-[#262626]" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
