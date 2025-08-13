import { db } from "../../../configs/db";
import { VideoData } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
try {
    // 1️⃣ Authenticate user via Clerk
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Fetch full user details
    const user = await currentUser();
    const createdBy =
        user?.fullName ||
        user?.username ||
        user?.primaryEmailAddress?.emailAddress ||
        "Unknown User";

    // 3️⃣ Parse and validate request body
    const { scenes } = await req.json();
    if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
        return NextResponse.json({ error: "Invalid scenes array" }, { status: 400 });
    }

    // 4️⃣ Insert into database
    const result = await db
        .insert(VideoData)
        .values({
        scenes, // Make sure 'scenes' column in schema is jsonb
        createdBy,
        })
        .returning();

    console.log("✅ Video inserted successfully:", result[0]);

    // 5️⃣ Return success response
    return NextResponse.json({ success: true, data: result[0] });
    } catch (error) {
    console.error("❌ Error saving video:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
}





// import { db } from "configs/db";
// import { VideoData } from "configs/schema";
// import { NextResponse } from "next/server";

// export async function POST(req){
//     try{
//         const { scenes,createdBy } = await req.json();
//         if(!scenes || !Array.isArray(scenes) || scenes.length === 0){
//             return NextResponse.json({error:"Invalid scenes array"},{status:400});
//         }

//         const result = await db.insert(VideoData).values({
//             scenes,
//             createdBy,
//         }).returning();

//         console.log("Video inserted successfully:", result[0]);
//         return NextResponse.json({ success: true, data: result[0] });

//     }catch(error){
//     console.log("Error saving video:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });    }
// }