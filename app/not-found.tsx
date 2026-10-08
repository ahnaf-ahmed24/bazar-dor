import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-6">
      <h1 className="text-6xl font-bold text-emerald-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800">পৃষ্ঠাটি পাওয়া যায়নি</h2>
      <p className="text-sm text-gray-500">আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নয় বা সরানো হয়েছে।</p>
      <div>
        <Link
          href="/"
          className="inline-block bg-emerald-600 text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-emerald-700 transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}