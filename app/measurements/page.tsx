"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Global standard measurements mapping
const standardMeasurements: Record<string, { height: string; waist: string }> = {
  XS: { height: "160", waist: "24" },
  S: { height: "164", waist: "26" },
  M: { height: "168", waist: "28" }, // Matches the reference image
  L: { height: "172", waist: "30" },
  XL: { height: "176", waist: "32" },
  XXL: { height: "182", waist: "34" },
};

export default function MeasurementsPage() {
  const [height, setHeight] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Handle clicking a general size button
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setHeight(standardMeasurements[size].height);
    setWaist(standardMeasurements[size].waist);
  };

  // Handle manual input typing
  const handleInputChange = (field: "height" | "waist", value: string) => {
    // Turn off standard size button selection when user types custom values
    if (selectedSize) setSelectedSize(null);
    
    if (field === "height") setHeight(value);
    if (field === "waist") setWaist(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-8 md:p-12 font-sans">
      
      {/* Header & Progress Bar */}
      <header className="w-full max-w-5xl mx-auto space-y-4">
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

        <p className="text-[10px] tracking-widest text-white/60 font-medium mb-3 uppercase">
          AI Stylist Assistant Path
        </p>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full w-[83%] rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center text-center my-auto w-full max-w-2xl mx-auto py-10">
        <h1 className="text-4xl md:text-[2.75rem] font-light tracking-wide mb-3">
          Find Your Fit
        </h1>
        <p className="text-gray-300 text-sm md:text-base mb-12">
          Input your measurements for precision sizing recommendations.
        </p>

        {/* Input Fields */}
        <div className="flex flex-col sm:flex-row gap-6 w-full mb-12">
          {/* Height Input */}
          <div className="flex-1 flex flex-col text-left">
            <label className="text-xs font-semibold tracking-wider text-white/70 mb-2 ml-1">
              HEIGHT (CM)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-xl font-medium text-white outline-none transition-all duration-200 focus:bg-white/15 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 shadow-inner"
              placeholder="e.g. 168"
            />
          </div>

          {/* Waist Input */}
          <div className="flex-1 flex flex-col text-left">
            <label className="text-xs font-semibold tracking-wider text-white/70 mb-2 ml-1">
              WAIST (INCH)
            </label>
            <input
              type="number"
              value={waist}
              onChange={(e) => handleInputChange("waist", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-xl font-medium text-white outline-none transition-all duration-200 focus:bg-white/15 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 shadow-inner"
              placeholder="e.g. 28"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs font-semibold tracking-widest text-white/50">
            OR CHOOSE GENERAL SIZE
          </span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* General Size Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {Object.keys(standardMeasurements).map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold tracking-wider transition-all duration-300 border ${
                  isSelected
                    ? "bg-amber-400 border-amber-400 text-purple-950 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-110"
                    : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex justify-center items-center gap-4 pb-6 mt-8">
        <Link
          href="/skintone"
          className="px-10 py-3.5 rounded-full border border-white/40 text-white text-xs font-semibold tracking-widest hover:bg-white/10 transition-all"
        >
          BACK
        </Link>
        
        <Link
          href="/bodytype"
          className={`px-10 py-3.5 rounded-full text-xs font-bold tracking-widest transition-all flex items-center gap-2 ${
            height || waist
              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-lg"
              : "bg-white/10 text-white/40 pointer-events-none"
          }`}
        >
          CONTINUE
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </footer>
    </div>
  );
}