"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on home page
  if (pathname === "/") return null;

  return (
    <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} CELZ4. All rights reserved.
        </p>

        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <span className="hidden sm:inline">
            Christ Embassy Lagos Zone 4 |
          </span>
          <Link
            href="https://celz4.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            Visit Website
          </Link>
        </div>
      </div>
    </footer>
  );
}
