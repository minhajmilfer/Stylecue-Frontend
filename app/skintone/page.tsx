"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Palette } from "lucide-react";

const skinTonePalette = [
  {
    range: [0, 15],
    label: "Fair Porcelain",
    depth: "Fair",
    undertone: "Cool Pink",
    hex: "#fce5d8",
    stylistTip: "Pastels, icy blue, lavender, and soft rose complement cool fair skin brilliantly.",
    recommendedColors: [
      { name: "Soft Rose", hex: "#e8a5a5" },
      { name: "Icy Blue", hex: "#a5c4e8" },
      { name: "Lavender", hex: "#c4a5e8" },
      { name: "Pearl White", hex: "#f0ede6" },
    ],
  },
  {
    range: [16, 35],
    label: "Fair Ivory",
    depth: "Fair-Light",
    undertone: "Neutral Warm",
    hex: "#f3d2b8",
    stylistTip: "Peach, soft corals, dusty pinks, and warm beige highlight your natural glow.",
    recommendedColors: [
      { name: "Peach", hex: "#f0a886" },
      { name: "Coral", hex: "#e07a5f" },
      { name: "Dusty Rose", hex: "#d88c9a" },
      { name: "Cream", hex: "#ede0d4" },
    ],
  },
  {
    range: [36, 55],
    label: "Light Sand",
    depth: "Light Medium",
    undertone: "Neutral Golden",
    hex: "#e0ac69",
    stylistTip: "Warm neutrals, olive green, warm taupe, and mustard yellow bring out your radiance.",
    recommendedColors: [
      { name: "Olive", hex: "#708238" },
      { name: "Mustard", hex: "#e1ad01" },
      { name: "Taupe", hex: "#8b7d7b" },
      { name: "Warm Rust", hex: "#b7410e" },
    ],
  },
  {
    range: [56, 75],
    label: "Warm Medium Golden",
    depth: "Medium",
    undertone: "Warm Golden",
    hex: "#c68642",
    stylistTip: "Earthy colors, rich terracotta, warm amber, and sage green look exceptionally brilliant on you.",
    recommendedColors: [
      { name: "Terracotta", hex: "#c37351" },
      { name: "Amber", hex: "#cca33e" },
      { name: "Sage Green", hex: "#7d8b5b" },
      { name: "Earth Brown", hex: "#523c2a" },
    ],
  },
  {
    range: [76, 90],
    label: "Rich Caramel",
    depth: "Medium Deep",
    undertone: "Warm Bronze",
    hex: "#8d5524",
    stylistTip: "Rich jewel tones, deep gold, emerald green, and deep magenta elevate your skin tone.",
    recommendedColors: [
      { name: "Emerald", hex: "#046307" },
      { name: "Rich Gold", hex: "#d4af37" },
      { name: "Magenta", hex: "#8b008b" },
      { name: "Burnt Orange", hex: "#cc5500" },
    ],
  },
  {
    range: [91, 100],
    label: "Deep Espresso",
    depth: "Deep",
    undertone: "Cool Rich",
    hex: "#3c1402",
    stylistTip: "Vibrant brights, cobalt blue, stark white, and royal purple create stunning high-contrast looks.",
    recommendedColors: [
      { name: "Cobalt Blue", hex: "#0047ab" },
      { name: "Royal Purple", hex: "#7851a9" },
      { name: "Crimson", hex: "#990000" },
      { name: "Pure White", hex: "#ffffff" },
    ],
  },
];

