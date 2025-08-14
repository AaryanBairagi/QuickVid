"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { Home, Video, Settings, CreditCard, User, Wand2 , HelpCircle , BookOpen , Mail} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "../../../components/ui/separator";
import { ModeToggle } from "../../../components/global/mode-toggle";
import Link from "next/link";
import Image from "next/image";

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

  const links = [
    { icon: BookOpen, href: "/dashboard/scriptsFolder" },
    { icon: HelpCircle, href: "/dashboard/help" },
    { icon: Mail, href: "/dashboard/contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0c0c0c] border-r border-white/10 shadow-lg flex flex-col justify-between py-4">
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

      <Separator className="my-4 bg-white/10" />

    <div className="flex flex-col items-center gap-6 px-2 py-4 mt-10">
      <div className="flex flex-col items-center bg-white/5 dark:bg-[#353346]/30 rounded-full p-3 border border-white/20 shadow-sm">
        {links.map(({icon: Icon , href} , i ) => (
          <div key={i} className="flex flex-col items-center group">
            {/* Icon Button */}
            <Link
              href={href}
              className="p-3 rounded-full transition-all duration-300 
                        hover:bg-cyan-500/20 hover:text-cyan-300 
                        text-white/80 relative"
            >
              <Icon size={20} />
            </Link>

            {/* Connector Line with Glow */}
            {i < links.length - 1 && (
              <div className="w-px h-6 bg-white/20 dark:bg-white/30 
                              group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.7)] 
                              transition-all duration-300" />
            )}
          </div>
        ))}
      </div>
    </div>

      <div className="ml-9 mt-20 rounded-md border border-white/20 hover:border-white/60
              hover:shadow-[0_0_12px_rgba(34,211,238,0.7)] transition-all duration-300
              cursor-pointer w-[40px] h-[40px] flex items-center justify-center">
        <Image src="/logo.png" alt="logo" height={40} width={40} className="rounded-md" />
      </div>


    </div>
  );
};

export default SideBar;




