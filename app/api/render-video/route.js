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







// import { db } from "../../../configs/db";
// import { VideoData } from "../../../configs/schema";
// import { eq } from "drizzle-orm";
// import { getAuth } from "@clerk/nextjs/server";
// import { renderMedia } from "@remotion/renderer";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../configs/FireBase"; // your firebase init
// import { v4 as uuidv4 } from "uuid";
// import fs from "fs";
// import path from "path";
// import os from "os";

// export async function POST(req) {
// try {
//     console.log("📥 [/api/render-video] Render request received");

//     const { userId } = getAuth(req);
//     console.log("🔑 Clerk userId:", userId);

//     if (!userId) {
//         console.warn("⚠️ Unauthorized request");
//         return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//     }

//     const { videoId } = await req.json();
//     console.log("🎯 Video ID from request:", videoId);

//     if (!videoId) {
//         console.error("❌ Missing videoId in body");
//         return new Response(JSON.stringify({ error: "Missing videoId" }), { status: 400 });
//     }

//     // Fetch video
//     const [videoRecord] = await db
//         .select()
//         .from(VideoData)
//         .where(eq(VideoData.id, videoId));

//     console.log("📦 Video record from DB:", videoRecord);

//     if (!videoRecord) {
//         return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
//     }

//     // Early exit if URL exists
//     if (videoRecord.videoUrl) {
//         console.log("💾 Video already has URL:", videoRecord.videoUrl);
//         return new Response(JSON.stringify({ success: true, videoUrl: videoRecord.videoUrl }));
//     }

//     // Scenes check
//     console.log("🎞 Scenes type:", Array.isArray(videoRecord.scenes));
//     console.log("🎞 Scenes length:", videoRecord.scenes?.length);
//     console.dir(videoRecord.scenes, { depth: 4 });

//     // Env + composition check
//     console.log("🌍 REMOTION_SERVE_URL:", process.env.REMOTION_SERVE_URL);
//     console.log("🆔 Composition to use:", "MainComposition");

//     // Output path
//     const tmpOutPath = path.join(os.tmpdir(), `${uuidv4()}.mp4`);
//     console.log("📂 Output path:", tmpOutPath);
    

//     //Cumulative Frames count
//     const fps = 30;
//     let cumulativeFrames = 0;
//     videoRecord.scenes.forEach(scene => {
//         let durationSeconds = 0;
//         if (scene.captions?.length > 0) {
//             durationSeconds = scene.captions[scene.captions.length - 1].end;
//         } else {
//             durationSeconds = 3;
//         }
//         if (durationSeconds > 50) durationSeconds /= 1000; // ms → s
//             cumulativeFrames += Math.ceil(durationSeconds * fps);
//     });

//     const totalFramesNeeded = cumulativeFrames;
//     console.log("Total Frames needed is :",totalFramesNeeded);

//     console.log("🛠 Scenes durations in seconds:");
//     videoRecord.scenes.forEach((scene, idx) => {
//     let endVal = scene.captions?.length > 0 
//         ? scene.captions[scene.captions.length - 1].end
//         : 3;
//     console.log(`Scene ${idx}: end=${endVal}, type=${typeof endVal}`);
//     });
//     console.log("➡ Total frames:", totalFramesNeeded);




//     // console.log("🚀 Starting renderMedia...");
//     // try{
//     // // await renderMedia({
//     // //     serveUrl: process.env.REMOTION_SERVE_URL,
//     // //     composition: "MainComposition",
//     // //     codec: "h264",
//     // //     outputLocation: tmpOutPath,
//     // //     inputProps: {
//     // //         scenes: videoRecord.scenes,
//     // //     },
//     // //     durationInFrames: totalFramesNeeded,
//     // //     fps: 30
//     // // });

//     // await renderMedia({
//     // serveUrl: process.env.REMOTION_SERVE_URL,
//     // composition: "MainComposition",
//     // codec: "h264",
//     // outputLocation: tmpOutPath,
//     // inputProps: {
//     //     scenes: videoRecord.scenes,
//     //     durationInFrames: totalFramesNeeded
//     // },
//     // durationInFrames: totalFramesNeeded,
//     // fps: 30
//     // });

