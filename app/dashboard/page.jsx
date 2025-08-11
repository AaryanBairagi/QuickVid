"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Dashboard() {
  const [videoList, setVideoList] = useState([]);

  return (
    <div className="min-h-screen text-white p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-bold text-3xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
          Your Videos
        </h2>

        <div className="flex gap-3">
          <Link href="/dashboard/create-short">
            <Button
                className="flex items-center gap-2 px-5 py-2 rounded-full
                bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700
              text-white font-semibold shadow-lg
                hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]
                transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
              Create Short
            </Button>
          </Link>

        <Link href="/dashboard/create-new">
          <Button
              className="rounded-full border border-white/20 bg-white/5
              hover:bg-white/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]
              text-white transition-all duration-300">
              + Create New
          </Button>
        </Link>
        </div> 
      </div>

      {/* Video List / Empty State */}
      {videoList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoList.map((video) => (
            <div
              key={video.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <div className="aspect-video bg-black/30" />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-medium text-white truncate">
                  {video.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
