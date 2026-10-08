'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CategoryPage() {
  const [sortOrder, setSortOrder] = useState('default');

  return (
    <div className="space-y-6">
      {/* Category Banner */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl bg-gray-50 p-3 rounded-xl border">🍚</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">চাল</h1>
            <p className="text-sm text-gray-500">প্রতি পদের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>
      </div>

     
      <div className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
        <span className="text-sm text-gray-600">মোট ৪টি পণ্য দেখানো হচ্ছে</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">সাজান:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-sm bg-gray-50 focus:outline-emerald-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {['স্বর্ণমাছি চাল', 'মিনিকেট চাল', 'নাজির চাল', 'বাটিম সাইজ চাল'].map((item, idx) => (
          <Link
            key={idx}
            href="/product/batam-size-chal"
            className="bg-white p-4 rounded-xl border shadow-sm hover:shadow transition block"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍚</span>
              <div>
                <h3 className="font-semibold text-gray-900">{item}</h3>
                <p className="text-xs text-gray-500">প্রতি কেজি</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800">১৪৮ টাকা</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">▲ ২.৪%</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}