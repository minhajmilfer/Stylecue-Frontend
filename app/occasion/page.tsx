"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function OccasionPage() {
  const [selected, setSelected] = useState('casual');

  // If the customer already picked an occasion earlier in this visit
  // (e.g. they went BACK and came here again), remember their previous pick.
  useEffect(() => {
    const saved = localStorage.getItem("stylecue_occasion");
    if (saved) setSelected(saved);
  }, []);

  // Save every pick to the shared notebook (localStorage) so the results
  // page can find it later and send it to the backend as "occasion".
  const handleSelect = (id: string) => {
    setSelected(id);
    localStorage.setItem("stylecue_occasion", id);
  };

  const occasions = [
    {
      id: 'casual',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" strokeWidth="2" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.73-12.73l-1.41 1.41" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: 'Casual / Sun',
      desc: 'Weekend, Travel & Lounging',
    },
    {
      id: 'work',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2" />
          <path d="M16 3H8v4h8V3z" strokeWidth="2" />
        </svg>
      ),
      title: 'Work / Corporate',
      desc: 'Meetings, Office & Business Formal',
    },
    {
      id: 'wedding',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Wedding / Gala',
      desc: 'Celebrations & Formal Ceremonies',
    },
    {
      id: 'party',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 22h8m-4-10v10m-5-18l5 8 5-8H7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Party / Night Out',
      desc: 'Club, Cocktails & Dynamic Evenings',
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#2a133d] via-[#3c1752] to-[#601b5a] text-white flex flex-col justify-between p-6 md:p-12 font-sans select-none">
      
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

      {/* Header & Progress Tracker 📊 */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <Image 
              src="/logo.png" 
              alt="StyleCue Logo" 
              width={28} 
              height={28} 
              priority
              style={{ width: "auto", height: "auto" }}
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105 shrink-0"
            />
            <span className="text-sm font-bold tracking-widest text-white uppercase leading-none">STYLECUE</span>
          </Link>
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">STEP 3 OF 6 (50%)</span>
        </div>

        <p className="text-[10px] tracking-widest text-white/60 font-medium mb-2 uppercase">
          AI STYLIST ASSISTANT PATH
        </p>

        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full w-1/2 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
        </div>
      </div>

      {/* Main Content Area 🌟 */}
      <div className="relative z-10 text-center max-w-3xl mx-auto my-auto w-full px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-2 tracking-wide text-white">What's the Occasion?</h1>
        <p className="text-purple-200/80 text-xs md:text-sm mb-10 tracking-wide font-light">
          We tailor the color schemes, fabrics, and formality level accordingly.
        </p>

        {/* 2x2 Selection Grid 🗂️ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {occasions.map((item) => {
            const isSelected = selected === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-md text-left w-full ${
                  isSelected
                    ? 'border-2 border-amber-400 bg-white/10 shadow-[0_0_20px_rgba(251,191,36,0.15)] scale-[1.01]'
                    : 'border border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                {/* Circular Icon Container 🧭 */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors ${
                  isSelected ? 'bg-amber-400 text-purple-950 shadow-md shadow-amber-400/20' : 'bg-white/10 text-white'
                }`}>
                  {item.icon}
                </div>

                {/* Text Labels 📝 */}
                <div>
                  <h3 className={`font-semibold text-sm tracking-wide transition-colors ${isSelected ? 'text-white' : 'text-gray-100'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-[11px] mt-0.5 tracking-wide font-light transition-colors ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons 🔘 */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex justify-center gap-4 items-center pb-2">
        <Link
          href="/category"
          className="border border-white/40 px-8 py-2.5 rounded-full text-xs font-medium tracking-widest hover:bg-white/10 transition"
        >
          BACK
        </Link>
        <Link
          href="/skintone"
          className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-purple-950 px-8 py-2.5 rounded-full text-xs font-bold tracking-widest hover:opacity-90 transition shadow-lg"
        >
          CONTINUE &rarr;
        </Link>
      </div>
    </main>
  );
}