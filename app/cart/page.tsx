"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { getDisplayImageUrl } from "@/lib/imageUrl";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CartItem {
  productId: string;
  name: string;
  size: string;
  price: number;
  imageUrl?: string | null;
}

function formatPrice(price: number): string {
  return `Rs.${price.toLocaleString("en-US")}`;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load the real cart from the backend when this page opens.
  useEffect(() => {
    const fetchCart = async () => {
      const sessionId = localStorage.getItem("stylecue_session_id");
      if (!sessionId) {
        setErrorMessage("Missing session info - please start over from the beginning.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/sessions/${sessionId}/selections`);
        if (!res.ok) throw new Error("Could not load your cart");
        const data = await res.json();
        setCartItems(data.items || []);
        setTotalPrice(data.totalPrice || 0);
      } catch (err) {
        console.error(err);
        setErrorMessage("Something went wrong loading your cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Confirms the cart with the backend - this is what actually notifies
  // sales staff to bring these items to the kiosk.
  const handleConfirm = async () => {
    const sessionId = localStorage.getItem("stylecue_session_id");
    if (!sessionId) return;

    setIsConfirming(true);
    setErrorMessage(null);
    try {
      // kioskLocation tells staff where to bring the items. For now this
      // is a fixed label - later this could come from wherever the kiosk's
      // physical location is configured.
      const res = await fetch(`${API_URL}/sessions/${sessionId}/selections/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kioskLocation: "Main Hall Kiosk" }),
      });
      if (!res.ok) throw new Error("Could not confirm your selection");
      const data = await res.json();

      // Save the real request ID so the confirmation page can show it.
      localStorage.setItem("stylecue_request_id", String(data.requestId));
      router.push("/confirmation");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong confirming your order. Please try again.");
    } finally {
      setIsConfirming(false);
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

      {/* Top Header & Progress Bar */}
      <header className="relative z-10 w-full max-w-4xl mx-auto space-y-1.5 shrink-0">
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
          Order Review & Checkout
        </p>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full w-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-2xl mx-auto flex-grow flex flex-col justify-center my-auto py-2 space-y-3">
        <div>
          <h1 className="text-xl md:text-2xl font-light tracking-wide text-white">
            Order Review
          </h1>
        </div>

        {isLoading && (
          <p className="text-purple-200/80 text-sm text-center">Loading your cart...</p>
        )}

        {!isLoading && errorMessage && (
          <p className="text-red-300 text-sm text-center">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && cartItems.length === 0 && (
          <p className="text-purple-200/80 text-sm text-center">
            Your cart is empty. Go back and add something you like!
          </p>
        )}

        {!isLoading && !errorMessage && cartItems.length > 0 && (
          <>
            {/* Cart Item Cards List */}
            <div className="space-y-2.5 w-full">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="bg-purple-950/30 backdrop-blur-xl border border-purple-500/20 rounded-xl p-2.5 md:p-3 flex items-center justify-between shadow-lg hover:border-purple-400/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {/* Product Thumbnail Placeholder / Image Box */}
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-purple-900/40 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                      {item.imageUrl ? (
                        <Image src={getDisplayImageUrl(item.imageUrl)!} alt={item.name} width={48} height={48} className="object-cover" />
                      ) : (
                        <ShoppingBag className="w-4 h-4 text-amber-300/70" />
                      )}
                    </div>
                    
                    {/* Item Details */}
                    <div className="space-y-0.5">
                      <h3 className="text-xs md:text-sm font-semibold tracking-wide text-white">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-purple-200/60 tracking-wide">
                        Size {item.size}
                      </p>
                    </div>
                  </div>

                  {/* Item Price */}
                  <div className="text-amber-300 font-bold text-xs md:text-sm tracking-wider pr-1">
                    {formatPrice(item.price)}
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Amount & Total Row */}
            <div className="flex items-center justify-between pt-1 px-1">
              <span className="text-purple-200/80 text-xs md:text-sm font-medium tracking-wide">
                Estimated Amount
              </span>
              <div className="text-base md:text-lg font-bold text-amber-400 tracking-wider">
                Total: {formatPrice(totalPrice)}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer Navigation & Checkout Actions */}
      <footer className="relative z-10 flex justify-center items-center gap-3 pt-1 shrink-0">
        <Link
          href="/results"
          className="px-5 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all uppercase tracking-wider"
        >
          KEEP SHOPPING
        </Link>

        <button
          onClick={handleConfirm}
          disabled={cartItems.length === 0 || isConfirming}
          className="px-5 py-1.5 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 hover:brightness-110 shadow-md shadow-amber-500/20 transition-all uppercase flex items-center gap-1.5 disabled:opacity-50"
        >
          {isConfirming ? "CONFIRMING..." : <>CONFIRM & NOTIFY STAFF &rarr;</>}
        </button>
      </footer>
    </div>
  );
}