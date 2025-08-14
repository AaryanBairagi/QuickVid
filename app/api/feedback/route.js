import { db } from "../../../configs/db";
import { UserFeedback } from "../../../configs/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }

    // Insert feedback into DB
    await db.insert(UserFeedback).values({
        name,
        email,
        message,
    });

    return NextResponse.json(
        { success: true, message: "Feedback submitted successfully" },
        { status: 200 }
    );
    } catch (err) {
        console.error("❌ Error saving feedback:", err);
        return NextResponse.json(
        { error: "Failed to submit feedback" },
        { status: 500 }
        );
    }
}
