import Link from 'next/link';

async function getTickerProducts() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data.products && Array.isArray(data.products)) return data.products;
    return [];
  } catch (error) {
    console.error('Error fetching ticker products:', error);
    return [];
  }
}

export default async function PriceTicker() {
  const products = await getTickerProducts();

  if (!products || products.length === 0) {
    return null;
  }

  
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-white border-b border-gray-200 overflow-hidden whitespace-nowrap py-2.5 shadow-2xs">
      <div className="inline-flex animate-marquee items-center">
        {tickerItems.map((item, index) => {
          const isUp = item.change?.dir === 'up';
          const isDown = item.change?.dir === 'down';
          const changeSymbol = isUp ? '▲' : isDown ? '▼' : '—';
          const changeText = `${changeSymbol} ${item.change?.pct || 0}%`;

          
          const changeColor = isUp ? 'text-red-600' : isDown ? 'text-emerald-600' : 'text-gray-500';

          return (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-6 border-r border-gray-200 text-xs md:text-sm text-gray-700 shrink-0"
            >
              <span className="text-base">{item.image || item.categoryIcon || '⚪'}</span>
              <span className="font-semibold text-gray-900">{item.nameBn}</span>
              <span className="text-gray-600">
                {item.today} টাকা/{item.unit}
              </span>
              <span className={`font-bold flex items-center gap-0.5 ${changeColor}`}>
                {changeText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}