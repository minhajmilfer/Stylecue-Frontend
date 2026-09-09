"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CategoryPage() {
  const categories = [
    "Casual Wear",
    "Formal Wear",
    "Accessories",
    "Ethnic Wear",
    "Swimwear",
    "Sports Wear",
    "Outerwear",
    "Footwear",
<<<<<<< HEAD
=======
    "Loungewear",
    "Workwear",
    "Party Wear",
>>>>>>> 5c915a49049f50e4b7ffc5972423d33aab2c7bc3
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Casual Wear",
  ]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-8 font-sans select-none">
      
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

      {/* Header */}
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
            STEP 2 OF 6 (33%)
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

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center text-center my-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">
          What Are You Looking For?
        </h1>
        <p className="text-purple-200/80 text-sm mb-10 max-w-lg">
          Select all that apply. Your AI Stylist will build outfit bundles based on your choice.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full px-4">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`py-3 px-6 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-amber-400/90 bg-amber-400/10 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.2)] scale-[1.02]"
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex justify-center items-center gap-4 pb-2">
        <Link
          href="/gender" 
          className="px-8 py-2.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all"
        >
          BACK
        </Link>

        <Link
          href="/occasion"
          className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all ${
            selectedCategories.length > 0
              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-lg shadow-amber-500/20"
              : "bg-white/10 text-white/40 pointer-events-none"
          }`}
        >
          CONTINUE &rarr;
        </Link>
      </footer>
    </div>
  );
}