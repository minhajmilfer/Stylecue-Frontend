"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const sizes = ["XS", "S", "M", "L"];
const fallbackColors = ["#d4d1cb", "#e0cfc8", "#c9cdd1", "#8c7462"];

interface Product {
  productId: string;
  name: string;
  price: number;
  originalPrice: number | null;
  imageUrl: string | null;
}

function formatPrice(price: number): string {
  return `Rs.${price.toLocaleString("en-US")}`;
}

function ReviewSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ids = (searchParams.get("ids") || "").split(",").filter(Boolean);

  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Each item can have its own chosen size, defaulting to "S" until changed.
  const [sizesByProduct, setSizesByProduct] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const kioskId = localStorage.getItem("stylecue_kiosk_id") || "1";
      try {
        const res = await fetch(`${API_URL}/products?kioskId=${kioskId}`);
        const data: Product[] = await res.json();
        const matched = data.filter((p) => ids.includes(p.productId));
        setProducts(matched);

        const initialSizes: Record<string, string> = {};
        matched.forEach((p) => (initialSizes[p.productId] = "S"));
        setSizesByProduct(initialSizes);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const product = products[currentIndex];
  const selectedSize = product ? sizesByProduct[product.productId] : "S";

  const handleNextItem = () => {
    if (currentIndex < products.length - 1) setCurrentIndex((prev) => prev + 1);
  };
  const handlePrevItem = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };
  const handleSizeChange = (size: string) => {
    if (!product) return;
    setSizesByProduct((prev) => ({ ...prev, [product.productId]: size }));
  };

  // Adds every selected item (each with its own chosen size) to the
  // backend cart, then moves to the cart page to review and confirm.
  const handleAddToCart = async () => {
    const sessionId = localStorage.getItem("stylecue_session_id");
    if (!sessionId || products.length === 0) return;

    setIsAdding(true);
    setErrorMessage(null);
    try {
      await Promise.all(
        products.map((p) =>
          fetch(`${API_URL}/sessions/${sessionId}/selections`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: p.productId, size: sizesByProduct[p.productId] }),
          })
        )
      );
      router.push("/cart");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong adding these to your cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

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
        {products.length > 1 && (
          <span className="text-[10px] md:text-xs text-amber-300 font-semibold tracking-widest">
            ITEM {currentIndex + 1} OF {products.length}
          </span>
        )}
      </header>

      {/* Main Layout Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center my-auto py-2 overflow-hidden">
        {isLoading && (
          <p className="text-center text-purple-200/70 text-sm">Loading your selection...</p>
        )}

        {!isLoading && products.length === 0 && (
          <p className="text-center text-purple-200/70 text-sm">
            Nothing was selected. Go back and pick something first.
          </p>
        )}

        {!isLoading && product && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Product Image Side */}
            <div className="md:col-span-6 relative flex flex-col items-center">
              <div
                className="w-full max-w-[340px] md:max-w-none aspect-[4/3] rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden border border-white/10"
                style={{ backgroundColor: fallbackColors[currentIndex % fallbackColors.length] }}
              >
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white/50 text-xs tracking-widest uppercase font-semibold px-3 text-center">
                    {product.name}
                  </span>
                )}
              </div>

              {products.length > 1 && (
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
                    disabled={currentIndex === products.length - 1} 
                    className={`text-[10px] uppercase flex items-center gap-1 font-medium transition-colors ${
                      currentIndex === products.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:text-amber-300"
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
                <h1 className="text-xl md:text-3xl font-light tracking-wide text-white leading-tight">{product.name}</h1>
              </div>

              <div className="flex items-baseline gap-3 pt-1 border-t border-white/10">
                <span className="text-xl md:text-2xl font-bold text-amber-300 tracking-wider">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-white/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-semibold tracking-widest text-white/70 uppercase block">Select Size</span>
                <div className="flex items-center gap-2.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold tracking-wider transition-all border ${
                        selectedSize === size ? "bg-amber-400 border-amber-400 text-purple-950 scale-105" : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage && <p className="text-red-300 text-xs">{errorMessage}</p>}
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="relative z-10 w-full max-w-md mx-auto flex items-center justify-between gap-4 pb-1 shrink-0">
        <Link 
          href="/browsecategories" 
          className="flex-1 py-2 px-5 rounded-full border border-purple-400/30 bg-purple-900/20 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 uppercase tracking-wider hover:bg-purple-800/40 transition-all text-center"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={products.length === 0 || isAdding}
          className="flex-1 py-2 px-5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 hover:brightness-110 text-purple-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20 uppercase tracking-widest text-center transition-all disabled:opacity-50"
        >
          {isAdding ? "ADDING..." : "Add to Cart +"}
        </button>
      </footer>
    </div>
  );
}

export default function ReviewSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2d1b4e] flex items-center justify-center text-white">Loading...</div>}>
      <ReviewSelectionContent />
    </Suspense>
  );
}