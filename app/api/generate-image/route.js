import { NextResponse } from "next/server";
import Replicate from "replicate";
import { storage } from "../../../configs/FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function sanitizePrompt(prompt) {
    const bannedWords = [
        /blood/gi,
        /kill/gi,
        /weapon/gi,
        /nude/gi,
        /sex/gi,
        /gun/gi,
        /murder/gi,
    ];
    let safePrompt = prompt;
    bannedWords.forEach((banWord) => {
        safePrompt = safePrompt.replace(banWord, "safe");
    });
    return safePrompt;
}

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {
try {
    let { prompt } = await req.json();
    if (!prompt?.trim()) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    prompt = sanitizePrompt(prompt);
    if (!process.env.REPLICATE_API_TOKEN) {
        return NextResponse.json({ error: "Missing Replicate API Token" }, { status: 500 });
    }

    const model = "prunaai/flux.1-dev:b0306d92aa025bb747dc74162f3c27d6ed83798e08e5f8977adf3d859d0536a3";

    // Run the model
    const output = await replicate.run(model, {
        input: {
            prompt,
            width: 512,
            height: 512,
            num_inference_steps: 50,
            guidance_scale: 7.5,
        },
    });

    // Check if output is a ReadableStream (binary image data)
    if (output instanceof ReadableStream) {
      // Read the stream as binary buffer
        const reader = output.getReader();
        const chunks = [];
        let done, value;
        while (!done) {
            ({ done, value } = await reader.read());
            if (value) chunks.push(value);
        }
        const imgBuffer = Buffer.concat(chunks);

      // Upload buffer directly to Firebase
        const sanitizedFileName = prompt.replace(/\s+/g, "_").slice(0, 30);
        const fileName = `QuickVidImages/${sanitizedFileName}_${Date.now()}.png`;
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, imgBuffer, { contentType: "image/png" });
        const imageUrl = await getDownloadURL(storageRef);

        return NextResponse.json({ imageUrl });
    }

    // Otherwise, if output is URL or array or object containing URLs
    let imgUrl;
    if (Array.isArray(output)) {
        imgUrl = output[0];
    } else if (output?.predictions?.length > 0) {
        imgUrl = output.predictions[0];
    } else if (typeof output === "string") {
        imgUrl = output;
    } else {
        return NextResponse.json({ error: "Unrecognized model output format" }, { status: 500 });
    }

    // Fetch generated image URL and convert to buffer for Firebase upload
    const imgFetch = await fetch(imgUrl);
    if (!imgFetch.ok) {
        return NextResponse.json({ error: "Failed to download generated image" }, { status: 500 });
    }
    const imgBuffer = Buffer.from(await imgFetch.arrayBuffer());

    // Upload to Firebase Storage
    const sanitizedFileName = prompt.replace(/\s+/g, "_").slice(0, 30);
    const fileName = `QuickVidImages/${sanitizedFileName}_${Date.now()}.png`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, imgBuffer, { contentType: "image/png" });
    const imageUrlFirebase = await getDownloadURL(storageRef);

    return NextResponse.json({ imageUrl: imageUrlFirebase });
    } catch (error) {
    console.error("Replicate image generation error:", error);
    return NextResponse.json(
        { error: error.message || "Image generation failed" },
        { status: 500 }
    );
    }
}





///////////BACK-UP STABILITY-AI/stable-diffusion FOR IMAGE GENERATION JUST UNCOMMENT IT//////////////////////////////////////
// import { NextResponse } from "next/server";
// import Replicate from "replicate";
// import { storage } from "../../../configs/FireBase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// // Sanitize prompt to avoid sensitive terms causing API errors
// function sanitizePrompt(prompt) {
//     const bannedWords = [
//         /blood/gi,
//         /kill/gi,
//         /weapon/gi,
//         /nude/gi,
//         /sex/gi,
//         /gun/gi,
//         /murder/gi,
//     ];
    
//     let safePrompt = prompt;
//     bannedWords.forEach((banWord) => {
//         safePrompt = safePrompt.replace(banWord, "safe");
//     });
//     return safePrompt;
// }

// // Instantiate Replicate with your API token from env
// const replicate = new Replicate({
//     auth: process.env.REPLICATE_API_TOKEN,
// });

// export async function POST(req) {
// try {
//     let { prompt } = await req.json();
//     if (!prompt?.trim()) {
//         return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
//     }

//     // Clean potentially unsafe words from prompt
//     prompt = sanitizePrompt(prompt);

//     if (!process.env.REPLICATE_API_TOKEN) {
//         return NextResponse.json({ error: "Missing Replicate API Token" }, { status: 500 });
//     }

//     // Use Stable Diffusion model on Replicate (you can swap model ID here)
//     // const model = "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc";

