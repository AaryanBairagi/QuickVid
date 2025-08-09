import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0f0f0f] text-white flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
        <CardContent className="p-10 text-center">
          <h1 className="text-5xl font-extrabold text-center">
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-700 text-transparent bg-clip-text">
            QuickVid
            </span>{' '}
            <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-white text-transparent bg-clip-text">AI</span>
          </h1>

          <p className="text-white/80 text-lg mb-10">
            Transform your ideas into engaging short videos with AI. Fast, smart & stunning — for creators, marketers & dreamers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button className="bg-gradient-to-r from-cyan-400 to-cyan-700 text-[#FFFAFA] px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform">
              🚀 Generate a Short
            </Button>

            <Button
              variant="ghost"
              className="text-white/70 transition-all hover:underline hover:text-black hover:decoration-cyan-200 hover:decoration-2"
            >
              Learn More →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
