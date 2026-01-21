"use client";

import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";

type User = {
  name: string;
  email: string;
  role: string;
  date: string;
  status: "Active" | "Inactive";
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

  return (
    <CardContent className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">All Users</h3>
        <div className="relative bg-[#FAFAFA] rounded-lg px-3">
            <Search className={"absolute top-4 left-2 w-4 h-4"} />
          <input type="text" placeholder="Search Users" className="w-full px-4 py-3 border-none outline-none" />
        </div>
      </div>

      {/* Table */}
      <table
        ref={tableRef}
        className="dataTable w-full text-sm border-collapse"
      >
        <thead className="text-muted-foreground rounded-lg px-3 py-5 border border-[#F5F5F5] bg-[#FAFAFA]">
          <tr>
            <th className="py-2">Name </th>
            <th>Email</th>
            <th>Role</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, index) => (
            <tr
              key={index}
              className="border-b border-b-gray-200 last:border-0"
            >
              <td className="py-3">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.date}</td>
              <td className="text-green-600 font-medium">{user.status}</td>
              <td className="px-3 py-2 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-md cursor-pointer hover:bg-gray-100 border-none">
                      <MoreHorizontal size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 border border-gray-100 bg-gray-100"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/users/user-detail?id=`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Eye size={14} /> View
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
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
            disabled={pageInfo.page === 1}
          >
            {'<'} Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={nextPage}
            disabled={pageInfo.page === pageInfo.pages}
          >
            Next {'>'}
          </Button>
        </div>
      </div>
    </CardContent>
  );
}
