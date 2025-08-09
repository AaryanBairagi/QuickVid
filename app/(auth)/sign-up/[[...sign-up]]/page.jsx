import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center px-4 py-10">
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10">
        
        {/* Floating header */}
        <h2 className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl font-bold z-20 text-center">
          <span className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-transparent bg-clip-text">
            Sign Up
          </span>
          <span className="text-gray-900"> for QuickVid</span>
        </h2>

        {/* Left side image */}
        <div className="relative w-full md:w-1/2 hidden md:block">
          <Image
            src="/signIn.jpg"
            alt="Sign up illustration"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right side form */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-8 bg-[#f5f4f0]">
          <div className="w-full max-w-lg mt-20"> {/* mt-20 pushes form down so header floats above */}
            <SignUp
              appearance={{
                elements: {
                  rootBox: "flex justify-center w-full",
                  card: "bg-transparent border-0 shadow-none w-full",
                  headerTitle: "hidden", // Hide Clerk's default header
                  headerSubtitle: "hidden",
                  dividerLine: "bg-gray-300",
                  dividerText: "text-gray-500 text-sm",
                  socialButtonsBlockButton:
                    "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 rounded-lg",
                  socialButtonsProviderIcon: "filter brightness-0",
                  formFieldLabel: "text-gray-700 font-medium",
                  formFieldInput:
                    "bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg",
                  formFieldInputShowPasswordButton:
                    "text-gray-700 hover:text-cyan-600",
                  formButtonPrimary:
                    "bg-gradient-to-r from-cyan-500 to-cyan-700 hover:scale-105 transition-transform text-white font-semibold rounded-lg py-2 shadow-md",
                  footerActionText: "text-gray-700 text-sm",
                  footerActionLink:
                    "text-cyan-600 hover:text-cyan-800 transition-colors",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

