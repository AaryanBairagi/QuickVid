"use client";
import React from "react";
import Header from "./_components/Header";
import SideBar from "./_components/Sidebar";


const DashboardLayout = ({ children }) => (
<div className="flex min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0c0c0c] text-white">
  {/* Sidebar -- NO background needed here, since parent handles it */}
  <aside className="w-28 border-r border-white/10 flex-shrink-0">
    <SideBar />
  </aside>
  {/* Main Area */}
  <div className="flex flex-col flex-1">
    <div className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
      <Header />
    </div>
    <main className="p-6 space-y-6">
      {children}
    </main>
  </div>
</div>

);

export default DashboardLayout;








