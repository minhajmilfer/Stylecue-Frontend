"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const shoppingCategories = [
  {
    id: "men",
    title: "Men",
    subtitle: "Tailored and Casual",
    matchCount: 642,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5h8l2 3v4h-1.5v7h-3v-4h-3v4h-3v-7H5V8l2-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    ),
  },
];

export default function TargetGenderPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("women");

  // If the customer already picked a gender earlier in this visit
  // (e.g. they went BACK and came here again), remember their previous pick.
  useEffect(() => {
    const saved = localStorage.getItem("stylecue_gender");
    if (saved) setSelectedCategory(saved);
  }, []);

  // Save every pick to the shared notebook (localStorage) so the results
  // page can find it later and use it to fetch real recommendations.
  const handleSelect = (id: string) => {
    setSelectedCategory(id);
    localStorage.setItem("stylecue_gender", id);
  };

  const activeCategory = shoppingCategories.find(c => c.id === selectedCategory);

  return (
    <div className="relative h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-4 md:p-6 font-sans select-none">
      
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
      <header className="relative z-10 w-full max-w-5xl mx-auto space-y-2 shrink-0">
        {/* Top Row: Logo & Step Counter */}
        <div className="flex justify-between items-center">
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
            <span className="uppercase font-bold tracking-widest text-white text-sm leading-none">
              STYLECUE
            </span>
          </Link>
          
          {/* Uniform Step Text */}
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
            STEP 1 OF 6 (16%)
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-[10px] tracking-widest text-white/60 font-medium uppercase">
          AI Stylist Assistant Path
        </p>
        
        {/* Progress Track */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500" 
            style={{ width: "33%" }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center my-auto w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">
          Who Are You Shopping For?
        </h1>
       <p className="text-purple-200/80 text-xs sm:text-sm mb-6 max-w-lg font-normal">
          We will curate collections specific to their lifestyle and proportions.
        </p>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-3xl px-2">
          {shoppingCategories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleSelect(category.id)}
                className={`relative flex flex-col items-center justify-center p-5 h-[180px] md:h-[200px] rounded-[1.5rem] transition-all duration-300 backdrop-blur-md border cursor-pointer ${
                  isSelected
                    ? "bg-amber-400/10 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.25)] scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3.5 transition-all duration-300 ${
                  isSelected 
                    ? "bg-amber-400 text-purple-950 shadow-md shadow-amber-400/20" 
                    : "bg-white/10 text-white"
                }`}>
                  {category.icon}
                </div>
                
                <h3 className={`text-lg md:text-xl tracking-wide mb-1 transition-colors duration-300 ${
                  isSelected ? "text-amber-300 font-normal" : "text-white/90 font-light"
                }`}>
                  {category.title}
                </h3>
                
                <p className={`text-xs tracking-wide transition-colors duration-300 ${
                  isSelected ? "text-amber-200/90" : "text-white/60"
                }`}>
                  {category.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Match Count Text */}
        <div className="h-6 mt-4 flex items-center justify-center">
          {activeCategory && (
            <p className="text-amber-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
              {activeCategory.matchCount}+ Premium items in store matching {activeCategory.title}
            </p>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="relative z-10 flex justify-center items-center pb-2 gap-4 shrink-0">
        <Link
          href="/" 
          className="px-8 py-2.5 rounded-full border border-white/30 text-white/90 text-xs font-semibold tracking-widest hover:bg-white/10 hover:border-white/50 transition-all"
        >
          BACK
        </Link>
        
        {/* Added a Continue button to let the user proceed once they select */}
        <Link
          href="/category" 
          className={`px-8 py-2.5 rounded-full text-xs font-semibold tracking-widest transition-all ${
            selectedCategory
              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-md shadow-amber-500/20"
              : "bg-white/10 text-white/40 pointer-events-none"
          }`}
        >
          CONTINUE &rarr;
        </Link>
      </footer>
    </div>
  );
}