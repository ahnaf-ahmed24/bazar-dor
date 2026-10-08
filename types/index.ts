export interface MarketPrice {
  marketName: string;
  division: string;
  min: number;
  max: number;
  avg: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  markets?: MarketPrice[];
}