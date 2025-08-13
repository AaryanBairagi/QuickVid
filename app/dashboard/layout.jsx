"use client";
import React from "react";
import Header from "./_components/Header";
import SideBar from "./_components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0c0c0c] text-white">
      {/* Sidebar: always fills entire screen height */}
      <div className="h-screen w-28 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0c0c0c] border-r border-white/10 bg-white/5 backdrop-blur-lg flex-shrink-0">
        <SideBar />
      </div>
      {/* Main Area: allow content to scroll only */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Top Info Bar */}
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
          <Header />
        </div>
        {/* Page Content */}
        <main className="p-6 space-y-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;









// "use client";
// import React from "react";
// import Header from "./_components/Header";
// import SideBar from "./_components/Sidebar";

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex min-h-screen h-full bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0c0c0c] text-white">
//       {/* Sidebar - scrollable */}
//       <div className="h-full w-28 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0c0c0c] border-r border-white/10 bg-white/5 backdrop-blur-lg">
//         <SideBar />
//       </div>

//       {/* Main Area - scrollable */}
//       <div className="flex flex-col flex-1 overflow-y-auto">
//         {/* Top Info Bar */}
//         <div className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
//           <Header />
//         </div>

//         {/* Page Content */}
//         <main className="p-6 space-y-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
