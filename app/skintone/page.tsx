"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Palette } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#321347] to-[#581c4e] text-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans">
      
      {/* Top Header & Progress Bar */}
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
          <span className="text-amber-400">STEP 4 OF 6 (66%)</span>
        </div>
        <p className="text-[10px] tracking-widest text-white/60 font-medium mb-3 uppercase">
          AI Stylist Assistant Path
        </p>
        <div className="w-full h-1.5 bg-purple-950/60 rounded-full overflow-hidden border border-purple-800/30">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 ease-out"
            style={{ width: "66%" }}
          ></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col justify-center py-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-white">
            Colour Matching
          </h1>
          <p className="text-purple-200/70 text-sm md:text-base max-w-md mx-auto">
            We analyze your skin undertones to suggest palettes that make you pop.
          </p>
        </div>

        {/* Main Content Card (Frosted Glass Container) */}
        <div className="bg-purple-950/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          
          {/* Left Side: Dynamic Large Circle Preview */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center space-y-4 w-full md:w-64 shrink-0 shadow-lg">
            <span className="uppercase tracking-wider text-purple-200/80 text-xs font-semibold">
              Selected Skin Tone
            </span>
            
            <div className="relative group my-2">
              <div
                className="absolute -inset-1 rounded-full opacity-70 blur-md transition-all duration-300"
                style={{ backgroundColor: currentProfile.hex }}
              ></div>
              <div
                className="relative w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white/80 shadow-2xl transition-colors duration-200"
                style={{ backgroundColor: currentProfile.hex }}
              ></div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-amber-300 transition-all duration-200">
                {currentProfile.label}
              </h3>
              <p className="text-purple-200/60 text-xs leading-relaxed">
                This is your current preview tone.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Slider & Dynamic Text */}
          <div className="flex-grow w-full space-y-8">
            
            {/* Slider Section */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs md:text-sm font-medium text-purple-200/80 px-2">
                <span>Fair</span>
                <span>Medium</span>
                <span>Rich / Deep</span>
              </div>

              {/* Skin Tone Gradient Bar with White-Bordered Custom Thumb */}
              <div className="relative py-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-4 rounded-full appearance-none cursor-pointer outline-none shadow-inner border border-amber-300/30
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-7 
                    [&::-webkit-slider-thumb]:h-7 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-amber-400 
                    [&::-webkit-slider-thumb]:border-4 
                    [&::-webkit-slider-thumb]:border-white 
                    [&::-webkit-slider-thumb]:shadow-md 
                    [&::-webkit-slider-thumb]:transition-transform 
                    [&::-webkit-slider-thumb]:hover:scale-110 
                    [&::-moz-range-thumb]:w-7 
                    [&::-moz-range-thumb]:h-7 
                    [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:bg-amber-400 
                    [&::-moz-range-thumb]:border-4 
                    [&::-moz-range-thumb]:border-white 
                    [&::-moz-range-thumb]:shadow-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #fce5d8, #f3d2b8, #e0ac69, #c68642, #8d5524, #3c1402)",
                  }}
                />
              </div>

              {/* Dynamic Selected Labels & Detail Info */}
              <div className="text-center space-y-1 pt-2">
                <div className="text-amber-300 font-semibold tracking-wider text-sm md:text-base uppercase">
                  Selected: <span className="text-white font-bold">{currentProfile.label}</span>
                </div>
                <div className="text-purple-200/60 text-xs">
                  Depth: {currentProfile.depth} &nbsp;|&nbsp; Undertone: {currentProfile.undertone}
                </div>
              </div>
            </div>

            {/* Stylist Tip & Dynamic Color Recommendation Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 space-y-6 flex flex-col md:flex-row gap-6 items-center backdrop-blur-md">
              <div className="flex items-start gap-3 flex-1">
                <Palette className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
                <div className="text-purple-100 text-xs md:text-sm leading-relaxed">
                  <span className="font-semibold text-amber-300">Stylist tip: </span>
                  {currentProfile.stylistTip}
                </div>
              </div>

              {/* Recommended Color Swatches */}
              <div className="flex items-center justify-around md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                {currentProfile.recommendedColors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/80 shadow-md transition-colors duration-300"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="text-white/80 text-[10px] font-medium tracking-wide">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="w-full max-w-xl mx-auto flex items-center justify-between gap-6 pt-4">
        <Link
          href="/occasion"
          className="flex-1 py-3 px-8 rounded-full border border-purple-400/30 bg-purple-900/20 hover:bg-purple-800/40 text-purple-200 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 text-center uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <Link
          href="/measurements"
          className="flex-1 py-3 px-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-purple-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all duration-200 text-center uppercase tracking-widest"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </footer>
    </div>
  );
}