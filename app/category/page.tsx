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
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Casual Wear",
    "Accessories",
  ]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-8 font-sans">
      <header>
        <div className="flex justify-between items-center text-xs tracking-wider font-semibold mb-1">
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
            <span className="text-sm font-bold tracking-widest uppercase text-white">STYLECUE</span>
          </Link>
          <span className="text-gray-300 text-[11px]">STEP 2 OF 6 (33%)</span>
        </div>

        <p className="text-[10px] tracking-widest text-gray-400 font-medium mb-3">
          AI STYLIST ASSISTANT PATH
        </p>
        
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full w-[33%] rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
        </div>
      </header>

      <main className="flex flex-col items-center text-center my-auto">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-3">
          What Are You Looking For?
        </h1>
        <p className="text-gray-300 text-sm mb-10 max-w-lg">
          Select all that apply. Your AI Stylist will build outfit bundles based on your choice.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full px-4">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`py-3 px-6 rounded-full border text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "border-amber-400 bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </main>

      <footer className="flex justify-center items-center gap-4 pb-2">
        <Link
          href="/gender" 
          className="px-8 py-2.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all"
        >
          BACK
        </Link>

        <Link
          href="/occasion"
          className="px-8 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold tracking-wider hover:brightness-110 transition-all shadow-lg"
        >
          CONTINUE &rarr;
        </Link>
      </footer>
    </div>
  );
}