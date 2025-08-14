import Stripe from "stripe";
import { buffer } from "micro";
import { db } from "../../../configs/db";
import { Users } from "../../../configs/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Disable Next.js body parsing to get raw body for Stripe signature verification
export const config = {
    api: {
        bodyParser: false,
    },
};

function getCreditsForTier(tier) {
switch (tier) {
    case "Basic":
        return 10;
    case "Pro":
        return 100;
    case "Enterprise":
        return 999999;
    default:
        return 0;
    }
}

export async function POST(req) {
    const sig = req.headers.get("stripe-signature");
    const buf = await req.arrayBuffer();
    const rawBody = Buffer.from(buf);

    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "invoice.payment_succeeded") {
        const invoice = event.data.object;
        const planName = invoice.lines.data[0]?.price?.nickname;
        const customerId = invoice.customer;

    const [user] = await db
        .select()
        .from(Users)
        .where(eq(Users.stripeCustomerId, customerId));

    if (user && planName) {
        await db
            .update(Users)
            .set({
                tier: planName,
                credits: getCreditsForTier(planName),
            })
        .where(eq(Users.id, user.id));
        }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
}







// import Stripe from "stripe";
// import { buffer } from "micro";
// import { db } from "../../../configs/db";
// import { Users } from "../../../configs/schema";
// import { eq } from "drizzle-orm";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Map plan to credit amount
// function getCreditsForTier(tier) {
// switch (tier) {
//     case "Basic": return 10;
//     case "Pro": return 100;
//     case "Enterprise": return 999999; // unlimited
//     default: return 0;
//     }
// }

// // Required for raw body parsing with Stripe
// export const config = {
//     api: { bodyParser: false },
// };

// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//         res.setHeader("Allow", "POST");
//         return res.status(405).end("Method Not Allowed");
//     }

//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//         const buf = await buffer(req);
//         event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//         console.error("Webhook signature verification failed", err.message);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//   // Handle payment success / subscription renewal
//     if (event.type === "invoice.payment_succeeded") {
//         const invoice = event.data.object;

//         const planName = invoice.lines.data[0]?.price?.nickname; // Basic, Pro, Enterprise
//         const customerId = invoice.customer; // Stripe customer ID

//     // Find user using the stored stripeCustomerId
//     const [user] = await db
//         .select()
//         .from(Users)
//         .where(eq(Users.stripeCustomerId, customerId));

//     if (user) {
//         await db
//             .update(Users)
//             .set({
//                 tier: planName,
//                 credits: getCreditsForTier(planName),
//             })
//             .where(eq(Users.id, user.id));
//         }
//     }

//     res.json({ received: true });
// }
