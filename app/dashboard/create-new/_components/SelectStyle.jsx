import Image from "next/image";
import React, { useState } from "react";
import { cn } from '../../../../lib/utils'

const SelectStyle = ({ onUserSelect }) => {
  const styleOptions = [
    { name: "Realistic", image: "/realistic.jpg" },
    { name: "Cartoon", image: "/cartoon.jpg" },
    { name: "Comic", image: "/comic.jpg" },
    { name: "Watercolor", image: "/watercolor.jpg" },
    { name: "Space", image: "/space.jpg" },
    { name: "Technology", image: "/technology.jpg" },
  ];

  const [selectedOption, setSelectedOption] = useState();

  const handleSelect = (name) => {
    setSelectedOption(name);
    onUserSelect("imageStyle", name);
  };

  return (
    <div className="mt-8">
      {/* Gradient Heading */}
      <h2
        className="
          text-3xl font-extrabold
          bg-gradient-to-r from-purple-400/80 to-cyan-400/80
          hover:from-purple-400/60 hover:to-cyan-400/60
          bg-clip-text text-transparent
          drop-shadow-lg mb-3
          select-none
        "
      >
        Style
      </h2>

      <p className="text-zinc-400 mb-6 select-none">Select your video style</p>

      <div className="grid grid-cols-5 gap-6">
        {styleOptions.map((item) => {
          const isActive = selectedOption === item.name;

          return (
            <div
              key={item.name}
              onClick={() => handleSelect(item.name)}
              className={cn(
                "cursor-pointer rounded-xl overflow-hidden border-2 bg-white/5 backdrop-blur-md shadow-lg transition transform select-none flex flex-col focus:outline-none",
                isActive
                  ? "border-purple-400 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                  : "border-transparent hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:scale-105"
              )}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(item.name);
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={500}
                className={cn(
                  "w-full h-40 object-cover rounded-t-xl select-none",
                  isActive
                    ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-black shadow-[0_0_25px_rgba(168,85,247,0.9)]"
                    : ""
                )}
                draggable={false}
                priority
              />
              <p className="text-center py-3 text-white font-semibold bg-black/30 backdrop-blur-sm select-none">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectStyle;






// const SelectStyle = ({ onUserSelect }) => {
//   const styleOptions = [
//     { name: "Realistic", image: "/realistic.jpg" },
//     { name: "Cartoon", image: "/cartoon.jpg" },
//     { name: "Comic", image: "/comic.jpg" },
//     { name: "Watercolor", image: "/watercolor.jpg" },
//     { name: "Space", image: "/space.jpg" },
//     { name: "Technology", image: "/technology.jpg" },
//   ];

//   const [selectedOption, setSelectedOption] = useState();

//   return (
//     <div className="mt-8">
//       {/* Gradient Heading */}
//       <h2
//         className="
//           text-3xl font-extrabold
//           bg-gradient-to-r from-purple-400/80 to-cyan-400/80
//           hover:from-purple-400/60 hover:to-cyan-400/60
//           bg-clip-text text-transparent
//           drop-shadow-lg mb-3
//           select-none
//         "
//       >
//         Style
//       </h2>

//       <p className="text-zinc-400 mb-6 select-none">Select your video style</p>

//       <div className="grid grid-cols-5 gap-6">
//         {styleOptions.map((item) => (
//           <div
//             key={item.name}
//             onClick={() => {
//               setSelectedOption(item.name);
//               onUserSelect("imageStyle", item.name);
//             }}
//             className={`
//               cursor-pointer
//               rounded-xl
//               overflow-hidden
//               border-2
//               bg-white/5
//               backdrop-blur-md
//               shadow-lg
//               transition
//               transform
//               hover:scale-105
//               hover:border-cyan-400
//               hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]
//               focus:outline-none
//               focus:ring-2
//               focus:ring-cyan-400
//               select-none
//               flex
//               flex-col
//               ${
//                 selectedOption === item.name
//                   ? "border-purple-500 scale-110 shadow-[0_0_25px_rgba(168,85,247,0.9)] focus:ring-purple-400"
//                   : "border-transparent"
//               }
//             `}
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 setSelectedOption(item.name);
//                 onUserSelect("imageStyle", item.name);
//               }
//             }}
//           >
//             <Image
//               src={item.image}
//               alt={item.name}
//               width={300}
//               height={500}
//               className={`w-full h-40 object-cover rounded-t-xl select-none ${
//                 selectedOption === item.name
//                   ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-black shadow-[0_0_25px_rgba(168,85,247,0.9)]"
//                   : ""
//               }`}
//               draggable={false}
//               priority={true}
//             />
//             <p className="text-center py-3 text-white font-semibold bg-black/30 backdrop-blur-sm select-none">
//               {item.name}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SelectStyle;
