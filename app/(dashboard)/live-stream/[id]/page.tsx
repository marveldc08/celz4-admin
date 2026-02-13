"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  Play,
  Search,
  Shield,
  Eye,
  Edit,
  RefreshCw,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const analyticsData = [
  { time: "12AM", viewers: 150 },
  { time: "2AM", viewers: 180 },
  { time: "4AM", viewers: 160 },
  { time: "6AM", viewers: 120 },
  { time: "8AM", viewers: 110 },
  { time: "10AM", viewers: 130 },
  { time: "12PM", viewers: 120 },
  { time: "2PM", viewers: 110 },
  { time: "4PM", viewers: 100 },
  { time: "6PM", viewers: 95 },
  { time: "8PM", viewers: 80 },
  { time: "10PM", viewers: 60 },
  { time: "11PM", viewers: 40 },
];

const participationData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];

const COLORS = ["#334797", "#C3A253", "#BCBFCE"];

export default function StreamAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Stream Analysis");
  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FFFFFA] text-gray-900 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => router.back()}
          className="flex items-center cursor-pointer font-semibold text-gray-900 transition-all text-md w-fit "
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Go back
        </button>

        <div className="flex items-center justify-center gap-0">
          <button
            onClick={() => setActiveTab("Stream Analysis")}
            className={`p-6 text-sm font-semibold transition-all relative w-[20%] cursor-pointer ${
              activeTab === "Stream Analysis"
                ? "text-[#202C5E] font-semibold border border-b-0 border-gray-200 rounded-lg "
                : "text-gray-400 hover:text-gray-600 border-b border-gray-200"
            }`}
          >
            Stream Analysis
          </button>
          <button
            onClick={() => setActiveTab("Basic information")}
            className={`py-6 px-4 text-sm  transition-all relative w-[20%] cursor-pointer ${
              activeTab === "Basic information"
                ? "text-[#202C5E] font-semibold  border border-b-0 border-gray-200 rounded-lg"
                : "text-gray-400 hover:text-gray-600 border-b border-gray-200"
            }`}
          >
            Basic information
          </button>
          <div className="border-b border-gray-200 p-3 h-[69px] w-[60%]"></div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-rows-1 md:grid-rows-3 gap-6">
        {/* Left Column - Stream Preview & Controls */}
        <div className="xl:row-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-2 bg-white border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Stream Preview -{" "}
                  <span className="text-gray-500 font-normal">
                    Pastor&apos;s conference
                  </span>
                </h3>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 group">
                <Image
                  src="/images/friends-group3.jpg"
                  alt="Stream Preview"
                  fill
                  className="object-cover"
                />

                {/* Live Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                  Live
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-all">
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </button>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/40 backdrop-blur-sm flex items-center justify-between text-xs text-white">
                  <div className="flex items-center space-x-4">
                    <span>3:40</span>
                    <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-blue-500" />
                    </div>
                    <span>54:12</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <Button className="bg-[#202C5E] hover:bg-[#1a244d] text-white rounded-xl py-6 font-semibold">
                  Start Streaming
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-6 font-semibold"
                >
                  End Streaming
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-6 font-semibold"
                >
                  share link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stream Health */}
          <Card className="md:col-span-1 bg-white border-gray-200 rounded-3xl shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Stream Health
                </h3>
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Network",
                    value: "Excellent",
                    status: "text-green-600",
                    icon: <Zap className="w-4 h-4" />,
                  },
                  { label: "Speed", value: "4.65MBPS" },
                  {
                    label: "Connection",
                    value: "Connected",
                    status: "text-green-600",
                  },
                  { label: "CPU coverage", value: "12%" },
                  { label: "Speed", value: "4.65MBPS" },
                  { label: "Dropped Frames", value: "none" },
                  { label: "Frame Rate", value: "Mildly" },
                  { label: "Bit-rate", value: "Stable" },
                  { label: "Audio", value: "Clear" },
                  { label: "Video", value: "Clear" },
                  { label: "Audio", value: "Clear" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-gray-500 text-sm font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      {item.icon && (
                        <span className={item.status}>{item.icon}</span>
                      )}
                      <span
                        className={`text-sm font-bold ${item.status || "text-gray-900"}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connections Card (White Theme) */}
          <Card className="md:col-span-1 bg-white border-0 rounded-3xl shadow-sm">
            <CardContent className="p-10 space-y-10 text-center relative">
              <div className="absolute top-4 right-4 flex space-x-3 text-gray-900 mb-5.5">
                <RefreshCw className="w-4 h-4" />
                <Eye className="w-4 h-4" />
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Total users connected
                </p>
                <div className="flex items-baseline justify-center space-x-2">
                  <h1 className="text-4xl font-extrabold text-[#334797]">
                    1000
                  </h1>
                  <span className="text-gray-500 font-medium">users</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-xs  uppercase tracking-wider">
                  Stream Duration Timer
                </p>
                <div className="flex items-baseline justify-center space-x-1">
                  <h2 className="text-4xl font-bold text-[#334797]">1300</h2>
                  <span className="text-gray-500 font-medium">ms</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Unique viewers
                </p>
                <h2 className="text-4xl font-bold text-[#334797]">1300</h2>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-xs  uppercase tracking-wider">
                  Church group Connected
                </p>
                <h2 className="text-4xl font-extrabold text-[#334797]">6</h2>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex w-full justify-center items-center gap-6">
        {/* Transcription Card */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-sm w-[65%]">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Transcription
              </h3>
              <div className="flex items-center space-x-3">
                <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all text-gray-500">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all text-gray-500">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="ghost"
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs rounded-xl px-5 py-2"
              >
                <Search className="w-4 h-4 mr-2" /> Find & Replace
              </Button>
              <Button
                variant="ghost"
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs rounded-xl px-5 py-2"
              >
                <Shield className="w-4 h-4 mr-2" /> Spell Check
              </Button>
              <Button
                variant="ghost"
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs rounded-xl px-5 py-2"
              >
                <Shield className="w-4 h-4 mr-2" /> Spell Check
              </Button>
            </div>

            <div className="space-y-6 h-64 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-2">
                <p className="text-blue-600 font-semibold text-sm">[03:40]</p>
                <p className="text-sm leading-relaxed text-gray-600">
                  <span className="text-gray-900 font-bold">Pastor James:</span>{" "}
                  great is the lord great is the lordgreat is the lordgreat is
                  the lordgreat is the lordgreat is the lordgreat is the
                  lordgreat is the lordgreat is the lordgreat is the lordgreat
                  is the lordgreat is the lordgreat is the lordgreat is the lord
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-blue-600 font-semibold text-sm">[03:42]</p>
                <p className="text-sm leading-relaxed text-gray-600">
                  <span className="text-gray-900 font-bold">Pastor James:</span>{" "}
                  great is the lord{" "}
                  <span className="bg-blue-50 border-b border-blue-200 text-blue-800 px-1">
                    great
                  </span>{" "}
                  is the lordgreat is the lordgreat is the lordgreat is the
                  lordgreat is the lordgreat is the lordgreat is the lordgreat
                  is the lordgreat is the lordgreat is the lordgreat is the
                  lordgreat is the lord
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Viewers Trend Chart */}
        <Card className="md:col-span-2 bg-white border-gray-200 rounded-3xl shadow-sm w-[35%]">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Analytics Overview
                </p>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  Viewers trend{" "}
                  <span className="text-emerald-500 text-xs ml-2">↗ 00%</span>
                </h3>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient
                      id="colorViewers"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f3f4f6"
                  />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af", fontWeight: 600 }}
                    interval={4}
                  />
                  <YAxis hide domain={[0, 200]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="viewers"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorViewers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex bg-gray-50 p-1 rounded-xl w-fit border border-gray-100">
              {["1 Day", "1 Month", "1 Year", "Max"].map((range) => (
                <button
                  key={range}
                  className={`px-5 py-2 text-xs rounded-lg transition-all font-bold ${
                    range === "1 Day"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Analytics Overview & Charts */}
      <div className="flex w-full justify-between items-center gap-6">
        {/* Participation Chart */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-sm w-[35%]">
          <CardContent className="p-4 space-y-4">
            <h3 className="text-xs text-gray-400 uppercase tracking-widest">
              Participation
            </h3>
            <h2 className="text-md font-bold text-gray-900  pl-3">
              Prayer request
            </h2>

            <div className="h-64 mt-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={participationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={4}
                  >
                    {participationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-3xl font-black text-gray-900">1.2k</span>
                <span className="text-xs font-bold text-gray-400">Total</span>
              </div>
            </div>

            <div className="flex justify-center space-x-6 text-xs font-bold text-gray-500">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#334797] mr-2" />{" "}
                Group 1
              </div>
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C3A253] mr-2" />{" "}
                Group 2
              </div>
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#BCBFCE] mr-2" />{" "}
                Group 3
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Upcoming Streams */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-sm w-[65%]">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-b-gray-200">
              <h3 className="text-base font-bold text-gray-900">
                Upcoming Streams
              </h3>
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 p-3 rounded-xl">
                <span>Set reminder</span>
                <div className="flex items-center px-2">
                  <Switch
                    id="airplane-mode"
                    className="bg-[#202C5E] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-20 h-15 rounded-xl overflow-hidden shadow-sm shrink-0">
                      <Image
                        src="/images/friends-group.jpg"
                        alt="Stream"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        Youth Alive
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        12:00 PM
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-white cursor-pointer bg-[#202C5E] hover:bg-[#283567] text-xs tracking-wider px-3 py-6"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
