import { db } from "../../../configs/db";
import { VideoData } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { getAuth, currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
    console.log("📥 [API] /api/save-video called");

try {
    const { userId } = getAuth(req);
    console.log("🔑 Clerk userId:", userId);

    if (!userId) {
        console.warn("⚠️ Unauthorized attempt to save video");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    console.log("👤 Clerk user object:", user);

    const createdBy =
        user?.fullName ||
        user?.username ||
        user?.primaryEmailAddress?.emailAddress ||
        "Unknown User";

    console.log("📝 createdBy field will be:", createdBy);

    // Parse request body — now includes optional videoUrl
    const { scenes, videoUrl } = await req.json();
    if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
        console.error("❌ Invalid scenes array");
        return NextResponse.json({ error: "Invalid scenes array" }, { status: 400 });
    }

    const result = await db
        .insert(VideoData)
        .values({
        scenes,
        videoUrl: videoUrl || null, // ✅ store URL if provided
        createdBy,
        })
        .returning();

    console.log("✅ Video inserted successfully:", result);

    return NextResponse.json({ success: true, data: result[0] });
    } catch (error) {
        console.error("❌ Error saving video:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}






// import { db } from "../../../configs/db";
// import { VideoData } from "../../../configs/schema";
// import { NextResponse } from "next/server";
// // import { auth, currentUser } from "@clerk/nextjs/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { currentUser } from "@clerk/nextjs/server";

// export async function POST(req) {
//     console.log("📥 [API] /api/save-video called");

// try {
//     // 1️⃣ Authenticate user via Clerk

//     // const { userId } = auth();

//     const { userId } = getAuth(req);
//     console.log("🔑 Clerk userId:", userId);

//     if (!userId) {
//         console.warn("⚠️ Unauthorized attempt to save video");
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 2️⃣ Fetch full user details
//     const user = await currentUser();
//     console.log("👤 Clerk user object:", user);

//     const createdBy =
//         user?.fullName ||
//         user?.username ||
//         user?.primaryEmailAddress?.emailAddress ||
//         "Unknown User";

//     console.log("📝 createdBy field will be:", createdBy);

//     // 3️⃣ Parse and validate request body
//     const { scenes } = await req.json();
//     if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
//         console.error("❌ Invalid scenes array");
//         return NextResponse.json({ error: "Invalid scenes array" }, { status: 400 });
//     }

//     // 4️⃣ Insert into database
//     const result = await db
//         .insert(VideoData)
//         .values({
//         scenes, 
//         createdBy,
//         })
//         .returning();

//     console.log("✅ Video inserted successfully:", result);

//     // 5️⃣ Return success response
//     return NextResponse.json({ success: true, data: result[0] });
//     } catch (error) {
//     console.error("❌ Error saving video:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }



