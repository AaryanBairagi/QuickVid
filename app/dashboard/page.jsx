"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { Sparkles, Play , Loader } from "lucide-react";
import axios from "axios";
import PlayerDialog from "./_components/PlayerDialog"; 

export default function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlayerOpen, setPlayerOpen] = useState(false);
  const [activeScenes, setActiveScenes] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get("/api/get-user-videos");
        if (data.error) throw new Error(data.error);

        const formatted = data.videos.map((video) => ({
          id: video.id,
          title: video.scenes?.[0]?.topic || "Untitled Video",
          description: video.scenes?.[0]?.contentText || "No description available",
          createdAt: video.createdAt,
          scenes: video.scenes,
          videoUrl: video.videoUrl || null
        }));

        setVideoList(formatted);
      } catch (error) {
        console.error("❌ Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-white/40 flex items-center mr-1">
        <Loader className="mr-1 animate-spin text-cyan-500" size={24} /> 
        Loading your videos...
      </div>
    );
  }


const handleSaveVideo = async (video) => {
  if (video.videoUrl) {
    window.open(video.videoUrl, "_blank");
    return;
  }
  try {
    const { data } = await axios.post("/api/render-video", { videoId: video.id });
    if (data.videoUrl) {
      window.open(data.videoUrl, "_blank");
    }
  } catch (err) {
    console.error(err);
    alert("Error saving video");
  }
};



// const handleSaveVideo = (video) => {
//   console.log("🛠 Save Video button clicked for video:", video);

//   const videoUrl = video.videoUrl || video.scenes?.[0]?.videoUrl;
//   console.log("🔍 Resolved videoUrl:", videoUrl);

//   if (!videoUrl) {
//     console.warn("⚠ No video URL available for this video object!", video);
//     alert("This video file is not available for direct download yet.");
//     return;
//   }

//   try {
//     const a = document.createElement("a");
//     a.href = videoUrl;
//     a.download = `${video.title.replace(/\s+/g, "_")}.mp4`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     console.log("✅ Download triggered successfully for:", videoUrl);
//   } catch (err) {
//     console.error("❌ Error while triggering download:", err);
//     alert("An error occurred while trying to download the video.");
//   }
// };

  return (
    <div className="min-h-screen text-white p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-bold text-3xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
          Your Videos
        </h2>

        <div className="flex gap-3">
          <Link href="/dashboard/create-new">
            <Button className="flex items-center gap-2 px-5 py-2 rounded-full
              bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700
              text-white font-semibold shadow-lg
              hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]
              transition-all duration-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Create Short
            </Button>
          </Link>

          {/* <Link href="/dashboard/create-new">
            <Button className="rounded-full border border-white/20 bg-white/5
              hover:bg-white/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]
              text-white transition-all duration-300">
              + Create New
            </Button>
          </Link> */}
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
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition"
            >
              {/* Video Thumbnail */}
              <div className="relative w-full aspect-video bg-black/30 overflow-hidden">
                <img
                  src={video.scenes?.[0]?.imageUrl || "/placeholder-thumbnail.jpg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Info */}
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-medium text-white truncate">
                  {video.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-2">
                  {video.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setActiveScenes(video.scenes);
                      setPlayerOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg
                      bg-gradient-to-r from-cyan-500 to-purple-500
                      text-white font-semibold
                      shadow-[0_0_10px_rgba(34,211,238,0.6)]
                      hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]
                      transition-all duration-300"
                  >
                    <Play size={16} className="text-white" />
                    Play Video
                  </button>

                  <button
                    onClick={()=> handleSaveVideo(video)}
                    className="flex-1 flex items-center justify-center px-4 py-2 text-sm rounded-lg
                      bg-white/5 border border-white/10 text-white/80
                      hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                  💾 Save Video                  
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Remotion Player Dialog */}
      <PlayerDialog
        isOpen={isPlayerOpen}
        onClose={() => setPlayerOpen(false)}
        scenes={activeScenes}
      />
    </div>
  );
}







