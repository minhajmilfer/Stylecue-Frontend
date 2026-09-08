"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// This is your backend's address - set in .env.local as NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Global standard measurements mapping
const standardMeasurements: Record<string, { height: string; waist: string }> = {
  XS: { height: "160", waist: "24" },
  S: { height: "164", waist: "26" },
  M: { height: "168", waist: "28" },
  L: { height: "172", waist: "30" },
  XL: { height: "176", waist: "32" },
  XXL: { height: "182", waist: "34" },
};

// Gets the current session ID from the browser's storage, or creates a new
// one by asking the backend, if this is the customer's first screen.
async function getOrCreateSessionId(): Promise<string> {
  const existing = localStorage.getItem("stylecue_session_id");
  if (existing) return existing;

  // kioskId identifies which store's kiosk this is. For now this is
  // hardcoded to "1" (the first store in your database) - later this
  // should come from however you identify which kiosk is running the app.
  const kioskId = localStorage.getItem("stylecue_kiosk_id") || "1";

  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kioskId }),
  });
  if (!res.ok) throw new Error("Could not start a session with the backend");
  const data = await res.json();
  localStorage.setItem("stylecue_session_id", data.sessionId);
  return data.sessionId;
}

export default function MeasurementsPage() {
  const router = useRouter();
  const [height, setHeight] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle clicking a general size button
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setHeight(standardMeasurements[size].height);
    setWaist(standardMeasurements[size].waist);
  };

  // Handle manual input typing
  const handleInputChange = (field: "height" | "waist", value: string) => {
    if (selectedSize) setSelectedSize(null);
    if (field === "height") setHeight(value);
    if (field === "waist") setWaist(value);
  };

  // Saves the measurements to the backend, then moves to the next screen.
  const handleContinue = async () => {
    if (!height && !waist && !selectedSize) return; // nothing entered yet

    setIsSaving(true);
    setErrorMessage(null);
    try {
      const sessionId = await getOrCreateSessionId();
      const bodyType = localStorage.getItem("stylecue_body_type");

      const res = await fetch(`${API_URL}/sessions/${sessionId}/measurements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heightCm: parseFloat(height),
          waistInches: parseFloat(waist),
          standardSize: selectedSize || null,
          bodyType: bodyType || null,
        }),
      });

      if (!res.ok) throw new Error("The backend rejected the measurements");

      router.push("/results");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong saving your measurements. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const canContinue = Boolean(height || waist || selectedSize);

  return (
    <div className="relative h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-6 md:p-10 font-sans select-none">
      
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

      {/* Header & Progress Bar (Identical to Category Page) */}
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
          <span className="text-amber-400 text-xs font-semibold">STEP 6 OF 6 (100%)</span>
        </div>

        <p className="text-[10px] tracking-widest text-white/60 font-medium uppercase">
          AI Stylist Assistant Path
        </p>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500" 
            style={{ width: "100%" }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center text-center my-auto w-full max-w-2xl mx-auto py-2 z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">
          Find Your Fit
        </h1>
        <p className="text-purple-200/70 text-sm md:text-base font-normal mb-8 max-w-md leading-relaxed">
          Input your measurements for precision sizing recommendations.
        </p>

        {/* Input Fields */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
          {/* Height Input */}
          <div className="flex-1 flex flex-col text-left">
            <label className="text-[11px] font-semibold tracking-wider text-white/70 mb-2 ml-1 uppercase">
              HEIGHT (CM)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-base font-normal text-white placeholder-white/40 outline-none transition-all duration-200 focus:bg-white/15 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 shadow-inner"
              placeholder="e.g. 168"
            />
          </div>

          {/* Waist Input */}
          <div className="flex-1 flex flex-col text-left">
            <label className="text-[11px] font-semibold tracking-wider text-white/70 mb-2 ml-1 uppercase">
              WAIST (INCH)
            </label>
            <input
              type="number"
              value={waist}
              onChange={(e) => handleInputChange("waist", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-base font-normal text-white placeholder-white/40 outline-none transition-all duration-200 focus:bg-white/15 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 shadow-inner"
              placeholder="e.g. 28"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-[10px] md:text-[11px] font-semibold tracking-widest text-white/40 uppercase">
            OR CHOOSE GENERAL SIZE
          </span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* General Size Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(standardMeasurements).map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-semibold tracking-wider transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? "bg-amber-400 border-amber-400 text-purple-950 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-105"
                    : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {errorMessage && (
          <p className="text-red-300 text-xs mt-4">{errorMessage}</p>
        )}
      </main>

      {/* Footer Navigation (Identical layout/styling to Category page) */}
      <footer className="flex justify-center items-center gap-4 pb-2 z-10 shrink-0">
        <Link
          href="/bodytype"
          className="px-8 py-2.5 rounded-full border border-white/30 bg-white/5 text-white text-xs font-bold tracking-widest hover:bg-white/15 transition-all uppercase"
        >
          BACK
        </Link>
        
        <button
          onClick={handleContinue}
          disabled={!canContinue || isSaving}
          className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all uppercase flex items-center gap-2 ${
            canContinue && !isSaving
              ? "bg-amber-400 text-purple-950 hover:bg-amber-300 shadow-lg shadow-amber-500/20"
              : "bg-white/10 text-white/40 pointer-events-none"
          }`}
        >
          {isSaving ? "SAVING..." : <>FIND MY OUTFIT &rarr;</>}
        </button>
      </footer>
    </div>
  );
}