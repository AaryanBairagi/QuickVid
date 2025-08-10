import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfilePage() {
return (
    <main className="max-w-4xl mx-auto p-8 h-[800px] flex items-center justify-center bg-gradient-to-r from-purple-500/40 to-cyan-400/40">
        <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 bg-clip-text text-transparent
            border border-white/10 backdrop-blur-md rounded-2xl shadow-lg w-500 transition-transform duration-300 hover:scale-[1.01]">
            <CardContent className="p-8 text-white">
                <UserProfile />
            </CardContent>
        </Card>
    </main>
);
}
