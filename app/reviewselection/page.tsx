"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const allProductsDatabase: Record<number, any> = {
  1: {
    id: 1,
    brand: "HUF&DEE",
    name: "V Neck Summer Blouse",
    description: "An airy, elegant summer classic crafted from 100% sustainably sourced organic flax linen. Expertly draped for absolute movement and comfort.",
    price: 2190,
    formattedPrice: "Rs.2,190",
    originalPrice: "Rs.3,790",
    discount: "41% OFF",
    imageBg: "bg-gradient-to-br from-[#d4d1cb] to-[#a3a19b]",
  },
  2: {
    id: 2,
    brand: "STYLECUE ATELIER",
    name: "V Neck Linen Tunic",
    description: "A lightweight, breathable artisan tunic designed for effortless daily layering with a relaxed contemporary drape.",
    price: 1190,
    formattedPrice: "Rs.1,190",
    originalPrice: "Rs.1,590",
    discount: "25% OFF",
    imageBg: "bg-gradient-to-br from-[#e0cfc8] to-[#bca69e]",
  },
  3: {
    id: 3,
    brand: "ELEGANCE",
    name: "Silk Button-Up Shirt",
    description: "Luxurious pure silk shirt offering a smooth finish, classic collar structure, and a sophisticated sheen for evening or office wear.",
    price: 3490,
    formattedPrice: "Rs.3,490",
    originalPrice: "Rs.4,590",
    discount: "24% OFF",
    imageBg: "bg-gradient-to-br from-[#c9cdd1] to-[#9a9fa6]",
  },
  4: {
    id: 4,
    brand: "URBAN CHIC",
    name: "Ribbed Knit Top",
    description: "Form-fitting textured ribbed knit top engineered with premium stretch fabric to balance structural fit with ultimate ease.",
    price: 1890,
    formattedPrice: "Rs.1,890",
    originalPrice: "Rs.2,490",
    discount: "24% OFF",
    imageBg: "bg-gradient-to-br from-[#8c7462] to-[#5c4a3d]",
  },
};

const sizes = ["XS", "S", "M", "L"];

function ReviewSelectionContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");
  const parsedIds = idsParam
    ? idsParam.split(",").map(Number).filter((id) => allProductsDatabase[id])
    : [];
  const selectedIds = parsedIds.length > 0 ? parsedIds : [1, 2];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");

  const currentProductId = selectedIds[currentIndex] || selectedIds[0] || 1;
  const product = allProductsDatabase[currentProductId] || allProductsDatabase[1];

  const handleNextItem = () => {
    if (currentIndex < selectedIds.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Construct URL query parameters to pass name, brand, price, and selected size to cart
  const cartQueryString = `?name=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}&price=${product.price}&size=${selectedSize}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col p-8 md:p-12 font-sans overflow-x-hidden justify-between">
      
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between">
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
        {selectedIds.length > 1 && (
          <span className="text-xs text-amber-300 font-semibold tracking-widest">
            ITEM {currentIndex + 1} OF {selectedIds.length}
          </span>
        )}
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative">
            <div className={`w-full aspect-[4/3] rounded-3xl ${product.imageBg} flex items-center justify-center shadow-2xl relative overflow-hidden border border-white/10`}>
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-1.5 bg-amber-400 text-purple-950 text-xs font-bold tracking-wider rounded-full shadow-md">
                  {product.discount}
                </span>
              </div>
              <span className="text-white/40 text-sm tracking-widest">[PREVIEW IMAGE]</span>
            </div>
            {selectedIds.length > 1 && (
              <div className="flex justify-between items-center mt-4 px-2">
                <button onClick={handlePrevItem} disabled={currentIndex === 0} className={`text-xs uppercase flex items-center gap-1 ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:text-amber-300"}`}>
                  <ArrowLeft className="w-4 h-4" /> Previous Item
                </button>
                <button onClick={handleNextItem} disabled={currentIndex === selectedIds.length - 1} className={`text-xs uppercase flex items-center gap-1 ${currentIndex === selectedIds.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:text-amber-300"}`}>
                  Next Item <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <p className="text-xs tracking-widest text-amber-400 font-semibold uppercase">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-white leading-tight">{product.name}</h1>
              <p className="text-purple-200/70 text-sm leading-relaxed pt-2">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-4 pt-2 border-t border-white/10">
              <span className="text-3xl font-bold text-amber-400 tracking-wider">{product.formattedPrice}</span>
              <span className="text-base text-white/40 line-through">{product.originalPrice}</span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">Select Fitting Cabin Size</span>
              <div className="flex items-center gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold tracking-wider transition-all border ${
                      selectedSize === size ? "bg-amber-400 border-amber-400 text-purple-950 scale-110" : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="w-full max-w-4xl mx-auto flex items-center justify-between gap-6 pt-4">
        <Link 
          href="/womentops" 
          className="flex-1 py-4 px-8 rounded-full border border-purple-400/30 bg-purple-900/20 text-purple-200 text-sm font-semibold flex items-center justify-center gap-2 uppercase tracking-wider hover:bg-purple-800/40 transition-all text-center"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Passes dynamic item details via query string to Cart */}
        <Link 
          href={`/cart${cartQueryString}&from=browse`} 
          className="flex-1 py-4 px-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-purple-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 uppercase tracking-widest text-center transition-all"
        >
          Add to Cart +
        </Link>
      </footer>
    </div>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2d1b4e] flex items-center justify-center text-white">Loading...</div>}>
      <ReviewSelectionContent />
    </Suspense>
  );
}