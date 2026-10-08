'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

interface ProductCardProps {
  slug: string;
  emoji: string;
  name: string;
  unit: string;
  price: number;
  change: { dir: string; pct: number };
}

export default function ProductCard({
  slug,
  emoji,
  name,
  unit,
  price,
  change,
}: ProductCardProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession(); 
  
  const isUp = change?.dir === 'up';
  const isDown = change?.dir === 'down';
  const changeSymbol = isUp ? '▲' : isDown ? '▼' : '—';
  const changeText = `${changeSymbol} ${change?.pct || 0}%`;

  const handleCardClick = (e: React.MouseEvent) => {

    if (!session) {
      e.preventDefault(); 
      toast.error("বিস্তারিত দেখতে প্রথমে লগইন করুন!");
      router.push('/signin');
    }
  };

  return (
    <Link
      href={`/product/${slug}`}
      onClick={handleCardClick}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 group block cursor-pointer"
    >

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-2xl border border-gray-100 group-hover:scale-105 transition-transform">
          {emoji || '📦'}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">প্রতি {unit}</p>
        </div>
      </div>


      <div className="flex justify-between items-end border-t border-gray-100 pt-3">
        <div>
          <p className="text-[11px] text-gray-400">আজকের দাম</p>
          <p className="text-sm font-bold text-gray-800">{price} টাকা</p>
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-0.5 ${
            isUp
              ? 'text-red-600 bg-red-50'
              : isDown
              ? 'text-emerald-600 bg-emerald-50'
              : 'text-gray-600 bg-gray-100'
          }`}
        >
          {changeText}
        </span>
      </div>
    </Link>
  );
}