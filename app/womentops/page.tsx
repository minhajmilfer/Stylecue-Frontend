"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// Expanded product list for Tops & Blouses
const products = [
  {
    id: 1,
    brand: "HUF&DEE",
    name: "V Neck Summer Blouse",
    price: "Rs.2,190",
    originalPrice: "Rs.3,790",
    discount: "41% OFF",
    imageBg: "bg-gradient-to-br from-[#d4d1cb] to-[#a3a19b]",
    image: "/Images/V%20Neck%20Summer%20Blouse.jpeg",
  },
  {
    id: 2,
    brand: "STYLECUE ATELIER",
    name: "V Neck Linen Tunic",
    price: "Rs.1,190",
    originalPrice: "Rs.1,590",
    discount: "25% OFF",
    imageBg: "bg-gradient-to-br from-[#e0cfc8] to-[#bca69e]",
    image: "/Images/V%20Neck%20Linen%20Tunic.jpeg",
  },
  {
    id: 3,
    brand: "ELEGANCE",
    name: "Silk Button-Up Shirt",
    price: "Rs.3,490",
    originalPrice: "Rs.4,590",
    discount: "24% OFF",
    imageBg: "bg-gradient-to-br from-[#c9cdd1] to-[#9a9fa6]",
    image: "/Images/Silk%20Button-Up%20Shirt.jpeg",
  },
  {
    id: 4,
    brand: "URBAN CHIC",
    name: "Ribbed Knit Top",
    price: "Rs.1,890",
    originalPrice: "Rs.2,490",
    discount: "24% OFF",
    imageBg: "bg-gradient-to-br from-[#8c7462] to-[#5c4a3d]",
    image: "/Images/Ribbed%20Knit%20Top.jpeg",
  },
];

export default function TopsAndBlousesPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
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

      {/* Header & Navigation */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between shrink-0 pt-1">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <Image 
            src="/logo.png" 
            alt="StyleCue Logo" 
            width={24} 
            height={24} 
            priority
            style={{ width: "auto", height: "auto" }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105 shrink-0"
          />
          <span className="uppercase font-bold tracking-widest text-white text-xs">
            STYLECUE
          </span>
        </Link>

        <div className="flex items-center gap-1.5 text-[10px] tracking-wider text-white/50 uppercase font-medium">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>&gt;</span>
          <Link href="/browsecategories" className="hover:text-white transition-colors">CATEGORIES</Link>
          <span>&gt;</span>
          <span className="text-amber-300 font-semibold">WOMEN TOPS</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center my-auto py-2 space-y-3 overflow-hidden">
        
        {/* Title */}
        <div className="text-center space-y-0.5 shrink-0">
          <h1 className="text-lg md:text-2xl font-light tracking-widest text-white uppercase drop-shadow-sm">
            Explore Tops & Blouses
          </h1>
          <p className="text-[10px] md:text-xs text-white/60 tracking-wider">
            Select one or more items to proceed to review
          </p>
        </div>

        {/* Balanced Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {products.map((product) => {
            const isSelected = selectedItems.includes(product.id);

            return (
              <div 
                key={product.id}
                onClick={() => toggleSelection(product.id)}
                className={`flex flex-row gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm border items-center ${
                  isSelected 
                    ? "bg-amber-400/10 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)] scale-[1.01]" 
                    : "bg-purple-950/30 border-purple-500/20 hover:bg-purple-900/40 hover:border-purple-400/40"
                }`}
              >
                {/* Balanced Image Container */}
                <div className={`w-28 h-32 md:w-32 md:h-36 rounded-lg flex items-center justify-center shadow-inner overflow-hidden relative shrink-0 ${product.imageBg}`}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 112px, 128px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-white/30 text-[10px] tracking-widest font-medium">[IMAGE]</span>
                  )}
                    
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-md animate-in zoom-in duration-200 z-10">
                      <Check className="w-4 h-4 text-purple-950 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between h-32 md:h-36 py-0.5 pr-1 overflow-hidden">
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] tracking-widest text-white/50 font-semibold uppercase truncate">
                        {product.brand}
                      </span>
                      <span className="px-2 py-0.5 bg-amber-400 text-purple-950 text-[9px] font-bold tracking-wider rounded-full shrink-0">
                        {product.discount}
                      </span>
                    </div>

                    <h3 className="text-xs md:text-sm font-medium tracking-wide text-white leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-sm md:text-base font-bold text-amber-300 tracking-wider">
                      {product.price}
                    </span>
                    <span className="text-[10px] text-white/40 line-through">
                      {product.originalPrice}
                    </span>
                  </div>

                  <div>
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
              </div>
            );
          })}
        </div>
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