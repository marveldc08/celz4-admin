"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

export default function VerifyCode({  setActive }: Props) {
    const year = new Date().getFullYear();
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(15);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeLeft(15);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-[50%]">
      <div className="w-full max-w-md text-center flex flex-col ">
        {/* Logo */}
        <div className="mb-10 font-semibold text-lg text-left">Logo</div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 text-left">
          Let’s verify it’s you
        </h1>

        <p className="text-sm text-gray-500 mt-2 text-left">
          Kindly input the code sent to{" "}
          <span className="font-semibold text-[#2A2C2C]">
            Q*********@gmail.com
          </span>
          .
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 rounded-lg border border-gray-300 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="mt-6 text-sm font-semibold text-[#404040]">
          Didn’t receive any Code?{" "}
          <button
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-semibold cursor-pointer ${
              timeLeft > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-secondary hover:underline"
            }`}
          >
            Resend
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-1">
          Resend code in{" "}
          <span className="font-medium">
            00:{timeLeft.toString().padStart(2, "0")}
          </span>
        </p>

        {/* Verify Button */}
        <button
          className="w-full mt-8 bg-primary-800 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition cursor-pointer"
          onClick={() => setActive("reset")}
        >
          Verify Code
        </button>

        {/* Go Back */}
        <button
          className="w-full mt-4 border border-primary-800 text-primary-800 py-3 rounded-xl font-medium cursor-pointer"
          onClick={() => setActive("submit")}
        >
          Go Back
        </button>
        <div className="text-center w-full">
          <p className="text-xs text-gray-400 mt-20">
            CELZ4 Copyright@{year}. All rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
