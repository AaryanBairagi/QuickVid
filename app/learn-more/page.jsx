import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Sparkles } from "lucide-react";

export default function LearnMorePage() {
return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0f0f0f] text-white flex flex-col justify-between px-6 py-12">
      {/* Header */}
        <header className="w-full flex justify-center">
            <div className="flex flex-col items-center py-2">
                <div className="flex items-center space-x-2">
                <img
                    src="/logo.png"
                    alt="QuickVid AI Logo"
                    className="h-14 w-14 object-contain rounded-xl shadow-lg border border-purple-500 hover:border-purple-700"
                    loading="lazy"
                />
                    <span className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-500/80 via-cyan-400 to-cyan-500/80 bg-clip-text text-transparent drop-shadow-md">
                        QuickVid
                    </span>
                </div>
                <div className="text-white/80 text-base mt-2 mb-3.5 font-semibold tracking-wide text-center hover:text-white/50">
                    From Concept to Video—Seamlessly Crafted by Advanced AI 
                </div>
            </div>
        </header>


        <main className="flex-grow flex justify-center items-center">
            <Card className="max-w-4xl w-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10
                border border-white/10 shadow-lg rounded-2xl transition-shadow duration-300
                hover:shadow-[0_0_20px_5px_rgb(16,185,129)] backdrop-blur-sm">

            <CardContent className="p-10 space-y-9">

            {/* Project Intro */}
            <section className="max-w-3xl mx-auto text-left">
                <p className="text-white/80 text-lg">
                    <span className="text-cyan-400 font-bold">QuickVid AI</span> is designed to empower everyone—from creators and marketers to students and dreamers—to effortlessly transform simple ideas into engaging, high-quality short videos. Unlike traditional video makers, QuickVid AI automates the entire content creation pipeline using cutting-edge artificial intelligence: from crafting scripts tailored to your topic, generating natural voiceovers, to syncing precise captions, and providing vivid image prompts. This integrated workflow saves time and removes technical barriers that often slow down video production.
                </p><br/>
                <p className="text-white/80 text-lg">
                    What sets QuickVid AI apart is its seamless unification of scriptwriting, voice narration, and captioning in one fast, intelligent platform powered by the latest AI models and cloud technologies. Unlike many existing tools that require manual editing or piecemeal automation, QuickVid AI envisions a future where creativity flows effortlessly from idea to finished video with just a few clicks.
                </p><br/>
                <p className="text-white/80 text-lg">
                    Our vision is to unlock creativity for everyone worldwide by building smarter, more intuitive AI-powered multimedia tools that adapt to any story or style. QuickVid AI aims to democratize video production so that anyone can share their voice and vision through captivating videos—no technical skills needed.
                </p>

            </section>

            {/* Features */}
            <section>
                <h2 className="text-2xl font-bold mb-4"> 
                    <span role="img" aria-label="Glow">✨{' '}</span>                
                    <span className="bg-gradient-to-r from-purple-400/80 to-cyan-400/80 bg-clip-text text-transparent">Features</span>
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>AI-generated video scripts tailored to any topic</li>
                    <li>Professional voiceovers via Google Text-to-Speech</li>
                    <li>Auto-generated captions with timestamped sync</li>
                    <li>Scene image prompts for future AI art generation</li>
                    <li>Fast, seamless workflow — one-click from idea to story</li>
                </ul>
            </section>

            {/* Tech Stack */}
            <section>
                <h2 className="text-2xl font-bold mb-4"> 
                    <span role="img" aria-label="Laptop">💻{' '}</span>                
                    <span className="bg-gradient-to-r from-purple-400/80 to-cyan-400/80 bg-clip-text text-transparent">Tech Stack</span>
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Next.js (Frontend and API routes)</li>
                    <li>Firebase (Audio/image storage, authentication)</li>
                    <li>Neon DB (PostgreSQL, scalable database)</li>
                    <li>Google Text-to-Speech (AI voiceover)</li>
                    <li>AssemblyAI (Captioning and transcription)</li>
                </ul>
            </section>

            {/* Future Scopes */}
            <section>
                <h2 className="text-2xl font-bold mb-4">
                    <span role='img' aria-label="Rocket">🚀{' '}</span>
                    <span className="bg-gradient-to-r from-purple-400/80 to-cyan-400/80 bg-clip-text text-transparent">Future Scopes</span>
                </h2> 
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Full video compilation and export feature</li>
                    <li>Native in-app AI image & video generation</li>
                    <li>Multi-language scripts and captions</li>
                    <li>Animated transitions and music backing</li>
                    <li>Mobile app version</li>
                </ul>
            </section>

            {/* About Authors */}
            <section>
                    <h2 className="text-2xl font-bold mb-4">
                        <span role="img" aria-label="Waving Hand">👋</span>{' '}
                        <span className="bg-gradient-to-r from-purple-500/80 to-cyan-500/80 bg-clip-text text-transparent">
                            About the Authors
                        </span>
                    </h2>                
                    <div className="text-white/80 space-y-2">
                    <p>
                        <span className="font-semibold">Aaryan Bairagi</span> and <span className="font-semibold">Tanmay Chandgude</span> are undergraduate students at SPPU (Savitribai Phule Pune University), passionate developers and lifelong learners exploring AI, full-stack software, and creative problem-solving.
                    </p>
                    <p>
                        They believe the best tools empower anyone to bring their creative visions to life — QuickVid AI was built with that mission at heart.
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <div className="flex justify-center pt-4">
                    {/* <Link href="/">🚀 Try QuickVid AI Now</Link> */}
                    <Link href="/">
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-full 
                            bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 
                            text-white font-semibold shadow-lg
                            hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]
                            transition-all duration-300" >
                        <Sparkles className="w-4 h-4 animate-pulse" />
                            Try QuickVid AI Now
                        </button>
                    </Link>
            </div>
            </CardContent>
        </Card>
        </main>

      {/* Footer */}

    <footer className="mt-12 text-center text-white/50 text-sm border-t border-white/10 pt-6 ">
        <p className="mb-2 hover:text-white/80">Made with <span className="text-red-400">❤️</span> by Aaryan Bairagi &amp; Tanmay Chandgude</p>
    
        <div className="flex justify-center gap-1 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-cyan-300" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.21 11.43c.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61C4.82 18.73 4.18 18.5 4.18 18.5c-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.8 1.3 3.49.99.11-.77.41-1.3.75-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.63-2.81 5.66-5.49 5.95.42.36.8 1.09.8 2.2 0 1.6-.02 2.89-.02 3.28 0 .32.21.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <a 
            href="https://github.com/AaryanBairagi/QuickVid"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Project GitHub"
            className="flex items-center space-x-2 hover:text-cyan-400 transition-colors">
                GitHub
            </a>

        </div>

        <div className="text-white/50 hover:text-white/80">
            &copy; {new Date().getFullYear()} QuickVid AI &nbsp;|&nbsp; v-1.0
        </div>
    </footer>
    </div>
    );
}






