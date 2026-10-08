import './globals.css'; 
import { Suspense } from 'react'; 
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে',
  description: 'বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্য যাচাই ও তুলনামূলক বিশ্লেষণ।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body 
      suppressHydrationWarning={true}
      className="bg-[#f0f4f1] text-gray-800 antialiased min-h-screen flex flex-col justify-between">
        <Toaster position="top-right" />
        <div>

          <Suspense fallback={<div className="h-16 bg-white/50 animate-pulse border-b" />}>
            <Navbar />
          </Suspense>
          

          <Suspense fallback={<div className="h-10 bg-white/30 animate-pulse my-2" />}>
            <PriceTicker />
          </Suspense>

          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}