"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";

const Jumbo = ({
  hasButton,
  openEditAccess,
  setOpenEditAccess,
  openDeleteUser,
  setOpenDeleteUser,
}: {
  hasButton: boolean;
  openEditAccess: boolean;
  setOpenEditAccess: (open: boolean) => void;
  openDeleteUser: boolean;
  setOpenDeleteUser: (open: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center w-full mb-8 px-2">
        <div className="flex items-center">
          <Link
            href={"#"}
            className="font-semibold text-gray-900"
            onClick={() => router.back()}
          >
            Go Back
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {hasButton ? (
            <button
              className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 rounded-lg bg-[#ffffff] text-xs text-[#DC2626] border border-gray-200 hover:bg-gray-100 transition-all"
              onClick={() => setOpenDeleteUser(true)}
            >
              <Trash className="w-4 h-4 text-[#DC2626]" /> Delete User
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full rounded-t-lg">
        <div className="w-full rounded-t-lg bg-[url('/images/decor2.jpg')]  bg-cover bg-top h-[250px]"></div>
        <div className="w-full flex items-end justify-between px-20 -mt-25">
          <div className="flex items-end gap-4">
            <div className="rounded-full w-35 h-35 flex items-center justify-center p-5 border border-[#334797] bg-white text-[#262626] text-5xl font-medium">
              <h1>FA</h1>
            </div>
            <div className="flex flex-col items-center justify-end">
              <p className="text-center text-[#262626]">Fiyinfolu Adams</p>
              <p className="text-xs text-[#525252]">fiyinfoluadams@gmail.com</p>
            </div>
          </div>
          {hasButton ? (
            <button
              className="flex justify-center cursor-pointer items-center gap-2 px-6 py-3 rounded-lg text-[#FAFAFA] text-xs bg-[#334797] border border-gray-200 hover:bg-[#2b429e] transition-all"
              onClick={() => setOpenEditAccess(true)}
            >
              <Pen className="w-4 h-4" /> Edit User Access
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jumbo;
