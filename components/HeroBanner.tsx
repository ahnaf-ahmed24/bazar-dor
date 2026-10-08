import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-3">
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-100">
                    বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    আজকের বাজারের দাম এক নজরে
                </h1>
                <p className="text-sm text-gray-600 max-w-xl">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>
                <div className="pt-2">
                    <Link
                        href="#all-products"
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>
            </div>
            <div>
                <Image
                    src="/images/bazar-hero.png"
                    alt="হিরো ইমেজ"
                    width={320}
                    height={320}
                    className="w-full h-auto object-contain max-w-[280px] md:max-w-[320px]"
                />
            </div>
        </div>
    );
}