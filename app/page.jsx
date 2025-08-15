"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const handleGenerateClick = () => {
    if (!isLoaded) return;   // Wait until user info loads

    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#0f0f0f] text-white flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-lg shadow-[0_0_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-all duration-300">
        <CardContent className="p-10 text-center space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-purple-300 via-cyan-400 to-cyan-600 bg-clip-text text-transparent drop-shadow-md">
              QuickVid AI
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            From <span className="text-cyan-400 font-semibold">concept</span> to <span className="text-purple-400 font-semibold">creation</span> — your ideas transformed into impactful short videos in seconds with AI.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-4">
            {/* Main CTA */}
            <Button
              onClick={handleGenerateClick}
              className="bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 px-7 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105 transition-all duration-300"
            >
              🚀 Generate a Short
            </Button>

            {/* Secondary CTA */}
            <Button
              asChild
              variant="ghost"
              className="px-6 py-3 text-white/80 hover:text-cyan-300 hover:underline underline-offset-4 transition-all duration-200"
            >
              <Link href="/learn-more">ℹ️ Learn More</Link>
            </Button>
          </div>

          {/* Footer note */}
          <div className="pt-6 text-white/50 text-sm">
            &copy; {new Date().getFullYear()} QuickVid AI — All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

