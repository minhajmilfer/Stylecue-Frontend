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
    image: "/Images/V%20Neck%20Summer%20Blouse.jpeg",
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
    image: "/Images/V%20Neck%20Linen%20Tunic.jpeg",
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
    image: "/Images/Silk%20Button-Up%20Shirt.jpeg",
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
    image: "/Images/Ribbed%20Knit%20Top.jpeg",
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

  const cartQueryString = `?name=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}&price=${product.price}&size=${selectedSize}`;

  return (
    <div className="relative h-screen max-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-4 md:p-6 font-sans select-none overflow-hidden box-border">
      
      {/* Top-Left Corner Curve Signature */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-45">
        <svg width="220" height="220" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg width="220" height="220" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 260 40 C 170 40 40 170 40 260" stroke="url(#cornerGradBR)" strokeWidth="2" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="cornerGradBR" x1="240" y1="240" x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between shrink-0 pt-1">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <Image 
            src="/logo.png" 
            alt="StyleCue Logo" 
            width={24} 
            height={24} 
            priority
            style={{ width: "auto", height: "auto" }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105 shrink-0"
          />
          <span className="uppercase font-bold tracking-widest text-white text-xs">
            STYLECUE
          </span>
        </Link>
        {selectedIds.length > 1 && (
          <span className="text-[10px] md:text-xs text-amber-300 font-semibold tracking-widest">
            ITEM {currentIndex + 1} OF {selectedIds.length}
          </span>
        )}
      </header>

      {/* Main Layout Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center my-auto py-2 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Product Image Side */}
          <div className="md:col-span-6 relative flex flex-col items-center">
            <div className={`w-full max-w-[340px] md:max-w-none aspect-[4/3] rounded-2xl ${product.imageBg} flex items-center justify-center shadow-xl relative overflow-hidden border border-white/10`}>
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-0.5 bg-amber-400 text-purple-950 text-[10px] font-bold tracking-wider rounded-full shadow-md">
                  {product.discount}
                </span>
              </div>
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <span className="text-white/40 text-xs tracking-widest">[PREVIEW IMAGE]</span>
              )}
            </div>

            {/* Pagination Controls */}
            {selectedIds.length > 1 && (
              <div className="w-full flex justify-between items-center mt-2 px-1">
                <button 
                  onClick={handlePrevItem} 
                  disabled={currentIndex === 0} 
                  className={`text-[10px] uppercase flex items-center gap-1 font-medium transition-colors ${
                    currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:text-amber-300"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Item
                </button>
                <button 
                  onClick={handleNextItem} 
                  disabled={currentIndex === selectedIds.length - 1} 
                  className={`text-[10px] uppercase flex items-center gap-1 font-medium transition-colors ${
                    currentIndex === selectedIds.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:text-amber-300"
                  }`}
                >
                  Next Item <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Product Details Side */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="space-y-1">
              <p className="text-[10px] tracking-widest text-amber-300 font-semibold uppercase">{product.brand}</p>
              <h1 className="text-xl md:text-3xl font-light tracking-wide text-white leading-tight">{product.name}</h1>
              <p className="text-purple-200/80 text-xs leading-relaxed pt-1 line-clamp-3">{product.description}</p>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pt-1 border-t border-white/10">
              <span className="text-xl md:text-2xl font-bold text-amber-300 tracking-wider">{product.formattedPrice}</span>
              <span className="text-xs text-white/40 line-through">{product.originalPrice}</span>
            </div>

            {/* Fitting Cabin Size Selection */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-semibold tracking-widest text-white/70 uppercase block">Select Fitting Cabin Size</span>
              <div className="flex items-center gap-2.5">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold tracking-wider transition-all border ${
                      selectedSize === size ? "bg-amber-400 border-amber-400 text-purple-950 scale-105" : "bg-white/5 border-white/20 text-white hover:bg-white/10"
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

      {/* Footer Navigation */}
      <footer className="relative z-10 w-full max-w-md mx-auto flex items-center justify-between gap-4 pb-1 shrink-0">
        <Link 
          href="/womentops" 
          className="flex-1 py-2 px-5 rounded-full border border-purple-400/30 bg-purple-900/20 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 uppercase tracking-wider hover:bg-purple-800/40 transition-all text-center"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>

        <Link 
          href={`/cart${cartQueryString}&from=browse`} 
          className="flex-1 py-2 px-5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 hover:brightness-110 text-purple-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20 uppercase tracking-widest text-center transition-all"
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