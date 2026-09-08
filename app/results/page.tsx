"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CategoryItem {
  id: string;
  name: string;
  price: string;
  color: string;
  image?: string;
}

const categoriesData: Record<"tops" | "bottoms" | "accessories", CategoryItem[]> = {
  tops: [
    { id: "beige", name: "Beige Linen Shirt", price: "Rs.2,190", color: "#d4b996", image: "/Images/beige%20linen%20shirt.jpeg" },
    { id: "navy", name: "Navy Blue Shirt", price: "Rs.1,890", color: "#1b2a4a", image: "/Images/navy%20blue%20shirt.jpeg" },
    { id: "olive", name: "Olive Green Shirt", price: "Rs.2,490", color: "#556b2f", image: "/Images/olive%20green%20shirt.jpeg" },
    { id: "charcoal", name: "Charcoal Grey Shirt", price: "Rs.3,490", color: "#333333", image: "/Images/charcoal%20grey%20shirt.jpeg" },
    { id: "mustard", name: "Mustard Yellow Shirt", price: "Rs.1,990", color: "#d4af37", image: "/Images/mustard%20yellow%20shirt.jpeg" },
    { id: "maroon", name: "Maroon Linen Shirt", price: "Rs.2,790", color: "#6b1d2f", image: "/Images/maroon%20linen%20shirt.jpeg" },
  ],
  bottoms: [
    { id: "b1", name: "Tailored Trousers", price: "Rs.3,290", color: "#2c3e50", image: "/Images/tailored%20trousers.jpeg" },
    { id: "b2", name: "Classic Blue Jeans", price: "Rs.2,890", color: "#34495e", image: "/Images/classic%20blue%20jeans.jpeg" },
    { id: "b3", name: "Chinos", price: "Rs.2,590", color: "#c2b280", image: "/Images/chinos.jpeg" },
    { id: "b4", name: "Cargo trousers", price: "Rs.3,890", color: "#4b5320", image: "/Images/cargo%20trousers.jpeg" },
    { id: "b5", name: "Casual Shorts", price: "Rs.1,990", color: "#2b4c7e", image: "/Images/casual%20shorts.jpeg" },
    { id: "b6", name: "Joggers", price: "Rs.2,790", color: "#7f8c8d", image: "/Images/Joggers.jpeg" },
  ],
  accessories: [
    { id: "a1", name: "Classic Leather Belt", price: "Rs.1,490", color: "#3e2723", image: "/Images/classic%20leather%20belts.jpeg" },
    { id: "a2", name: "Minimalist Watch", price: "Rs.6,990", color: "#silver", image: "/Images/minimalist%20watches.jpeg" },
  ],
};

export default function ResultsPage() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoriesData>("tops");
  const items = categoriesData[activeCategory];
  
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedItem = items[selectedIndex] || items[0];

  const midPoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midPoint);
  const rightItems = items.slice(midPoint);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-4 md:p-6 font-sans select-none overflow-hidden">
      
      {/* Top-Left Corner Curve Signature */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-45">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 260 40 C 170 40 40 170 40 260" stroke="url(#cornerGradBR)" strokeWidth="2" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="cornerGradBR" x1="240" y1="240" x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header & Progress Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto space-y-1.5 shrink-0">
        <div className="flex justify-between items-center text-xs md:text-sm font-semibold tracking-wider text-purple-200/80">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/logo.png" 
              alt="StyleCue Logo" 
              width={28} 
              height={28} 
              priority
              style={{ width: "auto", height: "auto" }}
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105 shrink-0"
            />
            <span className="uppercase font-bold tracking-widest text-white text-xs md:text-sm">
              STYLECUE
            </span>
          </Link>
          <span className="text-amber-400 text-xs font-semibold">STEP 6 OF 6 (100%)</span>
        </div>

        <p className="text-[10px] tracking-widest text-white/60 font-medium uppercase">
          AI Stylist Assistant Path
        </p>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500" 
            style={{ width: "100%" }}
          />
        </div>

        {/* AI Match Complete Badge & Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="bg-amber-400 text-purple-950 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md tracking-wider">
            AI MATCH COMPLETE
          </div>

          <div className="flex items-center gap-2.5">
            {(["tops", "bottoms", "accessories"] as const).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedIndex(0);
                  }}
                  className={`flex items-center px-5 py-2 rounded-full border text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-400 border-amber-400 text-purple-950 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                      : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-grow flex items-center justify-center my-auto py-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 items-center w-full max-w-3xl">
          
          {/* Left Thumbnails Column */}
          <div className="flex lg:flex-col items-center justify-center gap-2.5">
            {leftItems.map((item, originalIdx) => {
              const isSelected = selectedIndex === originalIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(originalIdx)}
                  className={`relative flex flex-col items-center p-1.5 rounded-xl bg-purple-950/40 backdrop-blur-md border transition-all duration-200 group w-28 md:w-32 cursor-pointer ${
                    isSelected
                      ? "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.25)] scale-[1.02] bg-amber-400/10"
                      : "border-white/15 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <div className="relative w-full h-16 md:h-20 rounded-lg mb-1 overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: item.color }}>
                        <span className="text-[9px] text-white/70 font-semibold px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                          {item.name.split(" ")[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-amber-300 text-[11px] font-bold tracking-wide">
                    {item.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center: Live Preview Card */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[260px] md:max-w-[280px] bg-purple-950/60 backdrop-blur-2xl border-2 border-amber-400/50 rounded-2xl p-2.5 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              <div className="relative w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden bg-black/20 flex flex-col items-center justify-center">
                {selectedItem?.image ? (
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    fill
                    sizes="280px"
                    className="object-cover transition-opacity duration-300"
                    priority
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: selectedItem?.color || "#4a2d5e" }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 flex flex-col justify-end p-2.5 text-center z-10">
                  <span className="text-white font-medium text-xs md:text-sm tracking-wider drop-shadow-md">
                    {selectedItem?.name}
                  </span>
                  <span className="text-amber-300 font-bold text-sm md:text-base mt-0.5 drop-shadow">
                    {selectedItem?.price}
                  </span>
                </div>
              </div>

              <div className="w-full py-1.5 bg-black/30 rounded-lg flex items-center justify-center gap-1.5 mt-2 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                  Live Preview
                </span>
              </div>
            </div>
          </div>

          {/* Right Thumbnails Column */}
          <div className="flex lg:flex-col items-center justify-center gap-2.5">
            {rightItems.map((item, idx) => {
              const originalIdx = midPoint + idx;
              const isSelected = selectedIndex === originalIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(originalIdx)}
                  className={`relative flex flex-col items-center p-1.5 rounded-xl bg-purple-950/40 backdrop-blur-md border transition-all duration-200 group w-28 md:w-32 cursor-pointer ${
                    isSelected
                      ? "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.25)] scale-[1.02] bg-amber-400/10"
                      : "border-white/15 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <div className="relative w-full h-16 md:h-20 rounded-lg mb-1 overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: item.color }}>
                        <span className="text-[9px] text-white/70 font-semibold px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                          {item.name.split(" ")[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-amber-300 text-[11px] font-bold tracking-wide">
                    {item.price}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="relative z-10 flex justify-center items-center gap-3 pt-1 shrink-0">
        <Link
          href="/measurements"
          className="px-5 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all uppercase tracking-wider"
        >
          BACK
        </Link>

        <Link
          href="/cart" 
          className="px-5 py-1.5 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-md shadow-amber-500/20 transition-all uppercase flex items-center gap-1.5"
        >
          ADD TO CART &rarr;
        </Link>
      </footer>
    </div>
  );
}