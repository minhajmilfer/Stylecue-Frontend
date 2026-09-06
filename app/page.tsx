"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

const languages = ["EN", "සිං", "த"];

export default function Home() {
  const [langIndex, setLangIndex] = useState(0);

  const handleLanguageToggle = () => {
    setLangIndex((prevIndex) => (prevIndex + 1) % languages.length);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] p-6 text-white relative overflow-hidden">
      
      {/* 1. Subtle "Spotlight" behind Logo & Main Content */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" 
      />

      {/* 2. Abstract Flowing Lines around outer edges (Low opacity fabric/garment movement) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 text-purple-300" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 1440 900" 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top-Left Curve */}
        <path 
          d="M-100,-50 Q200,250 100,500 T-50,900" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeDasharray="8 6" 
          className="opacity-40"
        />
        <path 
          d="M-50,-100 Q300,200 150,600" 
          stroke="currentColor" 
          strokeWidth="1" 
        />

        {/* Bottom-Right Curve */}
        <path 
          d="M1540,950 Q1240,650 1340,400 T1490,0" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeDasharray="8 6" 
          className="opacity-40"
        />
        <path 
          d="M1490,1000 Q1140,700 1290,300" 
          stroke="currentColor" 
          strokeWidth="1" 
        />
      </svg>

      {/* Language Selector Button */}
      <button 
        onClick={handleLanguageToggle}
        className="absolute top-6 right-6 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-white/80 hover:text-white hover:border-amber-400/60 hover:bg-white/5 transition-all z-10 cursor-pointer backdrop-blur-sm"
      >
        {languages[langIndex]}
      </button>

      {/* Logo Area */}
      <div className="flex flex-col items-center mb-6 z-10 -mt-2">
        <Image 
          src="/logo.png" 
          alt="StyleCue Logo" 
          width={400} 
          height={280} 
          priority
          className="w-[200px] sm:w-[290px] md:w-[360px] h-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.35em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] -mt-2 md:-mt-4">
          STYLECUE
        </h1>
      </div>

      {/* Tagline */}
      <div className="text-center mb-10 space-y-2.5 z-10 max-w-xl px-4">
        <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extralight tracking-wide text-white leading-tight">
          Find Your Perfect Style
        </h2>
        <p className="text-sm sm:text-base font-light tracking-wide text-purple-200/70">
          Personalized recommendations, tailored just for you.
        </p>
      </div>

      {/* Editorial Hairline Label */}
      <div className="flex items-center justify-center gap-4 mb-8 z-10 w-full max-w-md px-4">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/25 to-amber-400/40" />
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-300/90 font-medium text-center whitespace-nowrap">
          CHOOSE HOW YOU'D LIKE TO EXPLORE
        </p>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-400/25 to-amber-400/40" />
      </div>

      {/* Refined buttons with icons, descriptions, and subtle hover effects */}
      <div className="flex flex-col sm:flex-row gap-5 z-10 w-full max-w-3xl justify-center px-4">
        
        {/* AI STYLIST Button */}
        <Link 
          href="/gender" 
          className="group flex-1 flex items-center justify-between p-5 md:p-6 bg-purple-950/25 hover:bg-purple-900/40 border border-white/10 hover:border-amber-400/60 rounded-3xl backdrop-blur-md hover:shadow-[0_0_25px_rgba(251,191,36,0.12)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {/* Circular Icon Container */}
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 group-hover:bg-amber-400/15 group-hover:border-amber-400/50 flex items-center justify-center text-white/80 group-hover:text-amber-300 transition-all duration-300 shrink-0">
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <div className="flex flex-col text-left space-y-0.5">
            <span className="text-lg font-normal tracking-wider text-white group-hover:text-amber-200 transition-colors">
              AI STYLIST
            </span>
            <span className="text-xs text-purple-200/60 font-light">
              Get personalized recommendations
            </span>
          </div>
        </div>

        {/* Gold Right Arrow Accent */}
          <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-2" />
        </Link>

        {/* BROWSE & SHOP Button */}
        <Link 
          href="/browsecategories" 
          className="group flex-1 flex items-center justify-between p-5 md:p-6 bg-purple-950/25 hover:bg-purple-900/40 border border-white/10 hover:border-amber-400/60 rounded-3xl backdrop-blur-md hover:shadow-[0_0_25px_rgba(251,191,36,0.12)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {/* Circular Icon Container */}
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 group-hover:bg-amber-400/15 group-hover:border-amber-400/50 flex items-center justify-center text-white/80 group-hover:text-amber-300 transition-all duration-300 shrink-0">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="flex flex-col text-left space-y-0.5">
            <span className="text-lg font-normal tracking-wider text-white group-hover:text-amber-200 transition-colors">
              BROWSE & SHOP
            </span>
            <span className="text-xs text-purple-200/60 font-light">
              Explore our collections
            </span>
          </div>
        </div>

        {/* Gold Right Arrow Accent */}
          <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-2" />
        </Link>

      </div>
    </main>
  );
}