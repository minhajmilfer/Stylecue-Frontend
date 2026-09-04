"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

// Define the filter types
type FilterType = "All" | "Men" | "Women" | "Kids";
const filters: FilterType[] = ["All", "Men", "Women", "Kids"];

// Map specific categories to their respective filters
const categoriesByFilter: Record<FilterType, Array<{id: number, title: string, itemCount: string, imageBg: string}>> = {
  All: [
    { id: 1, title: "Shirts & Blouses", itemCount: "240 items", imageBg: "bg-gradient-to-br from-[#d4d1cb] to-[#a3a19b]" },
    { id: 2, title: "Dresses & Gowns", itemCount: "185 items", imageBg: "bg-gradient-to-br from-[#e0cfc8] to-[#bca69e]" },
    { id: 3, title: "Footwear & Shoes", itemCount: "120 items", imageBg: "bg-gradient-to-br from-[#c9cdd1] to-[#9a9fa6]" },
    { id: 4, title: "Home & Loungewear", itemCount: "98 items", imageBg: "bg-gradient-to-br from-[#8c7462] to-[#5c4a3d]" },
  ],
  Men: [
    { id: 5, title: "Suits & Tailoring", itemCount: "85 items", imageBg: "bg-gradient-to-br from-[#3b414a] to-[#1e2328]" },
    { id: 6, title: "Casual Shirts", itemCount: "140 items", imageBg: "bg-gradient-to-br from-[#566573] to-[#2c3e50]" },
    { id: 7, title: "Trousers & Chinos", itemCount: "110 items", imageBg: "bg-gradient-to-br from-[#7f8c8d] to-[#556b2f]" },
    { id: 8, title: "Men's Footwear", itemCount: "95 items", imageBg: "bg-gradient-to-br from-[#5c4a3d] to-[#3e2723]" },
  ],
  Women: [
    { id: 9, title: "Dresses & Gowns", itemCount: "185 items", imageBg: "bg-gradient-to-br from-[#e0cfc8] to-[#bca69e]" },
    { id: 10, title: "Tops & Blouses", itemCount: "210 items", imageBg: "bg-gradient-to-br from-[#d4d1cb] to-[#a3a19b]" },
    { id: 11, title: "Skirts & Trousers", itemCount: "150 items", imageBg: "bg-gradient-to-br from-[#c9cdd1] to-[#9a9fa6]" },
    { id: 12, title: "Designer Handbags", itemCount: "75 items", imageBg: "bg-gradient-to-br from-[#b0a198] to-[#8c7a6e]" },
  ],
  Kids: [
    { id: 13, title: "Play & Casual", itemCount: "130 items", imageBg: "bg-gradient-to-br from-[#85c1e9] to-[#3498db]" },
    { id: 14, title: "Schoolwear", itemCount: "65 items", imageBg: "bg-gradient-to-br from-[#f9e79f] to-[#f1c40f]" },
    { id: 15, title: "Party Wear", itemCount: "45 items", imageBg: "bg-gradient-to-br from-[#f5b7b1] to-[#e74c3c]" },
    { id: 16, title: "Sleepwear", itemCount: "80 items", imageBg: "bg-gradient-to-br from-[#d2b4de] to-[#9b59b6]" },
  ],
};

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically load the cards based on the active filter
  const displayedCategories = categoriesByFilter[activeFilter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col p-8 md:p-12 font-sans overflow-x-hidden">
      
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <Image 
            src="/logo.png" 
            alt="StyleCue Logo" 
            width={28} 
            height={28} 
            priority
            style={{ width: "auto", height: "auto" }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105"
          />
          <span className="uppercase font-bold tracking-widest text-white text-xs md:text-sm">
            STYLECUE
          </span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col space-y-12">
        
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/50" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clothes..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-lg text-white placeholder-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-white/30 shadow-inner"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-10 py-3 rounded-full text-xl font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-300 to-amber-400 text-purple-950 shadow-[0_0_20px_rgba(251,191,36,0.3)] font-bold scale-105"
                    : "bg-white/5 border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Categories Section */}
        <div className="space-y-6 pt-4">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white">
            Explore Premium Categories
          </h2>

          {/* Grid Layout - key added to force animation reset on filter change */}
          <div key={activeFilter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {displayedCategories.map((card) => (
              <Link 
                href="/womentops" 
                key={card.id}
                className="flex flex-col p-4 rounded-[2rem] bg-purple-950/30 backdrop-blur-sm border border-purple-400/20 hover:border-purple-300/40 hover:bg-purple-900/40 transition-all duration-300 group cursor-pointer"
              >
                {/* Image Area */}
                <div 
                  className={`w-full aspect-[4/3] rounded-2xl mb-5 overflow-hidden ${card.imageBg} flex items-center justify-center text-white/30 text-sm tracking-widest shadow-inner group-hover:scale-[1.02] transition-transform duration-500`}
                >
                   [IMAGE]
                </div>
                
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-light tracking-wide text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs tracking-wide text-white/40">
                    {card.itemCount}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}