"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";

// Initial Cart items based on your mockup
const initialCartItems = [
  {
    id: 1,
    name: "V Neck Linen Dress",
    category: "Contemporary • Women • M",
    price: 2190,
    formattedPrice: "Rs.2,190",
  },
  {
    id: 2,
    name: "Classic Pleated Trousers",
    category: "Classic • Women • S",
    price: 1950,
    formattedPrice: "Rs.1,950",
  },
  {
    id: 3,
    name: "Premium Artisan Woolen Coat",
    category: "Ethnic • Women • M",
    price: 18900,
    formattedPrice: "Rs.18,900",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calculate total automatically
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
  const formattedTotal = `Rs.${totalAmount.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white flex flex-col justify-between p-6 md:p-12 font-sans">
      
      {/* Top Header & Progress Bar */}
      <header className="w-full max-w-5xl mx-auto space-y-3">
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
          <span className="text-amber-400">STEP 6 OF 6 (100%)</span>
        </div>

        <div className="flex justify-between items-end">
          <p className="text-[10px] tracking-widest text-white/60 uppercase font-medium">
            Order Review & Checkout
          </p>
        </div>
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full w-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col justify-center py-8 space-y-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-white">
            Order Review
          </h1>
        </div>

        {/* Cart Item Cards List */}
        <div className="space-y-4 w-full">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-purple-950/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-lg hover:border-purple-400/40 transition-all"
            >
              <div className="flex items-center gap-5">
                {/* Product Thumbnail Placeholder / Image Box */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-purple-900/40 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                  <ShoppingBag className="w-6 h-6 text-amber-300/70" />
                </div>
                
                {/* Item Details */}
                <div className="space-y-1">
                  <h3 className="text-base md:text-lg font-semibold tracking-wide text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-purple-200/60 tracking-wide">
                    {item.category}
                  </p>
                </div>
              </div>

              {/* Item Price */}
              <div className="text-amber-300 font-bold text-base md:text-lg tracking-wider pr-2">
                {item.formattedPrice}
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Amount & Total Row */}
        <div className="flex items-center justify-between pt-4 px-2">
          <span className="text-purple-200/80 text-sm md:text-base font-medium tracking-wide">
            Estimated Amount
          </span>
          <div className="text-2xl md:text-3xl font-bold text-amber-400 tracking-wider">
            Total: {formattedTotal}
          </div>
        </div>
      </main>

      {/* Footer Navigation & Checkout Actions */}
      <footer className="w-full max-w-2xl mx-auto flex items-center justify-between gap-6 pt-4">
        <Link
          href="/results"
          className="flex-1 py-3.5 px-8 rounded-full border border-purple-400/30 bg-purple-900/20 hover:bg-purple-800/40 text-purple-200 text-sm font-semibold flex items-center justify-center gap-2 transition-all text-center uppercase tracking-wider"
        >
          Keep Shopping
        </Link>

        <Link
          href="/confirmation" 
          className="flex-1 py-3.5 px-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-purple-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all text-center uppercase tracking-wider"
        >
          Confirm & Notify Staff
          <ArrowRight className="w-4 h-4" />
        </Link>
      </footer>
    </div>
  );
}