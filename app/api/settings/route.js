import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { Pool } from "pg";

// Connect to Neon DB
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// GET user settings
export async function GET(req) {
try {
    const { userId } = getAuth(req);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await pool.query(
        "SELECT settings FROM user_settings WHERE user_id = $1 LIMIT 1",
        [userId]
    );

    if (result.rows.length === 0) {
      // return defaults if no settings found
        return NextResponse.json({
            settings: {
            emailNotifications: true,
            darkMode: false,
            autoSave: true,
            videoQuality: "high",
            exportFormat: "mp4",
        },
        });
    }

    return NextResponse.json({ settings: result.rows[0].settings });
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

// POST update user settings
export async function POST(req) {
try {
    const { userId } = getAuth(req);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newSettings = await req.json();

    await pool.query(
        `INSERT INTO user_settings (user_id, settings)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO UPDATE SET settings = EXCLUDED.settings`,
        [userId, newSettings]
    );

    return NextResponse.json({ message: "Settings saved successfully" });
    } catch (error) {
        console.error("Error saving settings:", error);
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
    }
}
