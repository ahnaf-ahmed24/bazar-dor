import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/db";


const client = await clientPromise.catch((err) => {
  console.error("MongoDB connection failed in auth.ts:", err);
  return null;
});

const db = client ? client.db("bazar_dor") : null;

export const auth = betterAuth({
  database: db ? mongodbAdapter(db) : undefined,
  

  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
  

  trustedOrigins: [
    "https://bazar-dor-khaki.vercel.app",
    "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  ].filter(Boolean),

  advanced: {
  
    crossSubDomainCookies: {
      enabled: true,
    },
  },

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
    },
  },
});