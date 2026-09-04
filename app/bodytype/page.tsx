"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const bodyTypes = [
  {
    id: "slim",
    title: "Slim",
    tag: "LEAN BUILD",
    description: "Narrow frame, straight silhouette — tailored slim fits",
  },
  {
    id: "athletic",
    title: "Athletic",
    tag: "MOST COMMON",
    description: "Defined shoulders & waist — structured, sporty cuts",
  },
  {
    id: "regular",
    title: "Regular",
    tag: "BALANCED",
    description: "Proportionate build — versatile classic fits",
  },
  {
    id: "broad",
    title: "Broad / Plus",
    tag: "FULL BUILD",
    description: "Fuller frame — relaxed, comfort-first cuts",
  },
];

export default function BodyTypePage() {
  // Defaulting to "regular" to match your design mockup
  const [selectedType, setSelectedType] = useState<string>("regular");

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
          <span className="text-amber-400">STEP 6 OF 6 (100%)</span>
        </div>

        <p className="text-[10px] tracking-widest text-white/60 font-medium mb-3 uppercase">
          AI Stylist Assistant Path
        </p>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          {/* 100% full progress bar */}
          <div className="bg-amber-400 h-full w-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center text-center my-auto w-full max-w-4xl mx-auto py-10">
        <h1 className="text-4xl md:text-[2.75rem] font-light tracking-wide mb-3">
          Your Body Type
        </h1>
        <p className="text-gray-300 text-sm md:text-base mb-12">
          Select your build for the most flattering fit. We tailor recommendations to match your body type precisely.
        </p>

        {/* 2x2 Grid for Body Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
          {bodyTypes.map((type) => {
            const isSelected = selectedType === type.id;

            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`relative flex flex-col text-left p-6 md:p-8 rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                  isSelected
                    ? "bg-white/5 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center w-full mb-3">
                  <h3 className="text-xl font-semibold tracking-wide">
                    {type.title}
                  </h3>
                  {/* Dynamic Pill Tag */}
                  <span
                    className={`text-[10px] px-3 py-1 rounded-full font-bold tracking-wider uppercase transition-colors ${
                      isSelected
                        ? "bg-amber-400 text-purple-950"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {type.tag}
                  </span>
                </div>
                
                <p className={`text-sm tracking-wide transition-colors ${
                  isSelected ? "text-white/90" : "text-white/60"
                }`}>
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex justify-center items-center gap-4 pb-6 mt-8">
        <Link
          href="/measurements"
          className="px-10 py-3.5 rounded-full border border-white/40 text-white text-sm font-semibold tracking-widest hover:bg-white/10 transition-all"
        >
          BACK
        </Link>
        
        {/* Final CTA Button with Sparkle Icon */}
        <Link
          href="/results" // Or wherever this flow concludes
          className="px-8 py-3.5 rounded-full text-sm font-bold tracking-widest transition-all flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-[0_0_25px_rgba(251,191,36,0.4)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          FIND MY OUTFIT
        </Link>
      </footer>
    </div>
  );
}