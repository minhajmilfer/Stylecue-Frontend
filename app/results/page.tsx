"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getDisplayImageUrl } from "@/lib/imageUrl";

// This is your backend's address - set in .env.local as NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RecommendedItem {
  productId: string;
  name: string;
  price: number;
  category: string | null;
  imageUrl: string | null;
  recommendedSize: string;
  matchScore: number;
}

// A handful of fallback colors so items without a real photo still look
// distinct from one another, cycling through by position.
const fallbackColors = ["#d4b996", "#2c3e50", "#556b2f", "#6b1d2f", "#34495e", "#3e2723"];

function formatPrice(price: number): string {
  return `Rs.${price.toLocaleString("en-US")}`;
}

export default function ResultsPage() {
  const router = useRouter();
  const [items, setItems] = useState<RecommendedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Fetch real recommendations from the backend when this page loads,
  // using everything gathered on the earlier screens.
  useEffect(() => {
    const fetchRecommendations = async () => {
      const sessionId = localStorage.getItem("stylecue_session_id");
      const gender = localStorage.getItem("stylecue_gender");
      const occasion = localStorage.getItem("stylecue_occasion");

      if (!sessionId || !gender) {
        setErrorMessage("Missing session info - please start over from the beginning.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/recommendations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, gender, occasion: occasion || null }),
        });

        if (!res.ok) throw new Error("The backend could not generate recommendations");

        const data = await res.json();
        setItems(data.recommendations || []);
        if (data.recommendations?.length > 0) {
          setActiveCategory(data.recommendations[0].category || "other");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Something went wrong loading your recommendations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Build the category tabs dynamically from whatever categories actually
  // came back, instead of hardcoding "tops/bottoms/accessories".
  const categories = Array.from(
    new Set(items.map((item) => item.category || "other"))
  );

  const itemsInActiveCategory = items.filter(
    (item) => (item.category || "other") === activeCategory
  );
  const selectedItem = itemsInActiveCategory[selectedIndex] || itemsInActiveCategory[0];

  const midPoint = Math.ceil(itemsInActiveCategory.length / 2);
  const leftItems = itemsInActiveCategory.slice(0, midPoint);
  const rightItems = itemsInActiveCategory.slice(midPoint);

  // Adds the item currently shown in the center preview to the customer's
  // cart on the backend, then moves to the cart page.
  const handleAddToCart = async () => {
    if (!selectedItem) return;
    const sessionId = localStorage.getItem("stylecue_session_id");
    if (!sessionId) return;

    setIsAddingToCart(true);
    try {
      const res = await fetch(`${API_URL}/sessions/${sessionId}/selections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedItem.productId,
          size: selectedItem.recommendedSize,
        }),
      });
      if (!res.ok) throw new Error("Could not add this item to the cart");
      router.push("/cart");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong adding that to your cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

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

        {/* AI Match Complete Badge & Category Tabs */}
        {!isLoading && !errorMessage && items.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="bg-amber-400 text-purple-950 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md tracking-wider">
              AI MATCH COMPLETE
            </div>

            <div className="flex items-center gap-2.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSelectedIndex(0);
                    }}
                    className={`flex items-center px-5 py-2 rounded-full border text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-400 border-amber-400 text-purple-950 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                        : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-grow flex items-center justify-center my-auto py-1">
        {isLoading && (
          <p className="text-purple-200/80 text-sm">Finding your perfect outfit...</p>
        )}

        {!isLoading && errorMessage && (
          <p className="text-red-300 text-sm text-center max-w-md">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && items.length === 0 && (
          <p className="text-purple-200/80 text-sm text-center max-w-md">
            No matching products were found for this store yet. Try a different occasion, or check back once more inventory is added.
          </p>
        )}

        {!isLoading && !errorMessage && items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 items-center w-full max-w-3xl">
            
            {/* Left Thumbnails Column */}
            <div className="flex lg:flex-col items-center justify-center gap-2.5">
              {leftItems.map((item, originalIdx) => {
                const isSelected = selectedIndex === originalIdx;
                const fallbackColor = fallbackColors[originalIdx % fallbackColors.length];
                return (
                  <button
                    key={item.productId}
                    onClick={() => setSelectedIndex(originalIdx)}
                    className={`relative flex flex-col items-center p-1.5 rounded-xl bg-purple-950/40 backdrop-blur-md border transition-all duration-200 group w-28 md:w-32 cursor-pointer ${
                      isSelected
                        ? "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.25)] scale-[1.02] bg-amber-400/10"
                        : "border-white/15 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="relative w-full h-16 md:h-20 rounded-lg mb-1 overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                      {item.imageUrl ? (
                        <Image
                          src={getDisplayImageUrl(item.imageUrl)!}
                          alt={item.name}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: fallbackColor }}>
                          <span className="text-[9px] text-white/70 font-semibold px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                            {item.name.split(" ")[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-amber-300 text-[11px] font-bold tracking-wide">
                      {formatPrice(item.price)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Center: Live Preview Card */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[260px] md:max-w-[280px] bg-purple-950/60 backdrop-blur-2xl border-2 border-amber-400/50 rounded-2xl p-2.5 shadow-2xl flex flex-col justify-between overflow-hidden">
                
                <div className="relative w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden bg-black/20 flex flex-col items-center justify-center">
                  {selectedItem?.imageUrl ? (
                    <Image
                      src={getDisplayImageUrl(selectedItem.imageUrl)!}
                      alt={selectedItem.name}
                      fill
                      sizes="280px"
                      className="object-cover transition-opacity duration-300"
                      priority
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: selectedItem ? fallbackColors[selectedIndex % fallbackColors.length] : "#4a2d5e" }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 flex flex-col justify-end p-2.5 text-center z-10">
                    <span className="text-white font-medium text-xs md:text-sm tracking-wider drop-shadow-md">
                      {selectedItem?.name}
                    </span>
                    <span className="text-amber-300 font-bold text-sm md:text-base mt-0.5 drop-shadow">
                      {selectedItem ? formatPrice(selectedItem.price) : ""}
                    </span>
                  </div>
                </div>

                <div className="w-full py-1.5 bg-black/30 rounded-lg flex items-center justify-center gap-1.5 mt-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                    Live Preview
                  </span>
                </div>
              </div>
            </div>

            {/* Right Thumbnails Column */}
            <div className="flex lg:flex-col items-center justify-center gap-2.5">
              {rightItems.map((item, idx) => {
                const originalIdx = midPoint + idx;
                const isSelected = selectedIndex === originalIdx;
                const fallbackColor = fallbackColors[originalIdx % fallbackColors.length];
                return (
                  <button
                    key={item.productId}
                    onClick={() => setSelectedIndex(originalIdx)}
                    className={`relative flex flex-col items-center p-1.5 rounded-xl bg-purple-950/40 backdrop-blur-md border transition-all duration-200 group w-28 md:w-32 cursor-pointer ${
                      isSelected
                        ? "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.25)] scale-[1.02] bg-amber-400/10"
                        : "border-white/15 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="relative w-full h-16 md:h-20 rounded-lg mb-1 overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                      {item.imageUrl ? (
                        <Image
                          src={getDisplayImageUrl(item.imageUrl)!}
                          alt={item.name}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: fallbackColor }}>
                          <span className="text-[9px] text-white/70 font-semibold px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                            {item.name.split(" ")[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-amber-300 text-[11px] font-bold tracking-wide">
                      {formatPrice(item.price)}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="relative z-10 flex justify-center items-center gap-3 pt-1 shrink-0">
        <Link
          href="/measurements"
          className="px-5 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all uppercase tracking-wider"
        >
          BACK
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={!selectedItem || isAddingToCart}
          className="px-5 py-1.5 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-md shadow-amber-500/20 transition-all uppercase flex items-center gap-1.5 disabled:opacity-50"
        >
          {isAddingToCart ? "ADDING..." : <>ADD TO CART &rarr;</>}
        </button>
      </footer>
    </div>
  );
}