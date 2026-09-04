"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const shoppingCategories = [
  {
    id: "men",
    title: "Men",
    subtitle: "Tailored and Casual",
    matchCount: 642,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8l3 4.5v1.5h-2.5V20H7.5v-8H5v-1.5L8 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v3" />
      </svg>
    ),
  },
  {
    id: "women",
    title: "Women",
    subtitle: "Contemporary & Classic",
    matchCount: 858,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4h6l2 6 3 10H4l3-10 2-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v2" />
      </svg>
    ),
  },
  {
    id: "kids",
    title: "Kids",
    subtitle: "Comfortable & Playful",
    matchCount: 415,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5h8l2 3v4h-1.5v7h-3v-4h-3v4h-3v-7H5V8l2-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    ),
  },
];

export default function TargetGenderPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("women");

  const handleSelect = (id: string) => {
    setSelectedCategory(id);
  };

  const activeCategory = shoppingCategories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-8 md:p-12 font-sans">
      
      {/* Header & Progress Bar */}
      <header className="w-full max-w-6xl mx-auto space-y-4">
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
          <span className="text-amber-400">STEP 1 OF 6 (16%)</span>
        </div>

        <p className="text-[10px] tracking-widest text-white/60 font-medium mb-3 uppercase">
          AI Stylist Assistant Path
        </p>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full w-[16%] rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center text-center my-auto w-full max-w-5xl mx-auto py-10">
        <h1 className="text-4xl md:text-[2.75rem] font-light tracking-wide mb-4">
          Who Are You Shopping For?
        </h1>
        <p className="text-gray-300 text-sm md:text-base mb-14 max-w-lg">
          We will curate collections specific to their lifestyle and proportions.
        </p>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl px-4">
          {shoppingCategories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <Link
                key={category.id}
                href="/category"
                onClick={() => handleSelect(category.id)}
                className={`relative flex flex-col items-center justify-center p-10 h-[280px] rounded-[2rem] transition-all duration-300 backdrop-blur-sm border ${
                  isSelected
                    ? "bg-amber-400/10 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.25)] scale-[1.02]"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                }`}
              >
                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                  isSelected 
                    ? "bg-amber-400 text-purple-950 shadow-lg shadow-amber-400/30" 
                    : "bg-white/10 text-white"
                }`}>
                  {category.icon}
                </div>
                
                <h3 className={`text-2xl font-light tracking-wide mb-2 transition-colors duration-300 ${
                  isSelected ? "text-amber-300 font-normal" : "text-white"
                }`}>
                  {category.title}
                </h3>
                
                <p className={`text-xs tracking-wide transition-colors duration-300 ${
                  isSelected ? "text-amber-200/80" : "text-white/50"
                }`}>
                  {category.subtitle}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Dynamic Match Count Text */}
        <div className="h-10 mt-12 flex items-center justify-center">
          {activeCategory && (
            <p className="text-amber-400 text-sm font-semibold tracking-wider uppercase animate-fade-in">
              {activeCategory.matchCount}+ Premium items in store matching {activeCategory.title}
            </p>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex justify-center items-center pb-6 gap-4">
        <Link
          href="/" 
          className="px-10 py-3 rounded-full border border-white/40 text-white text-xs font-semibold tracking-widest hover:bg-white/10 transition-all"
        >
          BACK
        </Link>
        
        {/* Added a Continue button to let the user proceed once they select */}
        <Link
          href="/category" 
          className={`px-10 py-3 rounded-full text-xs font-semibold tracking-widest transition-all ${
            selectedCategory
              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-lg"
              : "bg-white/10 text-white/40 pointer-events-none"
          }`}
        >
          CONTINUE &rarr;
        </Link>
      </footer>
    </div>
  );
}