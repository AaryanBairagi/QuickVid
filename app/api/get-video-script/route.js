import { NextResponse } from "next/server";
import { geminiModel } from "../../../configs/AiModels";

export async function POST(req) {
    const { topic, imageStyle, duration } = await req.json();

    try {
        if (!topic || !imageStyle || !duration) {
        return NextResponse.json(
            { error: "Missing required fields", details: { topic, imageStyle, duration } },
            { status: 400 }
        );
    }

// const prompt = `Write a video script for a short ${duration} video on the topic "${topic}".
//                 The video should follow a "${imageStyle}" style. Break the video down into multiple scenes.
//                 For each scene, provide the following in JSON format:
//                 - imagePrompt: A visual prompt to generate a realistic AI image for the scene. 
//                 IMPORTANT: The image prompt must be 100% safe for AI generation:
//                 • No sexual, violent, gory, hateful, or unsafe content.
//                 • Use neutral and family-friendly language.
//                 • Replace unsafe concepts with safe, artistic alternatives.
//                 - contentText: The narration or content for that scene.

// Make the tone engaging, visually descriptive, and completely safe for all audiences.
// Output ONLY a JSON array of scenes with no extra text before or after.`;

const prompt = `Write a video script for a short ${duration} video on the topic "${topic}".  
                The video should follow a "${imageStyle}" style. Break the video down into multiple scenes.  

                Each scene should have:  
                - imagePrompt: A visual prompt to generate a realistic AI image for the scene.  
                - contentText: The narration or content for that scene.  

                    IMPORTANT:  
                - The image prompt must be 100% safe for AI generation:  
                • No sexual, violent, gory, hateful, or unsafe content.  
                • Use neutral and family-friendly language.  
                • Replace unsafe concepts with safe, artistic alternatives.  
                
                - When the topic involves political figures or famous celebrities, include recognizable traits, settings, and respectful portrayals ensuring adherence to ethical guidelines and neutrality.  

                Make the tone engaging, visually descriptive, and suitable for all audiences.  
                Output ONLY a JSON array of scenes with no extra text before or after.`;


    const result = await geminiModel.generateContent(prompt);
    const textResponse = await result.response.text();

    // Clean & parse JSON safely
    const cleanText = textResponse.trim().replace(/^[^{\[]*/, "").replace(/[^}\]]*$/, "");
    let jsonResponse;

    try {
        jsonResponse = JSON.parse(cleanText);
    } catch (error) {
        console.error("Failed to parse Gemini output:", textResponse);
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
// import { geminiModel } from "../../../configs/AiModels";

// export async function POST(req) {
//     const { topic, imageStyle, duration } = await req.json();

//     console.log("API key exists?", !!process.env.NEXT_GOOGLE_API_KEY);
//     console.log("Received body:", { topic, imageStyle, duration });

//     try {
//         // Input validation
//         if (!topic || !imageStyle || !duration) {
//             return NextResponse.json(
//                 { error: "Missing required fields", details: { topic, imageStyle, duration } },
//                 { status: 400 }
//             );
//         }

//         const prompt = `Write a video script for a short ${duration} video on the topic "${topic}". The video should follow a "${imageStyle}" style. Break the video down into multiple scenes.
//         For each scene, provide the following in JSON format:
//         - imagePrompt: A visual prompt to generate a realistic AI image for the scene
//         - contentText: The narration or content for that scene.
//         Make the tone engaging and visually descriptive. Output ONLY a JSON array of scenes.`;

//         console.log("Sending prompt to Gemini...");

//         const result = await geminiModel.generateContent(prompt);

//         // Make sure we await text()
//         const textResponse = await result.response.text();
//         console.log("Raw Gemini output:", textResponse);

//         // Clean & parse JSON
//         const cleanText = textResponse.trim().replace(/^[^{\[]*/, "").replace(/[^}\]]*$/, "");
//         let jsonResponse;

//         try {
//             jsonResponse = JSON.parse(cleanText);
//         } catch (error) {
//             console.error("Failed to parse Gemini text into JSON format. Raw:", textResponse);
//             return NextResponse.json({ error: "Invalid JSON output" }, { status: 500 });
//         }

//         return NextResponse.json({ result: jsonResponse });

//     } catch (err) {
//         console.error("Error generating video script:", err);
//         return NextResponse.json(
//             { error: err.message || "Something went wrong", details: err.stack },
//             { status: 500 }
//         );
//     }
// }
