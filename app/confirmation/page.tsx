"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, PartyPopper } from "lucide-react";

export default function ConfirmedPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-4 md:p-6 font-sans select-none overflow-hidden">
      
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

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between shrink-0">
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
          <span className="uppercase font-bold tracking-widest text-white text-xs md:text-sm">
            STYLECUE
          </span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-xl mx-auto flex-grow flex flex-col items-center justify-center text-center my-auto py-2 space-y-3">
        
        {/* Celebration Icon Badge */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.35)] shrink-0">
          <PartyPopper className="w-6 h-6 md:w-7 md:h-7" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-light tracking-wide text-white">
            StyleCue Assistant Notified
          </h1>
          <p className="text-purple-200/70 text-xs md:text-sm">
            Your personal fitting bundle is currently being prepared.
          </p>
        </div>

        {/* Fitting Cabin Code & Status Card */}
        <div className="w-full bg-purple-950/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 md:p-5 shadow-2xl space-y-3">
          
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-purple-200/60 uppercase">
              Fitting Cabin Code
            </span>
            <div className="text-2xl md:text-3xl font-extrabold tracking-wider text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]">
              #SC-247
            </div>
          </div>

          <div className="w-full h-px bg-white/10 my-2"></div>

          {/* Status Tracker List */}
          <div className="space-y-2 text-left max-w-xs mx-auto pt-1">
            
            {/* Step 1: Completed */}
            <div className="flex items-center gap-3 text-xs font-medium">
              <div className="w-5 h-5 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-md shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-white/90">1. Order placed</span>
            </div>

            {/* Step 2: In Progress / Active */}
            <div className="flex items-center gap-3 text-xs font-medium">
              <div className="w-5 h-5 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-md shrink-0 ring-4 ring-amber-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-950 animate-pulse"></span>
              </div>
              <span className="text-amber-300 font-semibold">2. Staff preparing in Main Hall cabin</span>
            </div>

            {/* Step 3: Pending */}
            <div className="flex items-center gap-3 text-xs font-medium opacity-50">
              <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              </div>
              <span className="text-white/60">3. Ready for collection</span>
            </div>

          </div>
        </div>

        {/* Start New Session Action Button */}
        <div className="pt-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-purple-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(251,191,36,0.25)] transition-all"
          >
            Start New Session
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      {/* Footer Status Subtext */}
      <footer className="relative z-10 w-full text-center shrink-0 pt-1">
        <p className="text-[10px] md:text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Order Placed — Staff Notified
        </p>
      </footer>
    </div>
  );
}