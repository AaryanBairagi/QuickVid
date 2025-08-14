"use client";
import React from "react";
import { HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#0b0f15] px-6 py-12 max-w-4xl mx-auto text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10 justify-center">
        <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg">
          <HelpCircle className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent select-none mr-6">
          Help & FAQ
        </h1>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 text-white/90">
        <section>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 border-b border-purple-600 pb-2">
            Getting Started
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-lg leading-relaxed">
            <li>Select a topic and video style on the <span className="font-semibold text-cyan-400">Create</span> page.</li>
            <li>Generate your script, images, audio, and captions with one click.</li>
            <li>Preview your generated video using the preview button.</li>
            <li>Download or share your final video!</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4 border-b border-cyan-600 pb-2">
            Frequently Asked Questions
          </h2>
          <ul className="space-y-4 text-base leading-relaxed max-w-prose">
            <li>
              <b className="text-white">Why is my video preview blank?</b> — Ensure your generated images match the video aspect ratio, and check your internet connection.
            </li>
            <li>
              <b className="text-white">How do I create scripts about celebrities or politicians?</b> — Enter names/topics clearly and our AI will generate relevant, safe content, following your style and safety guidelines.
            </li>
            <li>
              <b className="text-white">I see an error or bug:</b> — Visit the <a href="/contact" className="text-purple-400 underline hover:text-purple-300 transition">Contact</a> page to report it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 border-b border-purple-600 pb-2">
            Troubleshooting
          </h2>
          <p className="text-base leading-relaxed max-w-prose">
            If video or audio are out of sync or not rendering, try reloading the page or regenerating after a few minutes. Contact support if issues persist.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4 border-b border-cyan-600 pb-2">
            Contact
          </h2>
          <p className="text-base leading-relaxed max-w-prose">
            Need more help? Visit the <a href="/contact" className="text-purple-400 underline hover:text-purple-300 transition">Contact</a> page to send a support message.
          </p>
        </section>
      </div>
    </div>
  );
}




