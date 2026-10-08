import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// ১. MONGODB_URI না থাকলে ফলব্যাক হিসেবে ডামি URI দিন (যাতে বিল্ড ফেল না করে)
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/placeholder";

const client = new MongoClient(uri);
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