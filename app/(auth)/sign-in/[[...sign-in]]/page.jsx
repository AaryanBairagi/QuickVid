import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">

      {/* Left: Image side */}
        <div className="relative w-full h-screen hidden md:block">
            <Image
            src="/signIn.jpg"
            alt="login"
            layout="fill"
            objectFit="cover"
            className="rounded-r-3xl shadow-2xl" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white text-center px-6">
                    Welcome Back to <span className="text-white">QuickVid AI</span>
                </h1>
            </div>
        </div>

      {/* Right: Sign In */}
        <div className="flex flex-col items-center justify-center px-6 py-12 md:px-12">
            <div className="w-full max-w-lg from-white/10 to-white/5 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Sign in to your account
                </h2>
            <SignIn />
            </div>
                <p className="mt-6 text-sm text-white/60 text-center">
                    Don’t have an account? Sign up on the next screen.
                </p>
        </div>
    </div>
);
}
