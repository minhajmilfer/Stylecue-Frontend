"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function OccasionPage() {
  const [selected, setSelected] = useState('casual');

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
    <main className="min-h-screen bg-gradient-to-br from-[#2a133d] via-[#3c1752] to-[#601b5a] text-white flex flex-col justify-between p-6 md:p-12 font-sans">
      {/* Header & Progress Tracker 📊 */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Image 
            src="/logo.png" 
            alt="StyleCue Logo" 
            width={28} 
            height={28} 
            style={{ width: "auto", height: "auto" }}
          />
          <span className="text-xs tracking-[0.25em] font-semibold text-white">STYLECUE</span>
        </div>
        <div className="flex justify-between items-center text-[11px] tracking-wider mb-2">
          <span className="text-gray-300 font-medium">AI STYLIST ASSISTANT PATH</span>
          <span className="text-yellow-400 font-medium">STEP 3 OF 6 (50%)</span>
        </div>
        <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
          <div className="bg-yellow-400 h-full w-1/2"></div>
        </div>
      </div>

      {/* Main Content Area 🌟 */}
      <div className="text-center max-w-3xl mx-auto my-auto w-full px-4">
        <h1 className="text-3xl md:text-5xl font-light mb-3 tracking-wide">What's the Occasion?</h1>
        <p className="text-gray-300 text-xs md:text-sm mb-10 tracking-wide font-light">
          We tailor the color schemes, fabrics, and formality level accordingly.
        </p>

        {/* 2x2 Selection Grid 🗂️ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {occasions.map((item) => {
            const isSelected = selected === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all backdrop-blur-md ${
                  isSelected
                    ? 'border-2 border-yellow-400 bg-white/10 shadow-[0_0_20px_rgba(250,204,21,0.15)]'
                    : 'border border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                {/* Circular Icon Container 🧭 */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors ${
                  isSelected ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white'
                }`}>
                  {item.icon}
                </div>

                {/* Text Labels 📝 */}
                <div>
                  <h3 className={`font-semibold text-sm tracking-wide ${isSelected ? 'text-white' : 'text-gray-100'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-[11px] mt-0.5 tracking-wide font-light ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons 🔘 */}
      <div className="w-full max-w-5xl mx-auto flex justify-center gap-4 items-center pb-2">
        <button className="border border-white/40 px-8 py-2.5 rounded-full text-xs font-medium tracking-widest hover:bg-white/10 transition">
          BACK
        </button>
        <button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black px-8 py-2.5 rounded-full text-xs font-bold tracking-widest hover:opacity-90 transition shadow-lg">
          CONTINUE →
        </button>
      </div>
    </main>
  );
}