"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const languages = ["EN", "සිං", "த"];

export default function Home() {
  const [langIndex, setLangIndex] = useState(0);

  const handleLanguageToggle = () => {
    setLangIndex((prevIndex) => (prevIndex + 1) % languages.length);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#312359] to-[#802a64] p-8 text-white relative overflow-hidden">
      
      {/* Language Selector Button */}
      <button 
        onClick={handleLanguageToggle}
        className="absolute top-8 right-8 border-[3px] border-[#9c7953] rounded-full px-5 py-2 text-sm font-semibold tracking-widest text-white/90 hover:bg-[#9c7953]/20 hover:shadow-[0_0_15px_rgba(156,121,83,0.5)] transition-all z-10 cursor-pointer"
      >
        {languages[langIndex]}
      </button>

      {/* Logo Area */}
      <div className="flex flex-col items-center mb-10 z-10">
        <Image 
          src="/logo.png" 
          alt="StyleCue Logo" 
          width={383} 
          height={270} 
          priority
          style={{ width: "auto", height: "auto" }}
          className="drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]"
        />
        <h1 className="text-[2.75rem] font-semibold tracking-[0.4em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.45)] -mt-4">
          STYLECUE
        </h1>
      </div>

      {/* Tagline */}
      <div className="text-center mb-16 space-y-2 z-10">
        <p className="text-[2.25rem] font-light tracking-wider text-white/95">Find your perfect style</p>
        <p className="text-[2.25rem] font-light tracking-wide text-white/95">powered by AI, Tailored just for you</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-10 z-10">
        <Link 
          href="/ai-stylist" 
          className="flex items-center justify-center gap-6 border-[3px] border-[#9c7953] bg-[#2a1d3d] rounded-full w-[380px] h-[130px] hover:bg-[#382650] hover:shadow-[0_0_25px_rgba(156,121,83,0.3)] transition-all"
        >
          <svg width="45" height="45" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
          <span className="text-[1.75rem] font-bold tracking-wide">AI STYLIST</span>
        </Link>

        <Link 
          href="/browse" 
          className="flex items-center justify-center gap-6 border-[3px] border-[#9c7953] bg-[#2a1d3d] rounded-full w-[380px] h-[130px] hover:bg-[#382650] hover:shadow-[0_0_25px_rgba(156,121,83,0.3)] transition-all"
        >
          <svg width="45" height="45" viewBox="0 0 24 24" fill="white">
            <path d="M19 6H16C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6ZM12 4C13.1 4 14 4.9 14 6H10C10 4.9 10.9 4 12 4ZM19 20H5V8H19V20Z" />
          </svg>
          <span className="text-[1.75rem] font-bold tracking-wide leading-tight text-center">
            BROWSE &<br />SHOP
          </span>
        </Link>
      </div>
    </main>
  );
}