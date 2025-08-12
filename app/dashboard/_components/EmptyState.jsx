import { Button } from "../../../components/ui/button";
import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const EmptyState = () => {
return (
    <div className="p-10 py-24 flex flex-col items-center justify-center gap-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg text-center">
        <h2 className="text-lg text-white/50 hover:text-white/80">
            You don't have any short videos yet.
        </h2>
        <Link href="/dashboard/create-new">
            <button
            className="flex items-center gap-2 px-5 py-2 rounded-full 
                bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 
                text-white font-semibold shadow-lg
                hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]
                transition-all duration-300" >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Create Short Video
            </button>
        </Link>
    </div>
);
};

export default EmptyState;




// import { Button } from '@/components/ui/button'
// import React from 'react'
// import Link from 'next/link'

// const EmptyState = () => {
// return (
//     <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dotted gap-3'>
//         <h2>You don't have any short video created</h2>
//         <Link href={'/dashboard/create-new'}>
//         <Button className="bg-[#06b6d4] text-white hover:bg-[#0891b2] hover:text-white cursor-pointer">Create New Short Video</Button>
//         </Link>
//     </div>
// )
// }

// export default EmptyState