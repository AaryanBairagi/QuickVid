import { db } from "../../../configs/db";
import { Users } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { getAuth , currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
try {
    const { userId } = getAuth(req);
    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { creditsUsed } = await req.json();
    if (typeof creditsUsed !== "number" || creditsUsed <= 0) {
        return new Response(JSON.stringify({ error: "Invalid credits used" }), { status: 400 });
    }

    const userDetails = await currentUser();
    const email  = userDetails?.primaryEmailAddress.emailAddress;
    const [user] = await db.select().from(Users).where(eq(Users.email, email));
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const newRemaining = user.credits_remaining - creditsUsed;
    if (newRemaining < 0) {
        return new Response(JSON.stringify({ error: "Insufficient credits" }), { status: 400 });
    }

    await db
        .update(Users)
        .set({ credits_remaining: newRemaining })
        .where(eq(Users.email, email));

    return new Response(
        JSON.stringify({ creditsRemaining: newRemaining, creditsTotal: user.credits }),
        { status: 200 }
    );
    } catch (error) {
        console.error("Error updating credits:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
