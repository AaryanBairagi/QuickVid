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
    console.log("🔑 Clerk userId:", userId);

    if (!userId) {
      console.warn("❌ Unauthorized: no userId returned");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();
    console.log("📦 Request body:", body);
    const { videoId } = body;
    if (!videoId) {
      console.error("❌ Missing videoId in request body");
      return new Response(JSON.stringify({ error: "Missing videoId" }), { status: 400 });
    }

    // 1️⃣ Fetch video record
    console.log("🔍 Fetching video record from DB for ID:", videoId);
    const [videoRecord] = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    console.log("📀 videoRecord from DB:", videoRecord);

    if (!videoRecord) {
      console.warn("❌ No video found for ID:", videoId);
      return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
    }

    if (videoRecord.videoUrl) {
      console.log("💾 Video already has URL, skipping render:", videoRecord.videoUrl);
      return new Response(JSON.stringify({ success: true, videoUrl: videoRecord.videoUrl }));
    }

    // Convert scenes to real array if needed
    let scenesArray = videoRecord.scenes;

    if (typeof scenesArray === "string") {
      try {
        scenesArray = JSON.parse(scenesArray);
      } catch (err) {
        console.error("❌ Failed to parse scenes JSON:", err);
        return new Response(JSON.stringify({ error: "Invalid scenes format" }), { status: 500 });
      }
    }

    if (!Array.isArray(scenesArray) && typeof scenesArray === "object" && scenesArray !== null) {
      scenesArray = Object.values(scenesArray);
    }
    console.log("✅ scenesArray isArray:", Array.isArray(scenesArray), "Length:", scenesArray.length);

    // 2️⃣ Calculate totalFramesNeeded robustly
    const fps = 30;
    let totalDurationSeconds = 0;

    for (const scene of scenesArray) {
      let sceneDuration = 3; // default 3 seconds fallback
      if (Array.isArray(scene.captions) && scene.captions.length > 0) {
        let endVal = Number(scene.captions[scene.captions.length - 1].end);
        if (isNaN(endVal) || endVal <= 0) endVal = 3;
        if (endVal > 50) endVal = endVal / 1000; // likely milliseconds convert to seconds
        sceneDuration = endVal;
      }
      totalDurationSeconds += sceneDuration;
    }

    const totalFramesNeeded = Math.ceil(totalDurationSeconds * fps);
    console.log("▶️ Total frames calculated:", totalFramesNeeded);

    // Output path for render
    const outputPath = path.join(os.tmpdir(), `${uuidv4()}.mp4`);
    console.log("🛠 Output path for render:", outputPath);

    // 3️⃣ Render the MP4 from Remotion
    console.log("🚀 Starting Remotion renderMedia...");
    await renderMedia({
      serveUrl: process.env.REMOTION_SERVE_URL,
      composition: "MainComposition",
      codec: "h264",
      outputLocation: outputPath,
      inputProps: { scenes: scenesArray },
      durationInFrames: totalFramesNeeded,
      fps,
    });
    console.log("✅ Remotion render complete.");

    if (!fs.existsSync(outputPath)) {
      console.error("❌ Render output file does not exist:", outputPath);
      return new Response(JSON.stringify({ error: "Render failed: no file" }), { status: 500 });
    }

    // 4️⃣ Upload to Firebase
    console.log("📤 Reading file buffer for upload...");
    const fileBuffer = fs.readFileSync(outputPath);
    console.log("📏 Buffer size:", fileBuffer.length, "bytes");

    const firebasePath = `videos/${uuidv4()}.mp4`;
    console.log("🌐 Firebase storage path:", firebasePath);
    const fileRef = ref(storage, firebasePath);

    try {
      console.log("⬆ Uploading to Firebase...");
      await uploadBytes(fileRef, fileBuffer, { contentType: "video/mp4" });
      console.log("✅ Upload to Firebase complete.");
    } catch (err) {
      console.error("❌ Firebase upload failed:", err);
      throw err;
    }

    let publicUrl;
    try {
      publicUrl = await getDownloadURL(fileRef);
      console.log("🔗 Firebase public URL:", publicUrl);
    } catch (err) {
      console.error("❌ Failed to get public URL from Firebase:", err);
      throw err;
    }

    // 5️⃣ Save to DB
    console.log("💾 Updating DB with videoUrl...");
    await db
      .update(VideoData)
      .set({ videoUrl: publicUrl })
      .where(eq(VideoData.id, videoId));

    console.log("✅ Saved videoUrl to DB:", publicUrl);

    return new Response(JSON.stringify({ success: true, videoUrl: publicUrl }));
  } catch (error) {
    console.error("🔥 Fatal error in /api/render-video:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}







