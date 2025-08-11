// Install the assemblyai package by executing the command "npm install assemblyai"
//AssemblyAI cannot accept base64 directly — it must be a publicly accessible URL to the MP3 file so first stored in firebase storage

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const client = new AssemblyAI({
    apiKey: process.env.CAPTION_API ,
});


export async function POST(req){
try{
    const { audioUrl } = await req.json();
    if(!audioUrl) return NextResponse.json({error:"No audio URL provided"} , {status:400});

    //Start Transcription
    const transcript = await client.transcripts.transcribe({ 
            audio_url: audioUrl,
            speech_model:"universal"
    });

    let completedTranscript = transcript;
    while(
        completedTranscript.status!=="completed" && completedTranscript.status!=="error"
    ){
        await new Promise((r)=> setTimeout(r,3000));
        completedTranscript = await client.transcripts.get(transcript.id);
    }

    if(completedTranscript.status==='error'){
        return NextResponse.json({error:"Transcription Failed" , details: completedTranscript.error}, {status:500});
    }

    return NextResponse.json({
        text: completedTranscript.text,
        captions: completedTranscript.words || []
    });



}catch(error){
    console.log("Caption Generation Error");
    return NextResponse.json({error: error.message || "Caption generation failed"},{status:500});
}
}
