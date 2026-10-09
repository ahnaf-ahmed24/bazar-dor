import Link from 'next/link';
import { notFound } from 'next/navigation';

interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: MarketItem[];
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    const products = Array.isArray(data) ? data : data.products || [];
    return products.find((p: any) => p.slug === slug) || null;
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const emoji = product.image || product.categoryIcon || '📦';

  const allMins = product.markets?.map((m) => m.min) || [product.today];
  const allMaxs = product.markets?.map((m) => m.max) || [product.today];
  const overallMin = Math.min(...allMins);
  const overallMax = Math.max(...allMaxs);

  const diffAmount = Math.abs(product.today - (product.yesterday || product.today));

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-screen">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-8">
        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center w-20 h-20">
              {emoji}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
              <p className="text-sm text-gray-500">প্রতি {product.unit} · {product.categoryNameBn}</p>
              <p className="text-xs text-gray-600 font-medium">
                গতকালকের তুলনায় আজ দাম {isUp ? 'বেড়েছে' : isDown ? 'কমেছে' : 'অপরিবর্তিত'} {diffAmount > 0 ? `${diffAmount} টাকা` : ''}
              </p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-xl text-right w-full md:w-auto shadow-sm">
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="text-2xl font-bold text-gray-900">{product.today} <span className="text-sm font-normal text-gray-500">টাকা / {product.unit}</span></p>
            <span className={`text-xs font-bold inline-flex items-center gap-0.5 mt-1 ${isUp ? 'text-red-600' : 'text-emerald-600'}`}>
              {isUp ? '▲' : '▼'} {product.change?.pct}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold text-emerald-600">{overallMin} টাকা</p>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
              <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
              <p className="text-xl font-bold text-red-600">{overallMax} টাকা</p>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="text-xl font-bold text-gray-900">{product.today} টাকা</p>
              <p className="text-xs text-gray-400">প্রতি {product.unit}-এর হিসাব</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500 bg-gray-50/75">
                    <th className="p-4 font-medium">বাজার</th>
                    <th className="p-4 font-medium">বিভাগ</th>
                    <th className="p-4 font-medium">সর্বনিম্ন</th>
                    <th className="p-4 font-medium">সর্বাধিক</th>
                    <th className="p-4 font-medium">গড়</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {product.markets?.map((m, idx) => {
                    const marketAvg = (m.min + m.max) / 2;
                    const formattedAvg = Number.isInteger(marketAvg) ? `${marketAvg} টাকা` : `${marketAvg.toFixed(2)} টাকা`;
                    return (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">{m.market}</td>
                        <td className="p-4 text-gray-600">{m.division}</td>
                        <td className="p-4 text-gray-800">{m.min} টাকা</td>
                        <td className="p-4 text-gray-800">{m.max} টাকা</td>
                        <td className="p-4 font-medium text-gray-900">{formattedAvg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}