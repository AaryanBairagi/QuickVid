"use client";
import React, { useState } from "react";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { cn } from "../../../../lib/utils"

const SelectTopic = ({ onUserSelect }) => {
  const options = [
    "Custom Prompt",
    "Random AI",
    "Horror",
    "Historical",
    "Motivational",
    "Bed Time",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    if (value !== "Custom Prompt") {
      onUserSelect("topic", value);
      setCustomPrompt("");
    }
  };

  const handleCustomPromptChange = (e) => {
    const val = e.target.value;
    setCustomPrompt(val);
    onUserSelect("topic", val);
  };

  return (
    <div className="mt-8">
      {/* Gradient Heading */}
      <h2
        className="
          font-bold text-3xl
          bg-gradient-to-r from-purple-400/80 to-cyan-400/80
          hover:from-purple-400/60 hover:to-cyan-400/60
          bg-clip-text text-transparent
          drop-shadow-lg mb-1
        "
      >
        Create New
      </h2>
      <p className="text-gray-400 mb-4">
        Got a topic in mind for today's video?
      </p>

      {/* Select Dropdown */}
      <Select onValueChange={handleSelectChange} value={selectedOption}>
        <SelectTrigger
          className="
            w-full mt-2 p-4 text-md rounded-xl
            border border-white/10
            bg-white/5 backdrop-blur-md
            text-white
            shadow-lg
            transition-all duration-300
            hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]
            hover:border-cyan-400
            focus:ring-2 focus:ring-cyan-400/60
            focus:outline-none
          "
        >
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>

        <SelectContent
          className="
            bg-white/5 backdrop-blur-md
            border border-white/10
            rounded-xl
            shadow-lg
            p-2 space-y-1
          "
        >
          {options.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className={cn(
                "rounded-lg px-4 py-2 transition-all duration-300 cursor-pointer text-white",
                "hover:bg-white/10 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]",
                selectedOption === item &&
                  "bg-white/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
              )}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Custom Prompt Textarea */}
      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="
            mt-4
            bg-white/5 backdrop-blur-md
            border border-white/10
            focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/60
            placeholder:text-gray-500
            rounded-xl
            px-4 py-3
            text-white
            transition-all duration-300
            shadow-lg
            hover:shadow-[0_0_15px_rgba(34,211,238,0.8)]
          "
          value={customPrompt}
          onChange={handleCustomPromptChange}
          placeholder="Got an idea? Let's turn it into a video!  NOTE: Please do not use sensitive or explicit words."
          rows={4}
        />
      )}
    </div>
  );
};

export default SelectTopic;






// const SelectTopic = ({ onUserSelect }) => {
//   const options = [
//     "Custom Prompt",
//     "Random AI",
//     "Horror",
//     "Historical",
//     "Motivational",
//     "Bed Time",
//   ];

//   const [selectedOption, setSelectedOption] = useState("");
//   const [customPrompt, setCustomPrompt] = useState("");

//   const handleSelectChange = (value) => {
//     setSelectedOption(value);
//     if (value !== "Custom Prompt") {
//       onUserSelect("topic", value);
//       setCustomPrompt(""); // Clear custom prompt input if switching from it
//     }
//   };

//   const handleCustomPromptChange = (e) => {
//     const val = e.target.value;
//     setCustomPrompt(val);
//     onUserSelect("topic", val);
//   };

//   return (
//     <div>
//         <h2
//         className="
//             font-bold text-3xl
//             bg-gradient-to-r from-purple-400/80 to-cyan-400/80
//             hover:from-purple-400/60 hover:to-cyan-400/60
//             bg-clip-text text-transparent
//             drop-shadow-lg
//             mb-1">
//             Create New
//         </h2>
//         <p className="text-gray-300 mb-4">
//             Got a topic in mind for today's video?
//         </p>

//     <Select onValueChange={handleSelectChange} value={selectedOption}>
//         <SelectTrigger
//         className="
//             w-full mt-2 p-4 text-md rounded-lg
//             border border-white/60
//             text-white
//             shadow-[0_0_10px_rgba(34,211,238,0.7)]
//             transition-all duration-300
//             hover:shadow-[0_0_20px_rgba(34,211,238,1)]
//             hover:border-cyan-400
//             focus:ring-2 focus:ring-cyan-400/60
//             focus:outline-none
//         "
//         >
//           <SelectValue placeholder="Content-Type" />
//         </SelectTrigger>

//         <SelectContent className="bg-gray-900 text-white rounded-md shadow-lg">
//           {options.map((item, index) => (
//             <SelectItem
//   key={index}
//   value={item}
//   className="
//     cursor-pointer
//     rounded-md
//     px-4 py-2
//     select-none
//     transition
//     duration-200
//     text-white
//     hover:bg-gray-300/40
//     hover:text-white
//     focus:bg-cyan-100/60
//     focus:text-white
//     focus:outline-none
//   "
// >
//   {item}
// </SelectItem>

//           ))}
//         </SelectContent>
//       </Select>

//       {selectedOption === "Custom Prompt" && (
//         <Textarea
//           className="
//             mt-4
//             bg-gray-900
//             border border-cyan-600
//             focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/60
//             placeholder:text-gray-500
//             shadow-[0_0_10px_rgba(34,211,238,0.7)]
//             hover:shadow-[0_0_15px_rgba(34,211,238,0.9)]
//             cursor-pointer
//             rounded-md
//             px-4 py-2
//             select-none
//             transition
//             duration-200
//             text-white
//             hover:bg-gray-300/40
//         hover:text-white
//         focus:bg-cyan-100/60
//         focus:text-white
//         focus:outline-none
//           "
//           value={customPrompt}
//           onChange={handleCustomPromptChange}
//           placeholder="Got an idea? Let's turn it into a video!"
//           rows={4}
//         />
//       )}
//     </div>
//   );
// };

// export default SelectTopic;
