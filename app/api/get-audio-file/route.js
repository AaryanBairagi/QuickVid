import { NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";
import { storage } from "../../../configs/FireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.NEXT_TEXT_TO_SPEECH_KEY,
});

export async function POST(req) {
try {
    const { texts, id } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
        return NextResponse.json({ error: "No texts provided" }, { status: 400 });
    }

    const audioResults = [];

    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];

        const request = {
            input: { text },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
        };

        const [response] = await client.synthesizeSpeech(request);

      // Safer: use 'base64' decoding
        const audioBuffer = Buffer.from(response.audioContent, 'base64');

      // Unique file for each scene
        const storageRef = ref(storage, `QuickVid/${id}_${i}_${Date.now()}.mp3`);
        await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Uploaded scene audio:", downloadUrl);

        audioResults.push({
            text,
            audioUrl: downloadUrl,
            audioContent: response.audioContent // still base64
        });
    }

    return NextResponse.json({ audioResults });

    } catch (err) {
        console.error("TTS Error:", err);
        return NextResponse.json({ error: err.message || "Text-to-speech failed" },{ status: 500 });
    }
}








// import { NextResponse } from "next/server";
// import textToSpeech from "@google-cloud/text-to-speech";
// import storage from "../../../configs/FireBase";
// import { ref , getDownloadURL, uploadBytes } from "firebase/storage";

// const client = new textToSpeech.TextToSpeechClient({
//     apiKey: process.env.NEXT_TEXT_TO_SPEECH_KEY,
// });

// export async function POST(req) {
//     try {
//     const { texts , id } = await req.json();
//     const storageRef = ref(storage,'QuickVid/'+id+'.mp3');

//     if (!texts || !Array.isArray(texts) || texts.length === 0) {
//         return NextResponse.json({ error: "No texts provided" }, { status: 400 });
//     }

//     const audioResults = [];

//     for (let i=0; i<texts.length;i++) {

//         const text=texts[i];

//         const request = {
//             input: { text },
//             voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
//             audioConfig: { audioEncoding: "MP3" },
//         };

//         const [response] = await client.synthesizeSpeech(request);

//         const audioBuffer = Buffer.from(response.audioContent,'base64'); 

//         await uploadBytes(storageRef,audioBuffer,{contentType:"audio/mp3"});

//         const downloadUrl = await getDownloadURL(storageRef);
//         console.log(downloadUrl);

//         audioResults.push({
//             text,
//             audioUrl:downloadUrl,
//             audioContent: response.audioContent.toString("base64"), // Base64 audio string
//         });
//     }

//     return NextResponse.json({ audioResults });

//     } catch (err) {
//     console.error("TTS Error:", err);
//     return NextResponse.json({ error: err.message || "Text-to-speech failed" }, { status: 500 });
//     }
// }