//     // Run the model with parameters tuned for your video player size (512x512)
//     const output = await replicate.run(model, {
//         input: {
//             prompt,
//             width: 512,
//             height: 512,
//             num_inference_steps: 50,
//             guidance_scale: 7.5,
//         },
//     });

//     console.log("Replicate model output:", output);

//     if (!output || output.length === 0) {
//         return NextResponse.json({ error: "No image generated" }, { status: 500 });
//     }

//     // Fetch the generated image URL and convert to buffer for Firebase upload
//     // const imgUrl = output[0];

//     // If the output is an object with a `predictions` array
//     const imgUrl = output.predictions?.[0] || output[0] || output;
//     const imgFetch = await fetch(imgUrl);
//     if (!imgFetch.ok) {
//         return NextResponse.json({ error: "Failed to download generated image" }, { status: 500 });
//     }
//     const imgBuffer = Buffer.from(await imgFetch.arrayBuffer());

//     // Sanitize prompt for file name and upload to Firebase Storage
//     const sanitizedFileName = prompt.replace(/\s+/g, "_").slice(0, 30);
//     const fileName = `QuickVidImages/${sanitizedFileName}_${Date.now()}.png`;
//     const storageRef = ref(storage, fileName);

//     await uploadBytes(storageRef, imgBuffer, { contentType: "image/png" });
//     const imageUrl = await getDownloadURL(storageRef);

//     // Return the Firebase URL for use in your video scenes
//     return NextResponse.json({ imageUrl });
//     } catch (error) {
//         console.error("Replicate image generation error:", error);
//         return NextResponse.json(
//         { error: error.message || "Image generation failed" },
//         { status: 500 }
//         );
//     }
// }


















/////////////////////BACK-UP DEEPAI FOR IMAGE GENERATION JUST UNCOMMENT IT/////////////////////////////////////////////////////
// import { NextResponse } from "next/server";
// import { storage } from "../../../configs/FireBase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


// function sanitizePrompt(prompt){
//     const bannedWords = [
//         /blood/gi,
//         /kill/gi,
//         /weapon/gi,
//         /nude/gi,
//         /sex/gi,
//         /gun/gi,
//         /murder/gi
//     ];

//     let safePrompt = prompt;
//     bannedWords.forEach(banWord =>{
//         safePrompt = safePrompt.replace(banWord,"safe");
//     });

//     return safePrompt;
// }

// export async function POST(req) {
// try {
//     let { prompt } = await req.json();
//     if (!prompt?.trim()) {
//         return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
//     }

//     //Sanitize the prompt to avoid deepai sensitivity error
//     prompt = sanitizePrompt(prompt);

//     const deepAiKey = process.env.NEXT_DEEPAI_API_KEY;
//     if (!deepAiKey) {
//         return NextResponse.json({ error: "Missing DeepAI API Key" }, { status: 500 });
//     }

//     // Call DeepAI text2img for image generation
//     const deepaiRes = await fetch("https://api.deepai.org/api/text2img", {
//         method: "POST",
//         headers: {
//             "Api-Key": deepAiKey,
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({ text: prompt }),
//     });

//     if (!deepaiRes.ok) {
//         const errBody = await deepaiRes.text();
//         console.error("DeepAI API failed:", errBody);
//         return NextResponse.json({ error: "DeepAI API error: " + errBody }, { status: 500 });
//     }

//     const deepaiJson = await deepaiRes.json();
//     const output = deepaiJson.output_url;
//     if (!output) {
//         console.error("DeepAI responded without output URL:", deepaiJson);
//         return NextResponse.json({ error: "No image URL from DeepAI" }, { status: 500 });
//     }

//     // Download the image buffer
//     const imgFetch = await fetch(output);
//     if (!imgFetch.ok) {
//         console.error("Failed to download image from DeepAI URL:", output);
//         return NextResponse.json({ error: "Failed to download generated image" }, { status: 500 });
//     }
//     const imgBuffer = Buffer.from(await imgFetch.arrayBuffer());

//     // Upload to Firebase storage
//     const sanitized = prompt.replace(/\s+/g, "_").slice(0, 30);
//     const fileName = `QuickVidImages/${sanitized}_${Date.now()}.png`;
//     const storageRef = ref(storage, fileName);

//     await uploadBytes(storageRef, imgBuffer, { contentType: "image/png" });
//     const imageUrl = await getDownloadURL(storageRef);

//     return NextResponse.json({ imageUrl });

//     } catch (error) {
//         console.error("generate-image route error:", error);
//         return NextResponse.json(
//         { error: error.message || "Image generation failed" },
//         { status: 500 }
//         );
//     }
// }










