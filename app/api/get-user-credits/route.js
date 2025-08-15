import { db } from "../../../configs/db";
import { Users } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { getAuth  , currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
try {
    const { userId } = getAuth(req);
    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const userDetails = await currentUser();
    const email = userDetails?.primaryEmailAddress?.emailAddress; //since clerkId and user Id are different thats y checked based on email
    const [user] = await db.select().from(Users).where(eq(Users.email, email));
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    console.log("inside get-user-credits : " ,
            "credits_remaining", user.credits_remaining,
            "credits:", user.credits,
        );
    return new Response(
        JSON.stringify({
            creditsRemaining: user.credits_remaining,
            credits: user.credits,
        }),
        { status: 200 }
    );
    } catch (error) {
        console.error("Error fetching credits:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
