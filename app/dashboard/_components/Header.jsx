"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4">
      
      {/* Search Bar */}
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
        <Input
          placeholder="Search your videos..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 
            focus:border-cyan-400 focus:ring-0 
            hover:bg-white/20 hover:border-cyan-400 hover:scale-105 hover:shadow-md transition-transform transition-colors duration-300"

        />
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/70 hidden sm:block">
          {user?.fullName || "Guest"}
        </span>
        <img
          src={user?.imageUrl || "/default-avatar.png"}
          alt="avatar"
          className="w-9 h-9 rounded-full border border-white/20 object-cover"
        />
      </div>
    </div>
  );
};

export default Header;





