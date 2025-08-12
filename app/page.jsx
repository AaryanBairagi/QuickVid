import Link from "next/link";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#0f0f0f] text-white flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-lg shadow-[0_0_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-all duration-300">
        <CardContent className="p-10 text-center space-y-8">

          {/* Logo & Brand Name */}
          <div className="flex flex-col items-center space-y-3">
            {/* <img
              src="/logo.png"
              alt="QuickVid AI Logo"
              className="h-20 w-20 object-contain rounded-xl border border-purple-500/50 shadow-md"
            /> */}
            <h1 className="text-5xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-purple-300 via-cyan-400 to-cyan-600 bg-clip-text text-transparent drop-shadow-md">
                QuickVid AI
              </span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              From <span className="text-cyan-400 font-semibold">concept</span> to <span className="text-purple-400 font-semibold">creation</span> — 
              your ideas transformed into impactful short videos in seconds with AI.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-4">
            
            {/* Main CTA */}
            <Button 
              asChild
              className="bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 px-7 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105 transition-all duration-300"
            >
              <Link href="/dashboard">🚀 Generate a Short</Link>
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







// import Link from "next/link";
// import {Card , CardContent } from '../components/ui/card'
// import { Button } from '../components/ui/button'

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0f0f0f] text-white flex items-center justify-center px-6 py-12">
//       <Card className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
//         <CardContent className="p-10 text-center">
//           <h1 className="text-5xl font-extrabold text-center">
//             <span className="bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-700 text-transparent bg-clip-text">
//               QuickVid
//             </span>{" "}
//             <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-white text-transparent bg-clip-text">
//               AI
//             </span>
//           </h1>

//           <p className="text-white/80 text-lg mb-10">
//             Transform your ideas into engaging short videos with AI. Fast, smart & stunning — for creators, marketers & dreamers.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//             <Button
//               asChild
//               className="bg-gradient-to-r from-cyan-400 to-cyan-700 text-[#FFFAFA] px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
//             >
//               <Link href="/dashboard">🚀 Generate a Short</Link>
//             </Button>

//             <Button
//               variant="ghost"
//               className="text-white/70 transition-all hover:underline hover:text-black hover:decoration-cyan-200 hover:decoration-2"
//             >
//               <Link href="/learn-more">Learn More →</Link>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
