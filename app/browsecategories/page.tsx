"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronLeft } from "lucide-react";
import { getDisplayImageUrl } from "@/lib/imageUrl";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FilterType = "All" | "men" | "women" | "kids";
const filters: FilterType[] = ["All", "men", "women", "kids"];

interface Product {
  productId: string;
  name: string;
  category: string | null;
  gender: string | null;
  price: number;
  imageUrl: string | null;
}

interface CategoryCard {
  category: string;
  itemCount: number;
  imageUrl: string | null;
}

const fallbackColors = ["#d4d1cb", "#e0cfc8", "#c9cdd1", "#8c7462", "#556b2f", "#3e2723"];

// Ensures a customer browsing without having gone through the AI Stylist
// path first still has a session - needed so items they pick can be saved.
async function getOrCreateSessionId(): Promise<string> {
  const existing = localStorage.getItem("stylecue_session_id");
  if (existing) return existing;

  const kioskId = localStorage.getItem("stylecue_kiosk_id") || "1";
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kioskId }),
  });
  const data = await res.json();
  localStorage.setItem("stylecue_session_id", data.sessionId);
  return data.sessionId;
}

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrCreateSessionId();

    const fetchProducts = async () => {
      const kioskId = localStorage.getItem("stylecue_kiosk_id") || "1";
      try {
        const res = await fetch(`${API_URL}/products?kioskId=${kioskId}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Build real category cards from whatever products actually exist,
  // instead of a fixed list of 16 fake ones.
  const filteredProducts =
    activeFilter === "All" ? products : products.filter((p) => p.gender === activeFilter);

  const categoryMap = new Map<string, CategoryCard>();
  filteredProducts.forEach((p) => {
    const cat = p.category || "Other";
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, { category: cat, itemCount: 0, imageUrl: p.imageUrl });
    }
    categoryMap.get(cat)!.itemCount += 1;
  });

  const displayedCategories = Array.from(categoryMap.values()).filter((card) =>
    card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-4 md:p-8 font-sans select-none overflow-hidden">
      
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

      {/* Top Header with Interactive Back Breadcrumb */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between shrink-0 pt-1">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <Image 
            src="/logo.png" 
            alt="StyleCue Logo" 
            width={26} 
            height={26} 
            priority
            style={{ width: "auto", height: "auto" }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105 shrink-0"
          />
          <span className="uppercase font-bold tracking-widest text-white text-xs md:text-sm">
            STYLECUE
          </span>
        </Link>

        <Link 
          href="/"
          className="inline-flex items-center gap-1 text-xs text-purple-200/70 hover:text-amber-300 transition-colors font-medium tracking-wide group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Previous Step</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex-grow flex flex-col justify-center my-auto py-4 space-y-5">
        
        {/* Search Bar */}
        <div className="relative w-full max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-white/50" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-white/30 shadow-inner tracking-wide"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-300 to-amber-400 text-purple-950 shadow-[0_0_15px_rgba(251,191,36,0.35)] font-bold scale-105"
                    : "bg-white/5 border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Categories Section */}
        <div className="space-y-4 pt-2">
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-white text-center uppercase drop-shadow-sm">
            Explore Categories
          </h2>

          {isLoading && (
            <p className="text-center text-purple-200/70 text-sm">Loading categories...</p>
          )}

          {!isLoading && displayedCategories.length === 0 && (
            <p className="text-center text-purple-200/70 text-sm">
              No products found yet for this store. Check back once inventory is added.
            </p>
          )}

          {!isLoading && displayedCategories.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              {displayedCategories.map((card, idx) => (
                <Link 
                  href={`/womentops?category=${encodeURIComponent(card.category)}${activeFilter !== "All" ? `&gender=${activeFilter}` : ""}`}
                  key={card.category}
                  className="flex flex-col p-3 rounded-xl bg-purple-950/30 backdrop-blur-sm border border-purple-400/20 hover:border-purple-300/40 hover:bg-purple-900/40 transition-all duration-300 group cursor-pointer shadow-lg"
                >
                  <div 
                    className="relative w-full aspect-[4/3] rounded-lg mb-2.5 overflow-hidden flex items-center justify-center shadow-inner group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ backgroundColor: fallbackColors[idx % fallbackColors.length] }}
                  >
                    {card.imageUrl ? (
                      <Image
                        src={getDisplayImageUrl(card.imageUrl)!}
                        alt={card.category}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-white/50 text-xs tracking-widest uppercase font-semibold">
                        {card.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="px-1 space-y-0.5">
                    <h3 className="text-xs md:text-sm font-semibold tracking-wider text-white truncate capitalize">
                      {card.category}
                    </h3>
                    <p className="text-[10px] md:text-xs tracking-wide text-white/50 font-medium">
                      {card.itemCount} {card.itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}