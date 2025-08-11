import { NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.NEXT_TEXT_TO_SPEECH_KEY,
});

export async function POST(req) {
    try {
    const { texts } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
        return NextResponse.json({ error: "No texts provided" }, { status: 400 });
    }

    const audioResults = [];

    for (const text of texts) {
        const request = {
            input: { text },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
        };

        const [response] = await client.synthesizeSpeech(request);
        audioResults.push({
            text,
            audioContent: response.audioContent.toString("base64"), // Base64 audio string
        });
    }

    return NextResponse.json({ audioResults });
    } catch (err) {
    console.error("TTS Error:", err);
    return NextResponse.json({ error: err.message || "Text-to-speech failed" }, { status: 500 });
    }
}
