import { db } from "../../../configs/db";
import { VideoData } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { getAuth } from "@clerk/nextjs/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../configs/FireBase";
import fs from "fs";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { renderMedia } from "@remotion/renderer";

export async function POST(req) {
  try {
    console.log("📥 [/api/render-video] Render request received");

    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { videoId } = await req.json();
    if (!videoId) {
      return new Response(JSON.stringify({ error: "Missing videoId" }), { status: 400 });
    }

    // 1️⃣ Fetch video record
    const [videoRecord] = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    if (!videoRecord) {
      return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
    }

    if (videoRecord.videoUrl) {
      return new Response(JSON.stringify({ success: true, videoUrl: videoRecord.videoUrl }));
    }

    // 2️⃣ Render the MP4 from Remotion
    const outputPath = path.join(os.tmpdir(), `${uuidv4()}.mp4`);
    console.log(outputPath);


    await renderMedia({
      serveUrl: process.env.REMOTION_SERVE_URL, // e.g. http://localhost:3000
      composition: "MainComposition",
      codec: "h264",
      outputLocation: outputPath,
      inputProps: { scenes: videoRecord.scenes },
    });

    console.log("🎬 Video rendered at:", outputPath);

    // 3️⃣ Upload to Firebase
    const fileBuffer = fs.readFileSync(outputPath);
    const fileRef = ref(storage, `videos/${uuidv4()}.mp4`);
    await uploadBytes(fileRef, fileBuffer, { contentType: "video/mp4" });

    const publicUrl = await getDownloadURL(fileRef);

    // 4️⃣ Save to DB
    await db
      .update(VideoData)
      .set({ videoUrl: publicUrl })
      .where(eq(VideoData.id, videoId));

    console.log("✅ Saved videoUrl to DB:", publicUrl);

    // 5️⃣ Return URL
    return new Response(JSON.stringify({ success: true, videoUrl: publicUrl }));
  } catch (error) {
    console.error("❌ Error rendering or uploading video:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}






//ONLY to svae the sample mp4 file in db 
// import { db } from "../../../configs/db";
// import { VideoData } from "../../../configs/schema";
// import { eq } from "drizzle-orm";
// import { getAuth } from "@clerk/nextjs/server";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../configs/FireBase"; // your firebase init
// import fs from "fs";
// import path from "path";
// import os from "os";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req) {
//   try {
//     console.log("📥 [/api/render-video] Upload request received");

//     const { userId } = getAuth(req);
//     if (!userId) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//     }

//     const { videoId } = await req.json();
//     if (!videoId) {
//       return new Response(JSON.stringify({ error: "Missing videoId" }), { status: 400 });
//     }

//     // 1️⃣ Fetch from DB
//     const [videoRecord] = await db
//       .select()
//       .from(VideoData)
//       .where(eq(VideoData.id, videoId));

//     if (!videoRecord) {
//       return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
//     }

//     // 2️⃣ If already has a videoUrl → return early
//     if (videoRecord.videoUrl) {
//       return new Response(JSON.stringify({ success: true, videoUrl: videoRecord.videoUrl }));
//     }

//     // 3️⃣ Pick a local video file to upload (TEMP for testing)
//     //    Replace this with your actual file path
//     const localFilePath = path.join(process.cwd(), "public", "sample.mp4"); 
//     if (!fs.existsSync(localFilePath)) {
//       throw new Error(`Test video file not found at ${localFilePath}`);
//     }

//     const fileBuffer = fs.readFileSync(localFilePath);
//     console.log("📤 File size:", fileBuffer.length, "bytes");

//     // 4️⃣ Upload to Firebase
//     const fileRef = ref(storage, `videos/${uuidv4()}.mp4`);
//     await uploadBytes(fileRef, fileBuffer, { contentType: "video/mp4" });

//     const publicUrl = await getDownloadURL(fileRef);

//     // 5️⃣ Save to DB
//     await db
//         .update(VideoData)
//         .set({ videoUrl: publicUrl })
//         .where(eq(VideoData.id, videoId));

//     console.log("✅ Saved videoUrl to DB:", publicUrl);

//     return new Response(JSON.stringify({ success: true, videoUrl: publicUrl }));
//     } catch (error) {
//     console.error("❌ Error uploading video:", error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
// }







