// app/contact/page.jsx
"use client";
import React, { useState } from "react";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200); // Simulate API call
  };

  return (
    <div className="md:px-12 py-10 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="h-8 w-8 text-purple-400" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Contact & Feedback
        </h1>
      </div>
      {!sent ? (
        <form
          onSubmit={handleSubmit}
          className="bg-[#191b24] border border-white/10 rounded-2xl shadow-md p-8 flex flex-col gap-5"
        >
          <input
            className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none"
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none"
            type="email"
            placeholder="Your Email"
            required
          />
          <textarea
            className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none"
            placeholder="How can we help you? Your message, suggestion, or bug report..."
            rows={4}
            required
          />
          <button
            disabled={loading}
            className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow hover:from-cyan-400 hover:to-purple-400 transition"
            type="submit"
          >
            {loading ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      ) : (
        <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-8 text-center text-white text-xl font-semibold shadow">
          🎉 Thank you! Your feedback has been received!
        </div>
      )}
    </div>
  );
}


// // app/contact/page.jsx
// "use client";
// import React, { useState } from "react";
// import { Mail } from "lucide-react";

// export default function ContactPage() {
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setSent(true);
//       setLoading(false);
//     }, 1200); // Simulate API call
//   };

//   return (
//     <div className="md:px-12 py-10 max-w-lg mx-auto">
      
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-6">
//         <Mail className="h-8 w-8 text-purple-400" />
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//           Contact & Feedback
//         </h1>
//       </div>

//       {/* Meet the Makers Section */}
//       <div className="bg-white/5 border border-white/20 rounded-xl mb-8 p-6 flex flex-col items-center">
//         <h2 className="text-lg font-bold text-cyan-400 mb-3">Meet the Makers</h2>
//         <div className="flex flex-col sm:flex-row items-center gap-6">
//           {/* Your Info */}
//           <div className="flex flex-col items-center">
//             <img
//               src="/images/you.jpg" // Replace with your actual image path
//               alt="Your Name"
//               className="w-16 h-16 rounded-full mb-2 border-2 border-cyan-400 shadow"
//             />
//             <div className="font-semibold text-white">Your Name</div>
//             <div className="text-xs text-white/60">Co-Founder, Backend & UI Engineer</div>
//             <div className="text-[13px] mt-1 text-white/70">
//               Loves building with React and GenAI.
//             </div>
//           </div>
//           {/* Partner Info */}
//           <div className="flex flex-col items-center">
//             <img
//               src="/images/partner.jpg" // Replace with your partner's image path
//               alt="Partner Name"
//               className="w-16 h-16 rounded-full mb-2 border-2 border-purple-400 shadow"
//             />
//             <div className="font-semibold text-white">Partner Name</div>
//             <div className="text-xs text-white/60">Co-Founder, Prompt Architect</div>
//             <div className="text-[13px] mt-1 text-white/70">
//               Writes magical prompts and manages AI workflows.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feedback Form */}
//       {!sent ? (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-[#191b24] border border-white/10 rounded-2xl shadow-md p-8 flex flex-col gap-5"
//         >
//           <input
//             className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none"
//             type="text"
//             placeholder="Your Name"
//             required
//           />
//           <input
//             className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none"
//             type="email"
//             placeholder="Your Email"
//             required
//           />
//           <textarea
//             className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none"
//             placeholder="How can we help you? Your message, suggestion, or bug report..."
//             rows={4}
//             required
//           />
//           <button
//             disabled={loading}
//             className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow hover:from-cyan-400 hover:to-purple-400 transition"
//             type="submit"
//           >
//             {loading ? "Sending..." : "Send Feedback"}
//           </button>
//         </form>
//       ) : (
//         <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-8 text-center text-white text-xl font-semibold shadow">
//           🎉 Thank you! Your feedback has been received!
//         </div>
//       )}
//     </div>
//   );
// }
