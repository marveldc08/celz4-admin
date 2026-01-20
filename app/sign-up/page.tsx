'use client'
import { AtSign, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const year = new Date().getFullYear();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div>
      <section className="w-full bg-[#EAECF0] h-screen flex items-center justify-center">
        <div className="flex flex-row justify-between items-center w-full px-10">
          <div className="text-left w-1/2 text-gray-900 pl-16">
            <div className="mb-10">
              <h1 className="text-2xl font-bold mb-3">Logo</h1>
            </div>
            <div>
              <h1 className=" text-2xl font-bold">
                Good to Have you on board.
              </h1>
              <p className="mt-4 text-sm text-gray-400">
                welcome to church - Giving your life a meaning
              </p>
              <form action="" className="w-[70%] mt-10">
                <div className="mt-8 flex flex-col gap-4">
                  <div className="relative">
                    {" "}
                    <label htmlFor="email">Username/Email</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <AtSign
                      size={20}
                      className="absolute right-4 top-10 text-[#2A2C2C]"
                    />
                  </div>

                  <div className="relative w-full">
                    <label htmlFor="password">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-12 -translate-y-1/2 text-[#2A2C2C] hover:text-gray-600 cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="relative w-full">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-12 -translate-y-1/2 text-[#2A2C2C] hover:text-gray-600 cursor-pointer"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-left items-center gap-2">
                    <input type="checkbox" className="bg-none cursor-pointer" />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to{" "}
                      <Link
                        href="#"
                        className="text-[#110D21] font-semibold underline"
                      >
                        Terms, Conditions and Privacy
                      </Link>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition duration-300 cursor-pointer"
                  >
                    Sign Up
                  </button>
                  <div>
                    <p className="text-sm text-[#2A2C2CA6] mt-4 text-center font-light">
                      Already have an Account?{" "}
                      <Link href="/" className="text-[#2A2C2C] font-semibold">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="text-center w-[70%]">
              <p className="text-xs text-gray-400 mt-20">
                CELZ4 Copyright@{year}. All rights Reserved
              </p>
            </div>
          </div>
          <div className=" w-1/2 bg-primary-800 p-8 rounded-xl shadow-lg text-left text-white pt-20">
            <h1 className="text-white text-4xl font-bold mb-3">
              Welcome to church
            </h1>
            <p className="text-sm ">Giving your life a meaning.!</p>
            <div className="rounded-xl border-6 border-l-white border-t-white border-b-white mt-8 ">
              <Image
                src="/images/welcome.jpg"
                width={1000}
                height={1000}
                alt="Admin Illustration"
                className="rounded-xl"
              />
            </div>
            <Image
              src={"/images/b-frame.png"}
              width={500}
              height={500}
              alt="sponsors"
              className="mt-10"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
