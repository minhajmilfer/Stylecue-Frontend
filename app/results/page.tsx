"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Mock data for categories and their variant options
const categoriesData = {
  tops: [
    { id: "beige", name: "Beige Linen Shirt", price: "Rs.2,190", color: "#d4b996" },
    { id: "navy", name: "Navy Blue Shirt", price: "Rs.1,890", color: "#1b2a4a" },
    { id: "olive", name: "Olive Green Shirt", price: "Rs.2,490", color: "#556b2f" },
    { id: "charcoal", name: "Charcoal Grey Shirt", price: "Rs.3,490", color: "#333333" },
    { id: "mustard", name: "Mustard Yellow Shirt", price: "Rs.1,990", color: "#d4af37" },
    { id: "maroon", name: "Maroon Linen Shirt", price: "Rs.2,790", color: "#6b1d2f" },
  ],
  bottoms: [
    { id: "b1", name: "Tailored Trousers", price: "Rs.3,290", color: "#2c3e50" },
    { id: "b2", name: "Classic Blue Jeans", price: "Rs.2,890", color: "#34495e" },
    { id: "b3", name: "Beige Chinos", price: "Rs.2,590", color: "#c2b280" },
  ],
  shoes: [
    { id: "s1", name: "Minimalist Sneakers", price: "Rs.4,590", color: "#ecf0f1" },
    { id: "s2", name: "Leather Loafers", price: "Rs.5,290", color: "#5c4033" },
  ],
  accessories: [
    { id: "a1", name: "Classic Leather Belt", price: "Rs.1,490", color: "#3e2723" },
    { id: "a2", name: "Minimalist Watch", price: "Rs.6,990", color: "#silver" },
  ],
};

export default function ResultsPage() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoriesData>("tops");
  const items = categoriesData[activeCategory];
  
  // Track selected item index (default to the first item)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedItem = items[selectedIndex] || items[0];

  // Split items into left and right columns for the layout
  const midPoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midPoint);
  const rightItems = items.slice(midPoint);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-6 md:p-10 font-sans overflow-x-hidden">
      
      {/* Top Header & Progress Bar */}
      <header className="w-full max-w-7xl mx-auto space-y-3">
        <div className="flex justify-between items-center text-xs md:text-sm font-semibold tracking-wider text-purple-200/80">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/logo.png" 
              alt="StyleCue Logo" 
              width={28} 
              height={28} 
              priority
              style={{ width: "auto", height: "auto" }}
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105"
            />
            <span className="uppercase font-bold tracking-widest text-white">
              STYLECUE
            </span>
          </Link>
          <span className="text-amber-400">STEP 5 OF 6 (83%)</span>
        </div>

        <div className="flex justify-between items-end">
          <p className="text-xs tracking-widest text-white/70 uppercase font-medium">
            Your Curated AI Match
          </p>
        </div>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full w-[83%] rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
        </div>

        {/* AI Match Complete Badge & Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="bg-amber-400 text-purple-950 text-xs font-bold px-4 py-1.5 rounded-full shadow-md tracking-wider">
            AI MATCH COMPLETE
          </div>

          <div className="flex items-center gap-3">
            {(["tops", "bottoms", "shoes", "accessories"] as const).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedIndex(0); // Reset to first item on category switch
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-xs font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? "bg-amber-400 border-amber-400 text-purple-950 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
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

      {/* Main Interactive Display Area */}
      <main className="w-full max-w-6xl mx-auto flex-grow flex items-center justify-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center w-full">
          
          {/* Left Thumbnails Column */}
          <div className="flex lg:flex-col items-center justify-center gap-4">
            {leftItems.map((item, originalIdx) => {
              const isSelected = selectedIndex === originalIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(originalIdx)}
                  className={`relative flex flex-col items-center p-3 rounded-2xl bg-purple-950/40 backdrop-blur-md border transition-all duration-200 group w-36 ${
                    isSelected
                      ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105 bg-amber-400/10"
                      : "border-white/15 hover:border-white/30"
                  }`}
                >
                  {/* Color representation swatch / placeholder */}
                  <div 
                    className="w-full h-24 rounded-lg mb-2 shadow-inner border border-white/10 flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-[10px] text-white/70 font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                      {item.name.split(" ")[0]}
                    </span>
                  </div>
                  <span className="text-amber-300 text-xs font-bold tracking-wide">
                    {item.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center: Large Live Preview Card */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm h-[420px] bg-purple-950/60 backdrop-blur-2xl border-2 border-amber-400/50 rounded-3xl p-4 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              {/* Garment Visual Display Area */}
              <div 
                className="w-full h-[340px] rounded-2xl flex flex-col items-center justify-center transition-colors duration-500 shadow-inner relative"
                style={{ backgroundColor: selectedItem?.color || "#4a2d5e" }}
              >
                {/* Hanger graphic representation */}
                <div className="absolute top-4 text-white/40">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 0a3 3 0 00-3 3h6a3 3 0 00-3-3zM3 12h18M5 12l7 8 7-8" />
                  </svg>
                </div>
                
                <span className="text-white font-medium text-lg tracking-wider drop-shadow-md text-center px-4">
                  {selectedItem?.name}
                </span>
                <span className="text-amber-300 font-bold text-xl mt-1 drop-shadow">
                  {selectedItem?.price}
                </span>
              </div>

              {/* Live Preview Footer Badge */}
              <div className="w-full py-2 bg-black/30 rounded-xl flex items-center justify-center gap-2 mt-3 border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-amber-300 uppercase">
                  Live Preview
                </span>
              </div>
            </div>
          </div>

          {/* Right Thumbnails Column */}
          <div className="flex lg:flex-col items-center justify-center gap-4">
            {rightItems.map((item, idx) => {
              const originalIdx = midPoint + idx;
              const isSelected = selectedIndex === originalIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(originalIdx)}
                  className={`relative flex flex-col items-center p-3 rounded-2xl bg-purple-950/40 backdrop-blur-md border transition-all duration-200 group w-36 ${
                    isSelected
                      ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105 bg-amber-400/10"
                      : "border-white/15 hover:border-white/30"
                  }`}
                >
                  <div 
                    className="w-full h-24 rounded-lg mb-2 shadow-inner border border-white/10 flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-[10px] text-white/70 font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                      {item.name.split(" ")[0]}
                    </span>
                  </div>
                  <span className="text-amber-300 text-xs font-bold tracking-wide">
                    {item.price}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </main>

      {/* Bottom Navigation & Actions Footer */}
      <footer className="w-full max-w-xl mx-auto flex items-center justify-between gap-6 pt-4">
        <Link
          href="/bodytype"
          className="flex-1 py-3.5 px-8 rounded-full border border-purple-400/30 bg-purple-900/20 hover:bg-purple-800/40 text-purple-200 text-sm font-semibold flex items-center justify-center gap-2 transition-all text-center uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <Link
          href="/cart" 
          className="flex-1 py-3.5 px-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-purple-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all text-center uppercase tracking-widest"
        >
          Add to Cart
          <ArrowRight className="w-4 h-4" />
        </Link>
      </footer>
    </div>
  );
}