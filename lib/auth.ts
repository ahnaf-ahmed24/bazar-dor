import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI টি .env.local অথবা Hosting (Vercel)-এ যুক্ত করা হয়নি!");
}


const client = new MongoClient(uri);
const db = client.db("bazar_dor"); 

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {  
        enabled: true,
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID || "", 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", 
        },
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID || "", 
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "", 
        },
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"],
        }
    },
});