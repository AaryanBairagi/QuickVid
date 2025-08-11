"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { Home, Video, Settings, CreditCard, User, Wand2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "../../../components/ui/separator";
import { ModeToggle } from "../../../components/global/mode-toggle";
import Link from "next/link";

const SideBar = () => {
  const path = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const menu = [
    { id: 1, name: "Home", icon: Home, path: "/dashboard" },
    { id: 2, name: "Create New", icon: Video, path: "/dashboard/create-new" },
    { id: 3, name: "Upgrade Plan", icon: CreditCard, path: "/dashboard/upgrade" },
    { id: 4, name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-white/5 backdrop-blur-md border-r border-white/10 shadow-lg flex flex-col justify-between py-4">
      {/* Scrollable Menu */}
      <h4 className="text-white/40 font-semibold text-xl text-center hover:text-white/80 mt-1.5 border-white/10"><Link href="/">quickVid.</Link></h4>
      <Separator className={"mt-4.5 bg-white/10"} />
      <div className="flex flex-col items-center justify-center mt-12 gap-5 overflow-visible px-2">
        <TooltipProvider delayDuration={0}>
          {menu.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => router.push(item.path)}
                  className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                      path === item.path
                      ? // Active state: purple-pink glow + purple-pink text
                      "bg-white/10 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                      : // Hover state: cyan glow + cyan text, default text white/60
                      "text-white/60 hover:text-cyan-400 hover:bg-white/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                      )} >
                  <item.icon size={24} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {/* User Section */}
      <div className="flex flex-col items-center justify-center gap-3 px-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => router.push("/dashboard/profile")}
                className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 mt-4 mb-12",
                path === "/dashboard/profile"
                ? "bg-white/10 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                : "text-white/60 hover:text-cyan-400 hover:bg-white/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                )} >
                <User size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{user?.fullName || "Account"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Separator className="my-4" />

<div className="flex flex-col items-center gap-6 px-2 py-4">
      <div className="flex flex-col items-center bg-white/5 dark:bg-[#353346]/30 rounded-full p-3 border border-white/20 shadow-sm">
        {[Video, Wand2, Settings].map((Icon, i, arr) => (
          <div key={i} className="flex flex-col items-center group">
            {/* Icon Button */}
            <button
              className="p-3 rounded-full transition-all duration-300 
                        hover:bg-cyan-500/20 hover:text-cyan-300 
                        text-white/80 relative">
              <Icon size={20} />
            </button>

            {/* Connector Line with Glow */}
            {i < arr.length - 1 && (
              <div className="w-px h-6 bg-white/20 dark:bg-white/30 
                              group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.7)] 
                              transition-all duration-300" />
            )}
          </div>
        ))}
      </div>
    </div>

      <div className="flex flex-col items-center gap-4 text-white mt-20">
        <ModeToggle className="bg-gray-600 text-black" />
      </div>


    </div>
  );
};

export default SideBar;




