"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Basic",
        price: "Free",
        features: [
        "5 videos per month",
        "Basic video templates",
        "Standard quality exports",
        "Community support",
        ],
    },
    {
        name: "Pro",
        price: "$9.99",
        period: "/month",
        features: [
        "100 videos per month",
        "All video templates",
        "HD quality exports",
        "Priority support",
        "Custom branding",
        "Advanced analytics",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$29.99",
        features: [
        "Unlimited Videos",
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "Team collaboration",
        "API access",
        "Custom solutions",
        ],
    },
];

export default function UpgradePage() {
    const [currentPlan, setCurrentPlan] = useState(null);

  // Fetch current tier/plan name from your backend
    useEffect(() => {
        const fetchPlan = async () => {
        try {
            const res = await fetch("/api/credit-handler");
            if (res.ok) {
            const data = await res.json();
            setCurrentPlan(data.tier); // assuming the API returns { tier: "Enterprise", ... }
            }
        } catch (err) {
            console.error("Failed to fetch current plan", err);
            }
        };
        fetchPlan();
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-10 text-white/90">Choose Your Plan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {plans.map((plan) => (
                <div
                    key={plan.name}
                    className={`
                    rounded-xl border
                    p-8
                    flex flex-col
                    bg-white/5 backdrop-blur-md
                    transition-shadow duration-300
                    ${
                        plan.popular
                        ? "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.7)]"
                        : "border-white/20 shadow-sm"
                    }
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.7)]
                `}>
                {plan.popular && (
                <div
                    className="
                    mb-6
                    px-4 py-1
                    rounded-full
                    bg-gradient-to-r from-purple-400 to-pink-500
                    text-white font-semibold text-sm
                    shadow-[0_0_8px_rgba(168,85,247,0.8)]
                    w-max
                ">
                Most Popular
                </div>
                )}
                <h2 className="text-3xl font-bold mb-3 text-white">{plan.name}</h2>
                <div className="mb-8 flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-white">
                        {plan.price}
                    </span>
                    {plan.period && (
                        <span className="text-gray-400 text-lg font-semibold">{plan.period}</span>
                    )}
                </div>
                <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/90 text-lg">
                        <Check className="h-6 w-6 text-cyan-400" />
                        <span>{feature}</span>
                    </li>
                    ))}
                </ul>
                {/* Button logic now uses currentPlan */}
                <Button
                disabled={plan.name.toLowerCase() === currentPlan?.toLowerCase()}
                className={`
                w-full text-lg font-semibold
                ${
                    plan.name.toLowerCase() === currentPlan?.toLowerCase()
                        ? "bg-gray-700 text-gray-300 cursor-not-allowed shadow-none"
                        : plan.popular
                        ? "bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 shadow-lg"
                        : "bg-cyan-500 hover:bg-cyan-600 shadow-md"
                        }
                        transition-all duration-300
                        rounded-lg
                    `}>
                    {plan.name.toLowerCase() === currentPlan?.toLowerCase() ? "Current Plan" : "Get Started"}
                </Button>
            </div>
            ))}
        </div>
    </div>
    );
}

