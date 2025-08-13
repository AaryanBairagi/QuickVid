// app/scripts/page.jsx
"use client";
import React, { useState , useEffect } from "react";
import axios from "axios";
import PlayerDialog from "../_components/PlayerDialog";
import { Loader , Download } from 'lucide-react';


export default function ScriptsPage() {
  // Demo data; in a real app, fetch scripts from your backend
  const [scripts,setScripts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading,setLoading]=useState(true);
  const [isPlayerOpen, setPlayerOpen] = useState(false);

  useEffect(()=>{
    const fetchScripts = async()=>{
      try{
        const { data } = await axios.get("/api/get-user-videos");
        if(data.error) throw new Error(data.error);

        console.log("User Videos loaded:" , data.videos);

        const formatted = data.videos.map((video)=>({
          id: video.id,
          title: video.scenes?.[0]?.contentText?.slice(0,30) + (video.scenes?.[0]?.contentText?.length > 30 ? "..." : ""),
          topic: video.scenes?.[0]?.topic || "Untitled",
          created: new Date(video.createdAt).toISOString().split("T")[0],
          scenes: video.scenes?.length || 0,
          fullScenes: video.scenes
        }));

        setScripts(formatted);
        setSelected(formatted[0] || null);
      }catch(error){
        console.log("❌ Error loading scripts:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchScripts();
  },[]);


  if (loading) {
    return (
      <div className="md:px-12 py-10 text-white/40 flex items-center"><Loader className="mr-1 animate-spin text-cyan-500" size={24} /> Loading your scripts...</div>
    );
  }

  const exportScript = ()=>{
    if(!selected) return;

    const jsonStr = JSON.stringify(selected.fullScenes,null,2);
    const blob = new Blob([jsonStr],{type:"application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selected.title.replace(/\s+/g, "_")}_script.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="md:px-12 py-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
        🎬 Scripts Library
      </h1>
      <div className="flex flex-wrap gap-8">
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-3 text-cyan-400">Your Scripts</h2>
          {
            scripts.length===0 ? (
              <p className="text-white/50">No saved scripts yet</p>
            ) : 
          (<ul className="space-y-2">
            {scripts.map((script) => (
              <li
                key={script.id}
                className={`cursor-pointer rounded-lg p-4 bg-[#232639] border border-white/10 hover:bg-cyan-500/10 transition ${
                  selected?.id === script.id
                    ? "ring-2 ring-cyan-400"
                    : ""
                }`}
                onClick={() => setSelected(script)}
              >
                <div className="font-semibold">{script.title}</div>
                <div className="text-xs text-white/60">{script.topic} • {script.scenes} scenes</div>
                <div className="text-xs text-white/40">Created: {script.created}</div>
              </li>
            ))}
            </ul>
          )}
        </div>

        {/* Preview panel */}
        <div className="flex-1 min-w-[320px] bg-[#191b24] border border-white/10 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">Script Preview</h2>
          {selected ? (
            <div>
              <div className="mb-2">
                <span className="text-sm text-cyan-400">Topic:</span>{" "}
                <span>{selected.topic}</span>
              </div>
              <div className="mb-4 text-white/70 text-sm">
                This is the saved script for <b>{selected.title}</b>.
              </div>
              <div className="p-3 rounded bg-white/5 text-xs font-mono italic text-white/70 overflow-auto max-h-64">
                  {JSON.stringify(selected.fullScenes , null ,2)}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setPlayerOpen(true)}
                  className="
                      px-6 py-2 rounded-lg 
                      font-bold flex items-center gap-2
                      bg-gradient-to-r from-cyan-500 to-purple-500
                      text-white shadow-[0_0_10px_rgba(34,211,238,0.6)]
                      hover:from-cyan-400 hover:to-purple-400
                      hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]
                      transition-all duration-300"
                >
                  ▶ Play Video
                </button>
                <button 
                  onClick={exportScript}
                  className="
                      px-6 py-2 rounded-lg 
                      font-bold flex items-center gap-2
                      bg-gradient-to-r from-cyan-500 to-purple-500
                      text-white shadow-[0_0_10px_rgba(34,211,238,0.6)]
                      hover:from-cyan-400 hover:to-purple-400
                      hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]
                      transition-all duration-300"
                  >
                    <Download size={18} className="text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
                    Export Script
                </button>
              </div>

            <PlayerDialog
                isOpen={isPlayerOpen}
                onClose={() => setPlayerOpen(false)}
                scenes={selected.fullScenes}
              />
    
            </div>
          ) : (
            <div>Select a script to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
}
