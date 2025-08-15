"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  const [credits, setCredits] = useState({ remaining: null, total: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch("/api/get-user-credits" , { credentials: "include"});
        if (res.ok) {
          const data = await res.json();
          setCredits({ remaining: data.creditsRemaining, total: data.credits });
        } else {
          setCredits({ remaining: null, total: null });
          console.error("Failed to fetch user credits", await res.text());
        }
      } catch (error) {
        setCredits({ remaining: null, total: null });
        console.error("Error fetching credits:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchCredits();
      const refetch = () => { if (user) fetchCredits(); };
      window.addEventListener("credits-updated", refetch);

      return () => window.removeEventListener("credits-updated", refetch);
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-between px-6 py-4 w-full bg-black/20">
      {/* LEFT: Token image + credits */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <img src="/token-image.jpg" alt="Token" className="w-8 h-8 border border-white/30 hover:border-white/50 rounded-full" />
        {
          loading ? (
            <span className="text-sm text-white/50 font-semibold">Fetching remaining credits...</span>
          ) : (credits.remaining !== null && credits.total !== null) ? (
            <span className="text-sm text-white/70 font-semibold select-none underline underline-offset-4 decoration-cyan-400">
              Credits: <span className="font-bold text-yellow-500">{credits.remaining}</span> / <span className="font-bold">{credits.total}</span>
            </span>
          ) : (
            <span className="text-sm text-white/70  font-semibold">Credits: Loading...</span>
          )
        }
      </div>

      {/* CENTER: Navigation Links */}
      <div className="flex items-center justify-center gap-10 flex-1">
        <Link href="/dashboard/help" className="text-sm font-semibold text-white/70 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-400 hover:decoration-purple-400 transition-colors duration-200">Help & FAQ</Link>
        <Link href="/dashboard/contact" className="text-sm font-semibold text-white/70 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-400 hover:decoration-purple-400 transition-colors duration-200">Contact Us</Link>
        <Link href="/dashboard/scriptsFolder" className="text-sm font-semibold text-white/70 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-400 hover:decoration-purple-400 transition-colors duration-200">Scripts</Link>
        <Link href="/learn-more" className="text-sm font-semibold text-white/70 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-400 hover:decoration-purple-400 transition-colors duration-200">About Us</Link>
      </div>

      {/* RIGHT: Username and avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm font-semibold text-white/70 hover:text-cyan-400 hidden sm:block">
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
