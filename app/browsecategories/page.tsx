"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronLeft } from "lucide-react";

// Define the filter types
type FilterType = "All" | "Men" | "Women" | "Kids";
const filters: FilterType[] = ["All", "Men", "Women", "Kids"];

// Map specific categories to their respective filters
const categoriesByFilter: Record<FilterType, Array<{id: number, title: string, itemCount: string, imageBg: string, image: string}>> = {
  All: [
    { id: 1, title: "Shirts & Blouses", itemCount: "240 items", imageBg: "bg-gradient-to-br from-[#d4d1cb] to-[#a3a19b]", image: "/Images/Shirts%20and%20Blouses.jpeg" },
    { id: 2, title: "Dresses & Gowns", itemCount: "185 items", imageBg: "bg-gradient-to-br from-[#e0cfc8] to-[#bca69e]", image: "/Images/Dresses%20and%20Gowns.jpeg" },
    { id: 3, title: "Footwear & Shoes", itemCount: "120 items", imageBg: "bg-gradient-to-br from-[#c9cdd1] to-[#9a9fa6]", image: "/Images/Footwear%20and%20Shoes.jpeg" },
    { id: 4, title: "Home & Loungewear", itemCount: "98 items", imageBg: "bg-gradient-to-br from-[#8c7462] to-[#5c4a3d]", image: "/Images/Loungewear.jpeg" },
  ],
  Men: [
    { id: 5, title: "Suits & Tailoring", itemCount: "85 items", imageBg: "bg-gradient-to-br from-[#3b414a] to-[#1e2328]", image: "/Images/Suits%20and%20Tailoring.jpeg" },
    { id: 6, title: "Casual Shirts", itemCount: "140 items", imageBg: "bg-gradient-to-br from-[#566573] to-[#2c3e50]", image: "/Images/Casual%20Shirts.jpeg" },
    { id: 7, title: "Trousers & Chinos", itemCount: "110 items", imageBg: "bg-gradient-to-br from-[#7f8c8d] to-[#556b2f]", image: "/Images/Trousers%20and%20Chinos.jpeg" },
    { id: 8, title: "Men's Footwear", itemCount: "95 items", imageBg: "bg-gradient-to-br from-[#5c4a3d] to-[#3e2723]", image: "/Images/Mens%20Footwear.jpeg" },
  ],
  Women: [
    { id: 9, title: "Dresses & Gowns", itemCount: "185 items", imageBg: "bg-gradient-to-br from-[#e0cfc8] to-[#bca69e]", image: "/Images/Dresses%20and%20Gowns.jpeg" },
    { id: 10, title: "Tops & Blouses", itemCount: "210 items", imageBg: "bg-gradient-to-br from-[#d4d1cb] to-[#a3a19b]", image: "/Images/Tops%20and%20Blouses.jpeg" },
    { id: 11, title: "Skirts & Trousers", itemCount: "150 items", imageBg: "bg-gradient-to-br from-[#c9cdd1] to-[#9a9fa6]", image: "/Images/Skirts%20and%20Trousers.jpeg" },
    { id: 12, title: "Designer Handbags", itemCount: "75 items", imageBg: "bg-gradient-to-br from-[#b0a198] to-[#8c7a6e]", image: "/Images/Designer%20Handbags.jpeg" },
  ],
  Kids: [
    { id: 13, title: "Play & Casual", itemCount: "130 items", imageBg: "bg-gradient-to-br from-[#85c1e9] to-[#3498db]", image: "/Images/Kids%20Casual.jpeg" },
    { id: 14, title: "Schoolwear", itemCount: "65 items", imageBg: "bg-gradient-to-br from-[#f9e79f] to-[#f1c40f]", image: "/Images/Schoolwear.jpeg" },
    { id: 15, title: "Party Wear", itemCount: "45 items", imageBg: "bg-gradient-to-br from-[#f5b7b1] to-[#e74c3c]", image: "/Images/Party%20Wear.jpeg" },
    { id: 16, title: "Sleepwear", itemCount: "80 items", imageBg: "bg-gradient-to-br from-[#d2b4de] to-[#9b59b6]", image: "/Images/Sleepwear.jpeg" },
  ],
};

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically load the cards based on the active filter
  const displayedCategories = categoriesByFilter[activeFilter].filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-4 md:p-8 font-sans select-none overflow-hidden">
      
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

      {/* Top Header with Interactive Back Breadcrumb */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between shrink-0 pt-1">
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

        {/* Minimalist Return Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-1 text-xs text-purple-200/70 hover:text-amber-300 transition-colors font-medium tracking-wide group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Previous Step</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex-grow flex flex-col justify-center my-auto py-4 space-y-5">
        
        {/* Search Bar */}
        <div className="relative w-full max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-white/50" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clothes..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-white/30 shadow-inner tracking-wide"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-300 to-amber-400 text-purple-950 shadow-[0_0_15px_rgba(251,191,36,0.35)] font-bold scale-105"
                    : "bg-white/5 border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Categories Section */}
        <div className="space-y-4 pt-2">
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-white text-center uppercase drop-shadow-sm">
            Explore Premium Categories
          </h2>

          {/* Grid Layout */}
          <div key={activeFilter} className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {displayedCategories.map((card) => (
              <Link 
                href="/womentops" 
                key={card.id}
                className="flex flex-col p-3 rounded-xl bg-purple-950/30 backdrop-blur-sm border border-purple-400/20 hover:border-purple-300/40 hover:bg-purple-900/40 transition-all duration-300 group cursor-pointer shadow-lg"
              >
                {/* Image Area */}
                <div 
                  className={`relative w-full aspect-[4/3] rounded-lg mb-2.5 overflow-hidden ${card.imageBg} flex items-center justify-center shadow-inner group-hover:scale-[1.02] transition-transform duration-500`}
                >
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-white/40 text-[10px] tracking-widest uppercase">
                      {card.title}
                    </span>
                  )}
                </div>
                
                <div className="px-1 space-y-0.5">
                  <h3 className="text-xs md:text-sm font-semibold tracking-wider text-white truncate">
                    {card.title}
                  </h3>
                  <p className="text-[10px] md:text-xs tracking-wide text-white/50 font-medium">
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