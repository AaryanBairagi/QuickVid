import { NextResponse } from "next/server";
import { storage } from "../../../configs/FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function sanitizePrompt(prompt){
    const bannedWords = [
        /blood/gi,
        /kill/gi,
        /weapon/gi,
        /nude/gi,
        /sex/gi,
        /gun/gi,
        /murder/gi
    ];

    let safePrompt = prompt;
    bannedWords.forEach(banWord =>{
        safePrompt = safePrompt.replace(banWord,"safe");
    });

    return safePrompt;
}

export async function POST(req) {
try {
    let { prompt } = await req.json();
    if (!prompt?.trim()) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    //Sanitize the prompt to avoid deepai sensitivity error
    prompt = sanitizePrompt(prompt);

    const deepAiKey = process.env.NEXT_DEEPAI_API_KEY;
    if (!deepAiKey) {
        return NextResponse.json({ error: "Missing DeepAI API Key" }, { status: 500 });
    }

    // Call DeepAI text2img for image generation
    const deepaiRes = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
            "Api-Key": deepAiKey,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ text: prompt }),
    });

    if (!deepaiRes.ok) {
        const errBody = await deepaiRes.text();
        console.error("DeepAI API failed:", errBody);
        return NextResponse.json({ error: "DeepAI API error: " + errBody }, { status: 500 });
    }

    const deepaiJson = await deepaiRes.json();
    const output = deepaiJson.output_url;
    if (!output) {
        console.error("DeepAI responded without output URL:", deepaiJson);
        return NextResponse.json({ error: "No image URL from DeepAI" }, { status: 500 });
    }

    // Download the image buffer
    const imgFetch = await fetch(output);
    if (!imgFetch.ok) {
        console.error("Failed to download image from DeepAI URL:", output);
        return NextResponse.json({ error: "Failed to download generated image" }, { status: 500 });
    }
    const imgBuffer = Buffer.from(await imgFetch.arrayBuffer());

    // Upload to Firebase storage
    const sanitized = prompt.replace(/\s+/g, "_").slice(0, 30);
    const fileName = `QuickVidImages/${sanitized}_${Date.now()}.png`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, imgBuffer, { contentType: "image/png" });
    const imageUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ imageUrl });

    } catch (error) {
        console.error("generate-image route error:", error);
        return NextResponse.json(
        { error: error.message || "Image generation failed" },
        { status: 500 }
        );
    }
}










// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { NextResponse } from "next/server";
// import { storage } from "../../../configs/FireBase";

// export async function POST(req){
// try{
//     const { prompt } = await req.json();

//     if(!prompt || prompt.trim()==="") return NextResponse.json( {error:"No prompt provided"} , {status:400} );

//     const deepAiKey = process.env.NEXT_DEEPAI_API_KEY;
//     if(!deepAiKey){
//         return NextResponse.json( {error:"Missing DeepAI Api Key"} , {status:500} );
//     }

//     const response  = await fetch("https://api.deepai.org/api/text2img",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/x-www-form-urlencoded",
//             "Api-Key":deepAiKey
//         },
//         body: new URLSearchParams({text:prompt})
//     });

//     if(!response.ok){
//         const errorText = await response.text();
//         return NextResponse.json( {error:`DeepAi API error : ${errorText}`}, {status:500} );
//     }

//     const data = await response.json();

//     if(!data.output_url) return NextResponse.json( {error:"No image url returned from DeepAI"},{status:500} );

//     // Download image bytes from DeepAI output URL
//     const imageResponse = await fetch(data.output_url);
//     if(!imageResponse.ok) return NextResponse.json({error:"Failed to download the generated image"},{status:500}); 

//     const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    
//     // Upload to Firebase Storage with unique filename
//     const sanitizedPrompt = prompt.replace(/\s+/g, "_").slice(0, 20);
//     const timestamp = Date.now();
//     const storageRef = ref(storage, `QuickVidImages/${sanitizedPrompt}_${timestamp}.png`);
    
//     await uploadBytes(storageRef,imageBuffer,{ contentType:"image/png" });

//     const firebaseImageUrl = await getDownloadURL(storageRef);

//     return NextResponse.json({imageUrl:firebaseImageUrl});
    
//     }catch(error){
//         console.log("DeepAI image generation & upload error:", error);
//         return NextResponse.json({ error: error.message || "Image generation/upload failed" }, { status: 500 });
//     }
// }