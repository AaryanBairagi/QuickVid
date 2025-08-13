// app/help/page.jsx
"use client";
import React from "react";
import { HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="md:px-12 py-10 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-8 w-8 text-cyan-400" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Help & FAQ
        </h1>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-purple-400 mb-2">Getting Started</h2>
          <ol className="list-decimal ml-6 text-white/90 space-y-1 text-base">
            <li>Select a topic and video style on the “Create” page.</li>
            <li>Generate your script, images, audio, and captions with one click.</li>
            <li>Preview your generated video using the preview button.</li>
            <li>Download or share your final video!</li>
          </ol>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-cyan-400 mb-2">Frequently Asked Questions</h2>
          <ul className="space-y-2 text-white/80">
            <li>
              <b>Why is my video preview blank?</b> — Ensure your generated images match the video aspect ratio, and check your internet connection.
            </li>
            <li>
              <b>How do I create scripts about celebrities or politicians?</b> — Enter names/topics clearly and our AI will generate relevant, safe content, following your style and safety guidelines.
            </li>
            <li>
              <b>I see an error or bug:</b> — Visit the Contact page to report it.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-purple-400 mb-2">Troubleshooting</h2>
          <p className="text-white/80">
            If video/audio are out of sync or not rendering, reload the page or try regenerating after a few minutes. Contact support if issues persist.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-cyan-400 mb-2">Contact</h2>
          <p className="text-white/80">
            Need more help? Visit the <a href="/dashboard/contact" className="text-purple-400 underline">Contact</a> page to send a support message.
          </p>
        </section>
      </div>
    </div>
  );
}
