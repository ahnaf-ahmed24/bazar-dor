"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F0] flex flex-col items-center p-4 pt-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">আমার প্রোফাইল</h2>
        <p className="text-sm text-gray-500 mb-6">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        
        <hr className="mb-6 border-gray-200" />

        <div className="flex justify-between items-center">
          <div>
            {/* ডায়নামিক ইউজারের নাম ও ইমেইল */}
            <h3 className="text-xl font-semibold text-gray-800">
              {session?.user?.name || "নাম পাওয়া যায়নি"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {session?.user?.email || "ইমেইল পাওয়া যায়নি"}
            </p>
          </div>

          <Link 
            href="/profile/update" 
            className="px-4 py-2 bg-[#008236] text-white text-sm font-medium rounded-lg hover:bg-[#006c2d] transition"
          >
            আপডেট করুন
          </Link>
        </div>
      </div>

      <Link href="/" className="text-sm text-gray-500 mt-6 hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}