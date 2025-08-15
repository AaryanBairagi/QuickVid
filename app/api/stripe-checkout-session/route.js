import Stripe from "stripe";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { db } from "../../../configs/db";
import { Users } from "../../../configs/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const { userId } = getAuth(req);
    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userDetails = await currentUser();
    const email = userDetails?.primaryEmailAddress?.emailAddress;
    if (!email) {
        return new Response(JSON.stringify({ error: "Email not found" }), { status: 400 });
    }

    const { plan } = await req.json();
    if (!plan) {
        return new Response(JSON.stringify({ error: "No plan specified" }), { status: 400 });
    }

  // Find user by email
    const [user] = await db.select().from(Users).where(eq(Users.email, email));
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    let stripeCustomerId = user.stripeCustomerId;

  // Create Stripe customer if missing and store in DB
    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: user.email,
            name: user.name,
        });
    await db
        .update(Users)
        .set({ stripeCustomerId: customer.id })
        .where(eq(Users.email, user.email));
        stripeCustomerId = customer.id;
    }

  // Map plan names to Stripe Price IDs (set these in your environment variables)
    const planPriceIds = {
        Pro: process.env.STRIPE_PRICE_PRO,
        Enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
    };

    const priceId = planPriceIds[plan];
    if (!priceId) {
        return new Response(JSON.stringify({ error: "Plan not available" }), { status: 400 });
    }

  // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
}
