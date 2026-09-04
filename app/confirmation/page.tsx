"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, PartyPopper } from "lucide-react";

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-8 md:p-12 font-sans overflow-hidden">
      
      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between">
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
          <span className="uppercase font-bold tracking-widest text-white text-xs md:text-sm">
            STYLECUE
          </span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl mx-auto flex-grow flex flex-col items-center justify-center text-center py-6 space-y-8">
        
        {/* Celebration Icon Badge */}
        <div className="w-20 h-20 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)]">
          <PartyPopper className="w-10 h-10" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-white">
            StyleCue Assistant Notified
          </h1>
          <p className="text-purple-200/70 text-sm md:text-base">
            Your personal fitting bundle is currently being prepared.
          </p>
        </div>

        {/* Fitting Cabin Code & Status Card */}
        <div className="w-full bg-purple-950/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          
          <div className="space-y-1">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-purple-200/60 uppercase">
              Fitting Cabin Code
            </span>
            <div className="text-4xl md:text-5xl font-extrabold tracking-wider text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              #SC-247
            </div>
          </div>

          <div className="w-full h-px bg-white/10 my-4"></div>

          {/* Status Tracker List */}
          <div className="space-y-4 text-left max-w-md mx-auto pt-2">
            
            {/* Step 1: Completed */}
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-6 h-6 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-md shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-white/90">1. Order placed</span>
            </div>

            {/* Step 2: In Progress / Active */}
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-6 h-6 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-md shrink-0 ring-4 ring-amber-400/20">
                <span className="w-2 h-2 rounded-full bg-purple-950 animate-pulse"></span>
              </div>
              <span className="text-amber-300 font-semibold">2. Staff preparing in Main Hall cabin</span>
            </div>

            {/* Step 3: Pending */}
            <div className="flex items-center gap-4 text-sm font-medium opacity-50">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-white/40"></span>
              </div>
              <span className="text-white/60">3. Ready for collection</span>
            </div>

          </div>
        </div>

        {/* Start New Session Action Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-purple-950 font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all"
          >
            Start New Session
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      {/* Footer Status Subtext */}
      <footer className="w-full text-center pb-2">
        <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Order Placed — Staff Notified
        </p>
      </footer>
    </div>
  );
}