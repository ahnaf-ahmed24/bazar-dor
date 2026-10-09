import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";

// Global cached client থেকে database সংগৃহীত হচ্ছে
const client = await clientPromise;
const db = client.db("bazar_dor");

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {  
        enabled: true,
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder", 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder", 
        },
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID || "placeholder", 
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "placeholder", 
        },
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"],
        }
    },
});