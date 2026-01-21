import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CELZ4 Admin Platform",
  description: "Christ Embassy Lagos Zone 4 Admin backoffice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased `}>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
