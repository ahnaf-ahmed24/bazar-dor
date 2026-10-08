"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
        router.push("/signin");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
        setLoading(false);
      }
    });
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/"
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F0] flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">রেজিস্ট্রেশন</h2>
        <p className="text-center text-sm text-gray-500 mb-6">নতুন অ্যাকাউন্ট তৈরি করুন বাজার দরের সাথে থাকতে।</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-[#008236] text-white font-semibold rounded-lg hover:bg-[#006c2d] transition"
          >
            {loading ? "তৈরি হচ্ছে..." : "রেজিস্ট্রেশন করুন"}
          </button>
        </form>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-2">
          <button 
            onClick={() => handleSocialLogin("google")}
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            <FcGoogle size={20} /> Google দিয়ে চালিয়ে যান
          </button>
          <button 
            onClick={() => handleSocialLogin("github")}
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            <FaGithub size={20} /> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#008236] font-semibold hover:underline">সাইন ইন করুন</Link>
        </p>
      </div>
      <Link href="/" className="text-sm text-gray-500 mt-4 hover:underline">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}