export default function SkinTonePage() {
  const [sliderValue, setSliderValue] = useState<number>(65);

  const currentProfile =
    skinTonePalette.find(
      (item) => sliderValue >= item.range[0] && sliderValue <= item.range[1]
    ) || skinTonePalette[3];

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

      {/* Top Header & Progress Bar */}
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
          <span className="text-amber-400 text-xs font-semibold">STEP 4 OF 6 (66%)</span>
        </div>
        <p className="text-[10px] tracking-widest text-white/60 font-medium uppercase">
          AI Stylist Assistant Path
        </p>
        <div className="w-full h-1.5 bg-purple-950/60 rounded-full overflow-hidden border border-purple-800/30">
          <div
            className="h-full bg-amber-400 transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            style={{ width: "66%" }}
          ></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center my-auto py-2 space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl md:text-4xl font-light tracking-wide text-white">
            Colour Matching
          </h1>
          <p className="text-purple-200/70 text-xs md:text-sm max-w-md mx-auto">
            We analyze your skin undertones to suggest palettes that make you pop.
          </p>
        </div>

        {/* Main Content Card Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          
          {/* Left Side: Dynamic Circle Preview Box */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-center space-y-2 w-full md:w-56 shrink-0 shadow-lg">
            <span className="uppercase tracking-wider text-purple-200/80 text-[10px] font-semibold">
              SELECTED SKIN TONE
            </span>
            
            <div className="relative group my-1">
              <div
                className="absolute -inset-1 rounded-full opacity-70 blur-md transition-all duration-300"
                style={{ backgroundColor: currentProfile.hex }}
              ></div>
              <div
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-white/80 shadow-xl transition-colors duration-200"
                style={{ backgroundColor: currentProfile.hex }}
              ></div>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-sm md:text-base font-semibold text-amber-300 transition-all duration-200">
                {currentProfile.label}
              </h3>
              <p className="text-purple-200/60 text-[10px]">
                This is your current preview tone.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Slider & Color Recommendations */}
          <div className="flex-grow w-full space-y-4">
            
            {/* Slider Section */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-medium text-purple-200/80 px-1">
                <span>Fair</span>
                <span>Medium</span>
                <span>Rich / Deep</span>
              </div>

              {/* Skin Tone Gradient Bar */}
              <div className="relative py-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer outline-none shadow-inner border border-amber-300/30
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-6 
                    [&::-webkit-slider-thumb]:h-6 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-amber-400 
                    [&::-webkit-slider-thumb]:border-2 
                    [&::-webkit-slider-thumb]:border-white 
                    [&::-webkit-slider-thumb]:shadow-md 
                    [&::-webkit-slider-thumb]:transition-transform 
                    [&::-webkit-slider-thumb]:hover:scale-110 
                    [&::-moz-range-thumb]:w-6 
                    [&::-moz-range-thumb]:h-6 
                    [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:bg-amber-400 
                    [&::-moz-range-thumb]:border-2 
                    [&::-moz-range-thumb]:border-white 
                    [&::-moz-range-thumb]:shadow-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #fce5d8, #f3d2b8, #e0ac69, #c68642, #8d5524, #3c1402)",
                  }}
                />
              </div>

              {/* Dynamic Labels */}
              <div className="text-center space-y-0.5 pt-1">
                <div className="text-amber-300 font-semibold tracking-wider text-xs md:text-sm uppercase">
                  SELECTED: <span className="text-white font-bold">{currentProfile.label}</span>
                </div>
                <div className="text-purple-200/60 text-[10px]">
                  Depth: {currentProfile.depth} &nbsp;|&nbsp; Undertone: {currentProfile.undertone}
                </div>
              </div>
            </div>

            {/* Stylist Tip & Dynamic Color Recommendation Box */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 space-y-3 flex flex-col md:flex-row gap-4 items-center backdrop-blur-md">
              <div className="flex items-start gap-2.5 flex-1">
                <Palette className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div className="text-purple-100 text-xs leading-relaxed">
                  <span className="font-semibold text-amber-300">Stylist tip: </span>
                  {currentProfile.stylistTip}
                </div>
              </div>

              {/* Recommended Color Swatches */}
              <div className="flex items-center justify-around md:justify-end gap-2.5 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-2.5 md:pt-0 shrink-0">
                {currentProfile.recommendedColors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/80 shadow-md transition-colors duration-300"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="text-white/80 text-[9px] font-medium tracking-wide">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Compact Uniform Footer Navigation */}
      <footer className="relative z-10 flex justify-center items-center gap-4 pt-2 shrink-0">
        <Link
          href="/occasion"
          className="px-8 py-2.5 rounded-full border border-white/30 text-white/90 text-xs font-semibold tracking-widest hover:bg-white/10 hover:border-white/50 transition-all"
        >
          BACK
        </Link>

        <Link
          href="/bodytype"
          className="px-8 py-2.5 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all uppercase"
        >
          CONTINUE &rarr;
        </Link>
      </footer>
    </div>
  );
}