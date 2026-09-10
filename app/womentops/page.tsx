"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  productId: string;
  name: string;
  category: string | null;
  gender: string | null;
  price: number;
  originalPrice: number | null;
  imageUrl: string | null;
}

const fallbackColors = ["#d4d1cb", "#e0cfc8", "#c9cdd1", "#8c7462"];

function formatPrice(price: number): string {
  return `Rs.${price.toLocaleString("en-US")}`;
}

function CategoryListingContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const gender = searchParams.get("gender") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const kioskId = localStorage.getItem("stylecue_kiosk_id") || "1";
      const params = new URLSearchParams({ kioskId, category });
      if (gender) params.set("gender", gender);

      try {
        const res = await fetch(`${API_URL}/products?${params.toString()}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category, gender]);

  const toggleSelection = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className="relative h-screen max-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-4 md:p-6 font-sans select-none overflow-hidden box-border">
      
      {/* Top-Left Corner Curve Signature */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-45">
        <svg width="220" height="220" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M -20 200 C 70 200 200 70 200 -20" stroke="url(#cornerGradTL)" strokeWidth="2" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="cornerGradTL" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom-Right Corner Curve Signature */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-45">
        <svg width="220" height="220" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 260 40 C 170 40 40 170 40 260" stroke="url(#cornerGradBR)" strokeWidth="2" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="cornerGradBR" x1="240" y1="240" x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between shrink-0 pt-1">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <Image 
            src="/logo.png" 
            alt="StyleCue Logo" 
            width={26} 
            height={26} 
            priority
            style={{ width: "auto", height: "auto" }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105 shrink-0"
          />
          <span className="uppercase font-bold tracking-widest text-white text-xs md:text-sm">
            STYLECUE
          </span>
        </Link>
        <div className="flex items-center gap-3 text-[10px] md:text-xs text-purple-200/70 font-medium tracking-wide">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/browsecategories" className="hover:text-white transition-colors">CATEGORIES</Link>
        </div>
      </header>

      {/* Title */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center shrink-0 pt-2">
        <h1 className="text-xl md:text-2xl font-light tracking-wide text-white capitalize">
          {category} {gender ? `for ${gender}` : ""}
        </h1>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-grow overflow-y-auto py-3">
        {isLoading && (
          <p className="text-center text-purple-200/70 text-sm">Loading products...</p>
        )}

        {!isLoading && products.length === 0 && (
          <p className="text-center text-purple-200/70 text-sm">
            No products found in this category yet.
          </p>
        )}

        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((product, idx) => {
              const isSelected = selectedItems.includes(product.productId);
              return (
                <div
                  key={product.productId}
                  onClick={() => toggleSelection(product.productId)}
                  className={`relative flex gap-3 p-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                      : "border-white/15 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div
                    className="relative w-28 h-32 md:h-36 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: fallbackColors[idx % fallbackColors.length] }}
                  >
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 112px, 128px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-white/30 text-[10px] tracking-widest font-medium">[IMAGE]</span>
                    )}

                    {isSelected && (
                      <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-md z-10">
                        <Check className="w-4 h-4 text-purple-950 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-32 md:h-36 py-0.5 pr-1 overflow-hidden">
                    <h3 className="text-xs md:text-sm font-medium tracking-wide text-white leading-tight line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2">
                      <span className="text-sm md:text-base font-bold text-amber-300 tracking-wider">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-white/40 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      className={`w-full py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? "bg-amber-400 text-purple-950 border border-amber-400"
                          : "bg-transparent border border-amber-400/80 text-amber-300 hover:bg-amber-400/10"
                      }`}
                    >
                      {isSelected ? "SELECTED" : "SELECT"}
                      {!isSelected && <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="relative z-10 w-full max-w-md mx-auto flex items-center justify-between gap-4 pb-1 shrink-0">
        <Link
          href="/browsecategories"
          className="flex-1 py-2 px-5 rounded-full border border-purple-400/30 bg-purple-900/20 hover:bg-purple-800/40 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>

        <Link
          href={selectedItems.length > 0 ? `/reviewselection?ids=${selectedItems.join(",")}` : "#"}
          className={`flex-1 py-2 px-5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center uppercase tracking-widest ${
            selectedItems.length > 0
              ? "bg-gradient-to-r from-amber-300 to-amber-400 hover:brightness-110 text-purple-950 shadow-md shadow-amber-400/20"
              : "bg-white/10 text-white/40 pointer-events-none border border-white/10"
          }`}
        >
          Continue
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </div>
  );
}

export default function CategoryListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2d1b4e] flex items-center justify-center text-white">Loading...</div>}>
      <CategoryListingContent />
    </Suspense>
  );
}