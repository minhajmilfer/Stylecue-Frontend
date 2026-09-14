"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, RefreshCw, CheckCircle2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StaffRequestItem {
  requestId: number;
  sessionId: string;
  productIds: string[];
  requestedSize: string;
  kioskLocation: string;
  status: string;
  estimatedWaitTimeMinutes: number;
  createdAt: string;
}

function timeAgo(dateString: string): string {
  // The backend sends UTC time without explicitly marking it as such,
  // so we add "Z" here to tell the browser it's UTC - otherwise it
  // wrongly assumes the time is already in the viewer's local timezone.
  const utcString = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const diffMs = Date.now() - new Date(utcString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;

}

export default function StaffDashboardPage() {
  const [requests, setRequests] = useState<StaffRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "all">("pending");

  const fetchRequests = async (activeFilter: "pending" | "all") => {
    setIsLoading(true);
    try {
      const query = activeFilter === "pending" ? "?status=pending" : "";
      const res = await fetch(`${API_URL}/staff-requests/demo/all${query}`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleMarkFulfilled = async (requestId: number) => {
    try {
      await fetch(`${API_URL}/staff-requests/demo/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "fulfilled" }),
      });
      fetchRequests(filter);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#3d1a58] to-[#5c1c5c] text-white p-4 md:p-8 font-sans">
      <header className="max-w-4xl mx-auto flex items-center gap-2.5 mb-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="StyleCue Logo" width={28} height={28} style={{ width: "auto", height: "auto" }} />
          <div>
            <div className="uppercase font-bold tracking-widest text-white text-xs">STYLECUE STAFF</div>
            <div className="text-[11px] text-purple-200/70">Sales Staff View</div>
          </div>
        </Link>
      </header>

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-light">Customer Orders</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === "pending" ? "bg-amber-400 text-purple-950" : "bg-white/5 border border-white/15 text-white/80"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === "all" ? "bg-amber-400 text-purple-950" : "bg-white/5 border border-white/15 text-white/80"
              }`}
            >
              All
            </button>
            <button
              onClick={() => fetchRequests(filter)}
              className="p-1.5 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 transition-all"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {isLoading && requests.length === 0 && (
          <p className="text-center text-purple-200/70 text-sm py-10">Loading orders...</p>
        )}

        {!isLoading && requests.length === 0 && (
          <p className="text-center text-purple-200/70 text-sm py-10">
            No {filter === "pending" ? "pending " : ""}orders right now. Go confirm a selection in the customer app to see it appear here.
          </p>
        )}

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.requestId}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    Order #{req.requestId} — {req.productIds.length} item{req.productIds.length !== 1 ? "s" : ""}
                  </div>
                  <div className="text-xs text-purple-200/70">
                    Items: {req.productIds.join(", ")} · Size {req.requestedSize}
                  </div>
                  <div className="text-xs text-purple-200/50">
                    {req.kioskLocation} · {timeAgo(req.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-12 md:pl-0">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    req.status === "fulfilled"
                      ? "bg-green-400/20 text-green-300"
                      : "bg-amber-400/20 text-amber-300"
                  }`}
                >
                  {req.status}
                </span>

                {req.status !== "fulfilled" && (
                  <button
                    onClick={() => handleMarkFulfilled(req.requestId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-purple-950 text-xs font-bold hover:brightness-110 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Fulfilled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}