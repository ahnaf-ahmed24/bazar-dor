'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client'; 
import toast from 'react-hot-toast';


const categories = [
  { name: 'সব', slug: '', icon: '🌟' },
  { name: 'চাল', slug: 'চাল', icon: '🍚' },
  { name: 'ডাল', slug: 'ডাল', icon: '🫘' },
  { name: 'তেল', slug: 'তেল', icon: '🛢️' },
  { name: 'সবজি', slug: 'সবজি', icon: '🥬' },
  { name: 'মাছ', slug: 'মাছ', icon: '🐟' },
  { name: 'মাংস', slug: 'মাংস', icon: '🍗' },
  { name: 'ডিম-দুধ', slug: 'ডিম-দুধ', icon: '🥛' },
  { name: 'মসলা', slug: 'মসলা', icon: '🌶️' },
];

export default function Navbar() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const router = useRouter();

 
  const currentDate = new Date().toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });

  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগআউট হয়েছে!");
          setDropdownOpen(false);
          router.push("/signin");
          router.refresh();
        },
        onError: () => {
          toast.error("লগআউট করতে সমস্যা হয়েছে!");
        }
      },
    });
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
        {/* Top Row: Logo & Auth */}
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center bg-emerald-500 group-hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/25 overflow-hidden transition transform group-hover:scale-105">
              <Image
                src="/images/logo-icon.png"
                alt="বাজার দর লোগো"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">বাজার দর</span>
             
              <p className="text-xs text-gray-500 font-medium">{currentDate}</p>
            </div>
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="animate-pulse h-9 w-24 bg-gray-200 rounded-xl"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-gray-200 bg-gray-50/50 hover:bg-gray-100/80 rounded-full py-1.5 px-3.5 transition cursor-pointer shadow-2xs"
                >
                  <User className="w-4 h-4 text-emerald-700 bg-emerald-100 rounded-full p-0.5" />
                  <span className="text-sm font-semibold text-gray-700">{session.user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                    >
                      আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="text-sm font-medium px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium px-4.5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm transition transform hover:-translate-y-0.5"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Modern Category Pills with Icons */}
        <nav className="flex items-center justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto py-1.5 scrollbar-none border-t border-gray-100/80 whitespace-nowrap mt-4 mb-4">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.slug || (cat.name === 'সব' && !currentCategory);
            return (
              <Link
                key={cat.slug}
                href={cat.slug === '' ? '/' : `/?category=${encodeURIComponent(cat.slug)}`}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold scale-105'
                    : 'bg-gray-50/80 text-gray-600 border border-gray-200/60 hover:bg-emerald-50/60 hover:text-emerald-700 hover:border-emerald-200'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}