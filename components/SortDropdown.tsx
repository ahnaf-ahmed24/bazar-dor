'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortDropdown({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">সাজান</span>
      <div className="relative inline-block">
        <select
          defaultValue={currentSort}
          onChange={(e) => {
            const val = e.target.value;
            const params = new URLSearchParams(searchParams.toString());
            
            if (val === 'default') {
              params.delete('sort');
            } else {
              params.set('sort', val);
            }
            
            // router.push ব্যবহার করা হয়েছে এবং scroll: false দেওয়া হয়েছে যাতে পেজ রিলোড বা উপরে স্ক্রোল না হয়
            router.push(`?${params.toString()}`, { scroll: false });
          }}
          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
          <option value="change-desc">সর্বাধিক পরিবর্তন</option>
        </select>
      </div>
    </div>
  );
}