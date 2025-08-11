import { NextResponse } from "next/server";
import { geminiModel } from "../../../configs/AiModels";

export async function POST(req) {
    const { topic, imageStyle, duration } = await req.json();

    console.log("API key exists?", !!process.env.NEXT_GOOGLE_API_KEY);
    console.log("Received body:", { topic, imageStyle, duration });

    try {
        // Input validation
        if (!topic || !imageStyle || !duration) {
            return NextResponse.json(
                { error: "Missing required fields", details: { topic, imageStyle, duration } },
                { status: 400 }
            );
        }

        const prompt = `Write a video script for a short ${duration} video on the topic "${topic}". The video should follow a "${imageStyle}" style. Break the video down into multiple scenes.
        For each scene, provide the following in JSON format:
        - imagePrompt: A visual prompt to generate a realistic AI image for the scene
        - contentText: The narration or content for that scene.
        Make the tone engaging and visually descriptive. Output ONLY a JSON array of scenes.`;

        console.log("Sending prompt to Gemini...");

        const result = await geminiModel.generateContent(prompt);

        // Make sure we await text()
        const textResponse = await result.response.text();
        console.log("Raw Gemini output:", textResponse);

        // Clean & parse JSON
        const cleanText = textResponse.trim().replace(/^[^{\[]*/, "").replace(/[^}\]]*$/, "");
        let jsonResponse;

        try {
            jsonResponse = JSON.parse(cleanText);
        } catch (error) {
            console.error("Failed to parse Gemini text into JSON format. Raw:", textResponse);
            return NextResponse.json({ error: "Invalid JSON output" }, { status: 500 });
        }

        return NextResponse.json({ result: jsonResponse });

    } catch (err) {
        console.error("Error generating video script:", err);
        return NextResponse.json(
            { error: err.message || "Something went wrong", details: err.stack },
            { status: 500 }
        );
    }
}









// import { NextResponse } from "next/server";
// import {geminiModel} from "../../../configs/AiModels"
// export async function POST(req){
//     const { topic , imageStyle , duration } = await req.json();
    
// try{
//     //input validation
//     if(!topic || !imageStyle || !duration){
//         return NextResponse.json({error:"Missing required fields" , details:{topic,imageStyle,duration}},{status:400});
//     }

//     const prompt = `Write a video script for a short ${duration} video on the topic "${topic}". The video should follow a "${imageStyle}" style. Break the video down into multiple scenes. 
//     For each scene, provide the following in JSON format:
//     - imagePrompt: A visual prompt to generate a realistic AI image for the scene
//     - contentText: The narration or content for that scene.
//     Make the tone engaging and visually descriptive. Output ONLY a JSON array of scenes.`;

//     const result = await geminiModel.generateContent(prompt);

//     //GEMINI sends text form so parsed it to json
//     const textResponse = await result.response.text();
//     console.log(textResponse);
    
//     const cleanText = textResponse.trim().replace(/^[^{\[]*/, "").replace(/[^}\]]*$/, "");
//     let jsonResponse;

//     try{
//         jsonResponse=JSON.parse(cleanText);
//     }catch(error){
//         console.log('Failed to parse gemini text into json format');
//         return NextResponse.json({error:"Invalid JSON output"} , {status:500});
//     }

//     return NextResponse.json({result:jsonResponse});
    
// }catch(err){
//         console.log('Error generating video script');
//         return NextResponse.json(
//                 { error: err.message || "Something went wrong" },
//                 { status: 500 }
//             );
//     }
// }