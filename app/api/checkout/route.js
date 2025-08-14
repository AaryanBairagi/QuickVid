import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
try {
    const { plan } = await req.json();

    if (!plan) {
        return NextResponse.json({ error: "Plan is required" }, { status: 400 });
    }

    // Map plan names to Stripe Price IDs from your .env
    const priceMap = {
        Pro: process.env.STRIPE_PRICE_PRO, // e.g. price_xxx from Stripe
        Enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
    };

    const priceId = priceMap[plan];
    if (!priceId) {
        return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade`,
    });

    return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("Checkout Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
