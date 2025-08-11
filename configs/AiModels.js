import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_GOOGLE_API_KEY); 

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

