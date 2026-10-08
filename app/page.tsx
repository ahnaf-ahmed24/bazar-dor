import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import HeroBanner from '@/components/HeroBanner';
import SortDropdown from '@/components/SortDropdown'; // 


export const instant = false;

async function getProducts() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data.products && Array.isArray(data.products)) return data.products;
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}


const categoryIcons: { [key: string]: string } = {
  'চাল': '🍚',
  'ডাল': '🫘',
  'তেল': '🛢️',
  'সবজি': '🥬',
  'মাছ': '🐟',
  'মাংস': '🍗',
  'ডিম-দুধ': '🥛',
  'মসলা': '🌶️',
};


async function ProductContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams?.category || '';
  const sortBy = resolvedSearchParams?.sort || 'default';

  const products = await getProducts();


  const filteredProducts = selectedCategory
    ? products.filter((p: any) => {
        const cat = String(p.category || '').toLowerCase();
        const catNameBn = String(p.categoryNameBn || '').toLowerCase();
        const pSlug = String(p.slug || '').toLowerCase();
        const selected = String(selectedCategory).toLowerCase();

        return (
          cat === selected ||
          catNameBn === selected ||
          pSlug.includes(selected) ||
          cat.includes(selected) ||
          catNameBn.includes(selected)
        );
      })
    : products;


  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    const priceA = Number(a.today || 0);
    const priceB = Number(b.today || 0);
    const pctA = Math.abs(a.change?.pct || 0);
    const pctB = Math.abs(b.change?.pct || 0);

    if (sortBy === 'price-asc') return priceA - priceB; 
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'change-desc') return pctB - pctA; 
    return 0;
  });


  const upProducts = filteredProducts
    .filter((p: any) => p.change?.dir === 'up')
    .sort((a: any, b: any) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);


  const downProducts = filteredProducts
    .filter((p: any) => p.change?.dir === 'down')
    .sort((a: any, b: any) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-6">
     
      {!selectedCategory ? (
        <HeroBanner />
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border border-emerald-100">
                {categoryIcons[selectedCategory] || '🛒'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {selectedCategory}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {filteredProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
              </div>
            </div>
          </div>

         
          <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
            </span>
            <SortDropdown currentSort={sortBy} />
          </div>
        </div>
      )}

      
      {upProducts.length > 0 && !selectedCategory && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-red-600">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {upProducts.map((product: any, index: number) => (
              <ProductCard
                key={product.id || index}
                slug={product.slug}
                emoji={product.image || product.categoryIcon || '📦'}
                name={product.nameBn}
                unit={product.unit}
                price={product.today}
                change={product.change}
              />
            ))}
          </div>
        </div>
      )}

      {downProducts.length > 0 && !selectedCategory && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-emerald-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {downProducts.map((product: any, index: number) => (
              <ProductCard
                key={product.id || index}
                slug={product.slug}
                emoji={product.image || product.categoryIcon || '📦'}
                name={product.nameBn}
                unit={product.unit}
                price={product.today}
                change={product.change}
              />
            ))}
          </div>
        </div>
      )}

      <div id="all-products" className="space-y-4 pt-4">
        {!selectedCategory && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              📦 সব পণ্য
            </h2>
            <span className="text-xs text-gray-400">মোট {sortedProducts.length || 0}টি পণ্য দেখানো হচ্ছে</span>
          </div>
        )}

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sortedProducts.map((product: any, index: number) => (
              <ProductCard
                key={product.id || index}
                slug={product.slug}
                emoji={product.image || product.categoryIcon || '📦'}
                name={product.nameBn}
                unit={product.unit}
                price={product.today}
                change={product.change}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border">
            <p className="text-gray-500 text-sm">এই ক্যাটাগরিতে কোনো পণ্যের তথ্য পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-48 bg-white rounded-2xl border" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-xl border" />
            ))}
          </div>
        </div>
      }
    >
      <ProductContent searchParams={searchParams} />
    </Suspense>
  );
}