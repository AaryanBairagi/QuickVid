"use client";
import React, { useState } from "react";
import { Loader, Mail , Send } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        alert(data.error || "Failed to send feedback");
      }
    } catch (err) {
      console.error("❌ Error sending feedback:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0f0f0f] text-white flex items-center justify-center px-6 py-12">
      {/* Contact Card */}
      <div
        className="max-w-2xl w-full rounded-2xl p-10 backdrop-blur-sm 
        bg-gradient-to-r from-purple-500/10 to-cyan-500/10 
        border border-white/10 
        shadow-lg transition-shadow duration-300
        hover:shadow-[0_0_25px_rgba(34,211,238,0.7)]
        relative"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg">
            <Mail className="h-7 w-7 text-white" />
          </span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Contact & Feedback
          </h1>
        </div>

        {/* Form / Thank You */}
        {!sent ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 
              focus:outline-none transition-all duration-300
              hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] 
              focus:shadow-[0_0_15px_rgba(34,211,238,0.8)] 
              focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 
              focus:outline-none transition-all duration-300
              hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] 
              focus:shadow-[0_0_15px_rgba(34,211,238,0.8)] 
              focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />

            <textarea
              name="message"
              placeholder="How can we help you? Your message, suggestion, or bug report..."
              rows={4}
              required
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 resize-none
              focus:outline-none transition-all duration-300
              hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] 
              focus:shadow-[0_0_15px_rgba(34,211,238,0.8)] 
              focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />

            <button
              disabled={loading}
              type="submit"
              className="mt-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg 
              bg-gradient-to-r from-cyan-500 to-purple-500 
              hover:from-cyan-400 hover:to-purple-400
              hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0d0d0d]
              transition-all duration-200 flex items-center justify-center gap-2
              disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                Send Feedback
                <Send className="w-4 h-4" />
                </>
                
              )}
            </button>
          </form>
        ) : (
          <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-8 text-center text-white text-xl font-semibold shadow-lg">
            🎉 Thank you! Your feedback has been received!
          </div>
        )}
      </div>
    </div>
  );
}

