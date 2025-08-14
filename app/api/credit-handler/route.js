import { db } from "../../../configs/db";
import { Users } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { getAuth, currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
    const { userId } = getAuth(req);

    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userDetails = await currentUser();

    const email = userDetails?.primaryEmailAddress?.emailAddress;
    if (!email) {
        return new Response(JSON.stringify({ error: "Email not found" }), { status: 400 });
    }

    const [dbUser] = await db.select().from(Users).where(eq(Users.email, email));

    if (!dbUser) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

  // If you only want credits (and maybe tier):
    return new Response(
        JSON.stringify({ credits: dbUser.credits, tier: dbUser.tier }),
        { status: 200 }
    );
}




// import { auth } from "@clerk/nextjs/server";
// import { db } from "../../../configs/db";
// import { Users } from "../../../configs/schema";
// import { eq } from "drizzle-orm";

// export async function GET() {
//     const { userId } = auth();

//     if (!userId) {
//         return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//     }

//     const [user] = await db.select().from(Users).where(eq(Users.id, Number(userId)));

//     if (!user) {
//         return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//     }

//     return new Response(JSON.stringify(user), { status: 200 });
// }
