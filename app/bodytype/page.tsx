"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> 5c915a49049f50e4b7ffc5972423d33aab2c7bc3
import Link from "next/link";
import Image from "next/image";

const bodyTypes = [
  {
    id: "slim",
    title: "Slim",
    tag: "LEAN BUILD",
    description: "Narrower frame with a straight silhouette → Tailored, slim-fitting styles",
  },
  {
    id: "athletic",
    title: "Athletic",
    tag: "MOST COMMON",
    description: "Defined shoulders with a more structured waist → Structured and sporty styles",
  },
  {
    id: "regular",
    title: "Regular",
    tag: "BALANCED",
    description: "Balanced, proportionate build → Versatile, classic styles",
  },
  {
    id: "broad",
    title: "Broad / Fuller",
    tag: "FULL BUILD",
    description: "Wider or fuller overall frame → Relaxed, comfortable styles",
  },
];

export default function BodyTypePage() {
  const [selectedType, setSelectedType] = useState<string>("regular");

<<<<<<< HEAD
  // If the customer already picked a body type earlier in this visit
  // (e.g. they went BACK and came here again), remember their previous pick.
  useEffect(() => {
    const saved = localStorage.getItem("stylecue_body_type");
    if (saved) setSelectedType(saved);
  }, []);

  // Every time they pick a body type, save it to the shared notebook
  // (localStorage) so the measurements page can find it later and send it
  // to the backend together with height/waist.
  const handleSelect = (id: string) => {
    setSelectedType(id);
    localStorage.setItem("stylecue_body_type", id);
  };

=======
>>>>>>> 5c915a49049f50e4b7ffc5972423d33aab2c7bc3
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

      {/* Header & Progress Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto space-y-1.5 shrink-0">
        <div className="flex justify-between items-center text-xs md:text-sm font-semibold tracking-wider text-purple-200/80">
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
          <span className="text-amber-400 text-xs font-semibold">STEP 5 OF 6 (83%)</span>
        </div>

        <p className="text-[10px] tracking-widest text-white/60 font-medium uppercase">
          AI Stylist Assistant Path
        </p>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500" 
            style={{ width: "83%" }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center text-center my-auto w-full max-w-4xl mx-auto py-2">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2">
          Your Body Type
        </h1>
        <p className="text-purple-200/80 text-sm md:text-base mb-6 max-w-lg font-light">
          Select your build for the most flattering fit. We tailor recommendations to match your body type precisely.
        </p>

        {/* 2x2 Grid for Body Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-3xl px-2">
          {bodyTypes.map((type) => {
            const isSelected = selectedType === type.id;

            return (
              <button
                key={type.id}
<<<<<<< HEAD
                onClick={() => handleSelect(type.id)}
=======
                onClick={() => setSelectedType(type.id)}
>>>>>>> 5c915a49049f50e4b7ffc5972423d33aab2c7bc3
                className={`relative flex flex-col text-left p-4 md:p-5 rounded-2xl transition-all duration-300 backdrop-blur-md border cursor-pointer ${
                  isSelected
                    ? "bg-white/5 border-amber-400/90 shadow-[0_0_15px_rgba(251,191,36,0.15)] scale-[1.01]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center w-full mb-2">
                  <h3 className="text-sm md:text-base font-semibold tracking-wide text-white">
                    {type.title}
                  </h3>
                  
                  {/* Dynamic Pill Tag */}
                  <span
                    className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold tracking-wider uppercase transition-colors ${
                      isSelected
                        ? "bg-amber-400 text-purple-950"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {type.tag}
                  </span>
                </div>
                
                <p className={`text-xs leading-relaxed transition-colors ${
                  isSelected ? "text-white/90" : "text-purple-200/60"
                }`}>
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto flex justify-center gap-4 items-center pb-2">
        <Link
          href="/skintone"
          className="px-8 py-2.5 rounded-full border border-white/30 text-white/90 text-xs font-semibold tracking-widest hover:bg-white/10 hover:border-white/50 transition-all"
        >
          BACK
        </Link>
        
        <Link
          href="/measurements"
          className="px-8 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all uppercase flex items-center gap-2"
        >
          CONTINUE &rarr;
        </Link>
      </footer>
    </div>
  );
}