"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// Expanded product list for Tops & Blouses
const products = [
  {
    id: 1,
    brand: "HUF&DEE",
    name: "V Neck Summer Blouse",
    price: "Rs.2,190",
    originalPrice: "Rs.3,790",
    discount: "41% OFF",
    imageBg: "bg-gradient-to-br from-[#d4d1cb] to-[#a3a19b]",
    image: "/Images/V%20Neck%20Summer%20Blouse.jpeg",
  },
  {
    id: 2,
    brand: "STYLECUE ATELIER",
    name: "V Neck Linen Tunic",
    price: "Rs.1,190",
    originalPrice: "Rs.1,590",
    discount: "25% OFF",
    imageBg: "bg-gradient-to-br from-[#e0cfc8] to-[#bca69e]",
    image: "/Images/V%20Neck%20Linen%20Tunic.jpeg",
  },
  {
    id: 3,
    brand: "ELEGANCE",
    name: "Silk Button-Up Shirt",
    price: "Rs.3,490",
    originalPrice: "Rs.4,590",
    discount: "24% OFF",
    imageBg: "bg-gradient-to-br from-[#c9cdd1] to-[#9a9fa6]",
    image: "/Images/Silk%20Button-Up%20Shirt.jpeg",
  },
  {
    id: 4,
    brand: "URBAN CHIC",
    name: "Ribbed Knit Top",
    price: "Rs.1,890",
    originalPrice: "Rs.2,490",
    discount: "24% OFF",
    imageBg: "bg-gradient-to-br from-[#8c7462] to-[#5c4a3d]",
    image: "/Images/Ribbed%20Knit%20Top.jpeg",
  },
];

export default function TopsAndBlousesPage() {
  // State to handle multiple selection of products
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) // Remove if already selected
        : [...prev, id] // Add if not selected
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col p-8 md:p-12 font-sans overflow-x-hidden">
      
      {/* Top Header & Logo */}
      <header className="w-full max-w-7xl mx-auto mb-6 flex items-center justify-between">
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

      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto mb-8 flex items-center gap-2 text-xs tracking-widest text-white/50 uppercase font-medium">
        <Link href="/" className="hover:text-white transition-colors">HOME</Link>
        <span>&gt;</span>
        <Link href="/browsecategories" className="hover:text-white transition-colors">CATEGORIES</Link>
        <span>&gt;</span>
        <span className="text-amber-400 font-semibold">WOMEN TOPS</span>
      </div>

      {/* Title */}
      <div className="w-full max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl md:text-[2.75rem] font-light tracking-wide text-white">
          Explore Tops & Blouses
        </h1>
      </div>

      {/* Product Grid */}
      <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product) => {
            const isSelected = selectedItems.includes(product.id);

            return (
              <div 
                key={product.id}
                onClick={() => toggleSelection(product.id)}
                className={`flex flex-row gap-6 p-4 md:p-6 rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-sm border ${
                  isSelected 
                    ? "bg-amber-400/10 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.2)] scale-[1.02]" 
                    : "bg-purple-950/30 border-purple-500/20 hover:bg-purple-900/40 hover:border-purple-400/40"
                }`}
              >
                {/* Product Image Placeholder */}
                <div className={`w-[40%] aspect-[3/4] rounded-2xl flex items-center justify-center shadow-inner overflow-hidden relative ${product.imageBg}`}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 40vw, 20vw"
                      className="object-cover"
                    />
                  ) : (
                   <span className="text-white/30 text-xs tracking-widest font-medium">[IMAGE]</span>
                  )}
                   
                   {/* Selected Overlay Checkmark */}
                   {isSelected && (
                     <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow-lg animate-in zoom-in duration-200 z-10">
                       <Check className="w-5 h-5 text-purple-950 stroke-[3]" />
                     </div>
                   )}
                </div>

                {/* Product Details */}
                <div className="w-[60%] flex flex-col justify-center space-y-3 py-2 pr-2">
                  
                  {/* Discount Badge */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-400 text-purple-950 text-[10px] font-bold tracking-wider rounded-full">
                      {product.discount}
                    </span>
                  </div>

                  {/* Brand & Name */}
                  <div className="space-y-1">
                    <p className="text-[10px] tracking-widest text-white/50 font-semibold uppercase">
                      {product.brand}
                    </p>
                    <h3 className="text-xl md:text-2xl font-light tracking-wide text-white leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end gap-3 pt-2">
                    <span className="text-2xl font-bold text-amber-400 tracking-wider">
                      {product.price}
                    </span>
                    <span className="text-sm text-white/40 line-through pb-1">
                      {product.originalPrice}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button 
                      className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all flex items-center gap-2 ${
                        isSelected 
                          ? "bg-amber-400 text-purple-950 border border-amber-400"
                          : "bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400/10"
                      }`}
                    >
                      {isSelected ? "SELECTED" : "SELECT"} 
                      {!isSelected && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full max-w-2xl mx-auto flex items-center justify-between gap-6 pb-4 mt-auto">
        <Link
          href="/browsecategories"
          className="flex-1 py-3.5 px-8 rounded-full border border-purple-400/30 bg-purple-900/20 hover:bg-purple-800/40 text-purple-200 text-sm font-semibold flex items-center justify-center gap-2 transition-all text-center uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <Link
          href={selectedItems.length > 0 ? `/reviewselection?ids=${selectedItems.join(",")}` : "#"}
          className={`flex-1 py-3.5 px-8 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all text-center uppercase tracking-widest ${
            selectedItems.length > 0
              ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-purple-950 shadow-lg shadow-amber-500/20"
              : "bg-white/10 text-white/40 pointer-events-none border border-white/10"
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </footer>
    </div>
  );
}