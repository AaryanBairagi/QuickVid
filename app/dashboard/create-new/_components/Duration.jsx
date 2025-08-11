"use client"
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { cn } from '../../../../lib/utils'


const Duration = ({ onUserSelect }) => {
    const [selectedOption, setSelectedOption] = useState();

return (
    <div className="mt-7">
      {/* Gradient heading like Style selector */}
        <h2
            className="
            text-3xl font-extrabold
            bg-gradient-to-r from-purple-400/80 to-cyan-400/80
            hover:from-purple-400/60 hover:to-cyan-400/60
            bg-clip-text text-transparent
            drop-shadow-lg mb-3
            select-none">

        Duration
        </h2>
        <p className="text-zinc-400 mb-6 select-none">
            Select the duration of your video
        </p>

        <Select
            onValueChange={(value) => {
            setSelectedOption(value);
            onUserSelect("duration", value);
            }}>
            <SelectTrigger
                className={cn(
                "w-full mt-2 p-6 text-md rounded-xl border-2 bg-white/5 backdrop-blur-md shadow-lg transition transform focus:outline-none",
                selectedOption
                ? "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-105"
                : "border-transparent hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
            )}>
                <SelectValue placeholder="Select Duration" />
            </SelectTrigger>

            {/* <SelectContent>
                <SelectItem value="30 seconds">30 seconds</SelectItem>
                <SelectItem value="45 seconds">45 seconds</SelectItem>
                <SelectItem value="60 seconds">60 seconds</SelectItem>
                <SelectItem value="90 seconds">90 seconds</SelectItem>
            </SelectContent> */}

            <SelectContent
                className="
                bg-white/5 
                backdrop-blur-md 
                border border-white/10 
                text-white/80
                rounded-xl 
                shadow-lg 
                p-2 
                space-y-1">
                {[
                    "30 seconds",
                    "45 seconds",
                    "60 seconds",
                    "90 seconds"
                ].map((duration) => (
                    <SelectItem
                        key={duration}
                        value={duration}
                        className={cn(
                                    "rounded-lg px-4 py-2 transition-all duration-300 cursor-pointer",
                                    "hover:bg-white/50 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]",
                                    selectedOption === duration &&
                                    "bg-white/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                                    )}>
                        {duration}
                    </SelectItem>
                ))}
            </SelectContent>


        </Select>
    </div>
);
};

export default Duration;





