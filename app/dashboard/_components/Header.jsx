"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch("/api/credit-handler");
        if (res.ok) {
          const data = await res.json();
          setCredits(data.credits);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };
    if (user) fetchCredits();
  }, [user]);

  return (
    <div className="flex items-center justify-between px-6 py-4 w-full">
      {/* LEFT: Credits */}
      <div className="flex-shrink-0 flex items-center gap-1">
        <span className="text-sm text-white/70 font-semibold select-none underline underline-offset-4 decoration-cyan-400">Credits:</span>
        <span className="bg-black text-white px-2 py-0.5 rounded font-bold ml-1">{credits !== null ? credits : "--"}</span>
      </div>

      {/* CENTER: Links */}
      <div className="flex items-center justify-center gap-15 flex-1">
        <Link
          href="/help"
          className="text-sm font-semibold text-white/70 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-400 hover:decoration-purple-400 transition-colors duration-200"
        >
          Help & FAQ
        </Link>
        <Link
          href="/contact"
          className="text-sm text-white/70 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-400 hover:decoration-purple-400 transition-colors duration-200"
        >
          Contact Us
        </Link>
        <Link
          href="/scripts"
          className="text-sm text-white/70 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-400 hover:decoration-purple-400 transition-colors duration-200"
        >
          Scripts
        </Link>
      </div>

      {/* RIGHT: Username and avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm text-white/70 hover:text-cyan-400 hidden sm:block">
          {user?.fullName || "Guest"}
        </span>
        <img
          src={user?.imageUrl || "/default-avatar.png"}
          alt="avatar"
          className="w-9 h-9 rounded-full border border-white/20 object-cover"
        />
      </div>
    </div>
  );
};

export default Header;





// "use client";
// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";

// const Header = () => {
//   const { user } = useUser();
//   const [credits, setCredits] = useState(null);

//   useEffect(() => {
//     const fetchCredits = async () => {
//       try {
//         const res = await fetch("/api/credit-handler");
//         if (res.ok) {
//           const data = await res.json();
//           setCredits(data.credits);
//         }
//       } catch (error) {
//         console.error("Error fetching credits:", error);
//       }
//     };
//     if (user) fetchCredits();
//   }, [user]);

//   return (
//     <div className="flex items-center justify-between px-6 py-4">
//       {/* User Section */}
//       <div className="flex items-center gap-3">
//         {credits !== null && (
//           <span className="text-sm text-cyan-400 font-semibold">
//             {credits} credits
//           </span>
//         )}
//         <span className="text-sm text-white/70 hidden sm:block">
//           {user?.fullName || "Guest"}
//         </span>
//         <img
//           src={user?.imageUrl || "/default-avatar.png"}
//           alt="avatar"
//           className="w-9 h-9 rounded-full border border-white/20 object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;






