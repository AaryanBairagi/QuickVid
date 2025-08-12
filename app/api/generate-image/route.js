import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";
import { storage } from "../../../configs/FireBase";

export async function POST(req){
try{
    const { prompt } = await req.json();

    if(!prompt || prompt.trim()==="") return NextResponse.json( {error:"No prompt provided"} , {status:400} );

    const deepAiKey = process.env.NEXT_DEEPAI_API_KEY;
    if(!deepAiKey){
        return NextResponse.json( {error:"Missing DeepAI Api Key"} , {status:500} );
    }

    const response  = await fetch("https://api.deepai.org/api/text2img",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Api-Key":deepAiKey
        },
        body: new URLSearchParams({text:prompt})
    });

    if(!response.ok) return NextResponse.json( {error:`DeepAi API error : ${errorText}`}, {status:500} );

    const data = await response.json();

    if(!data.output_url) return NextResponse.json( {error:"No image url returned from DeepAI"},{status:500} );

    // Download image bytes from DeepAI output URL
    const imageResponse = await fetch(data.output_url);
    if(!imageResponse.ok) return NextResponse.json({error:"Failed to download the generated image"},{status:500}); 

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    
    // Upload to Firebase Storage with unique filename
    const sanitizedPrompt = prompt.replace(/\s+/g, "_").slice(0, 20);
    const timestamp = Date.now();
    const storageRef = ref(storage, `QuickVidImages/${sanitizedPrompt}_${timestamp}.png`);
    
    await uploadBytes(storageRef,imageBuffer,{ contentType:"image/png" });

    const firebaseImageUrl = await getDownloadURL(storageRef);

    return NextResponse.json({imageUrl:firebaseImageUrl});
    
    }catch(error){
        console.log("DeepAI image generation & upload error:", error);
        return NextResponse.json({ error: error.message || "Image generation/upload failed" }, { status: 500 });
    }
}