//     // console.log("✅ renderMedia completed");
//     // }
//     // catch(error){
//     //     console.error("Error rendering the media. Exact Error:" , error);
//     //     throw error;
//     // }

//     // if (!fs.existsSync(tmpOutPath)) {
//     //     throw new Error("Render failed: output file not found");
//     // }

//     // Upload to Firebase
//     const fileBuffer = fs.readFileSync(tmpOutPath);
//     console.log("📤 File size:", fileBuffer.length, "bytes");

//     const fileRef = ref(storage, `videos/${videoId}.mp4`);
//     await uploadBytes(fileRef, fileBuffer, { contentType: "video/mp4" });

//     const publicUrl = await getDownloadURL(fileRef);
//     console.log("🌐 Public URL:", publicUrl);

//     await db.update(VideoData)
//         .set({ videoUrl: publicUrl })
//         .where(eq(VideoData.id, videoId));

//     console.log("💾 Saved videoUrl to DB");

//     return new Response(JSON.stringify({ success: true, videoUrl: publicUrl }));
//     } catch (error) {
//     console.error("❌ Error in /api/render-video:", error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
// }






// // // // export async function POST(req) {
// // // // try {
// // // //     const { userId } = getAuth(req);
// // // //     if (!userId) {
// // // //         return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
// // // //     }

// // // //     const { videoId } = await req.json();
// // // //     if (!videoId) {
// // // //         return new Response(JSON.stringify({ error: "Missing videoId" }), { status: 400 });
// // // //     }

// // // //     // 1️⃣ Fetch video scenes from DB
// // // //     const [videoRecord] = await db
// // // //         .select()
// // // //         .from(VideoData)
// // // //         .where(eq(VideoData.id, videoId));

// // // //     if (!videoRecord) {
// // // //         return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
// // // //     }

// // // //     // 2️⃣ If already has a videoUrl → return early
// // // //     if (videoRecord.videoUrl) {
// // // //         return new Response(JSON.stringify({ success: true, videoUrl: videoRecord.videoUrl }));
// // // //     }

// // // //     // 3️⃣ Set up local output path in /tmp (Vercel or local)
// // // //     const tmpOutPath = path.join("/tmp", `${uuidv4()}.mp4`);

// // // //     console.log("🎬 Rendering MP4 for", videoId);

// // // //     // 4️⃣ Render video using Remotion
// // // //     await renderMedia({
// // // //       serveUrl: process.env.REMOTION_SERVE_URL, // URL to your deployed Remotion project
// // // //       composition: "MainComposition",          // ID from your Remotion root
// // // //         codec: "h264",
// // // //         outputLocation: tmpOutPath,
// // // //         inputProps: {
// // // //         scenes: videoRecord.scenes,
// // // //         },
// // // //     });

// // // //     // 5️⃣ Upload to Firebase Storage
// // // //     const fileBuffer = fs.readFileSync(tmpOutPath);
// // // //     const fileRef = ref(storage, `videos/${videoId}.mp4`);
// // // //     await uploadBytes(fileRef, fileBuffer, { contentType: "video/mp4" });

// // // //     // 6️⃣ Get public download URL from Firebase
// // // //     const publicUrl = await getDownloadURL(fileRef);

// // // //     // 7️⃣ Save videoUrl to DB
// // // //     await db
// // // //         .update(VideoData)
// // // //         .set({ videoUrl: publicUrl })
// // // //         .where(eq(VideoData.id, videoId));

// // // //     console.log("✅ Video rendered & saved:", publicUrl);

// // // //     return new Response(JSON.stringify({ success: true, videoUrl: publicUrl }));
// // // //     } catch (error) {
// // // //         console.error("❌ Error rendering video:", error);
// // // //         return new Response(JSON.stringify({ error: error.message }), { status: 500 });
// // // //     }
// // // // }
