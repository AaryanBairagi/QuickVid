import React from "react";
import { UserProfile , SignOutButton } from "@clerk/nextjs";
import { Card, CardContent } from "../../../../components/ui/card";

export default function UserProfilePage() {
return (
    <main className="max-w-4xl mx-auto p-8 h-[800px] flex items-center justify-center bg-gradient-to-r from-purple-500/40 to-cyan-400/40">
        <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 bg-clip-text text-transparent
            border border-white/10 backdrop-blur-md rounded-2xl shadow-lg w-500 transition-transform duration-300 hover:scale-[1.01]">
            <CardContent className="p-8 text-white">
                <UserProfile />
                <SignOutButton>
                <button className="mt-6 px-5 py-1.5 flex items-center gap-1 rounded-md bg-gray-600 hover:bg-red-500 transition-colors duration-200 font-semibold">
                    Sign Out
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2} >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                    </svg>
                </button>
                </SignOutButton>
            </CardContent>
        </Card>
    </main>
);
}
