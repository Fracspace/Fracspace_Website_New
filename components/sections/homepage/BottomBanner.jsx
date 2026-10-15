"use client";

import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import qrScannerImg from "../../../assets/fracspace-app-qr.png";
import phoneImg from "../../../assets/appModal/iphone.png";
import { useDownloadApp } from "@/context/DownloadAppContext";

function BottomBanner() {
  const { openDownloadModal } = useDownloadApp();

  const appPoints = [
    "Download our app to view frac price and full details of properties",
    "Verified listings with full legal documentation",
    "Invest and sign digitally in minutes",
    "Track rentals and appreciation live"
  ];

  return (
    <section className="pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-white font-manrope">
      <div className="max-w-[1180px] mx-auto bg-gradient-to-r from-[#0A1F42] via-[#0E2C68] to-[#14357A] rounded-3xl p-8 sm:p-12 lg:p-14 text-white grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden shadow-2xl">
        
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-5">
          <span className="font-mono-plex text-xs uppercase tracking-widest text-[#8FADE2] font-semibold">
            The Fracspace app
          </span>
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight">
            Explore, invest, and earn — all in one app.
          </h2>
          <p className="text-sm sm:text-base text-[#B7C6E4] leading-relaxed max-w-lg">
            Browse verified co-ownership opportunities, complete your investment and track returns directly from your smartphone.
          </p>

          {/* Animated App Unlock Highlight Badge */}
          <div className="relative overflow-hidden flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm font-semibold text-[#DCE7FF] max-w-lg shadow-sm">
            {/* Continuous subtle shimmer light sweep */}
            <div className="absolute inset-0 -translate-x-full animate-pill-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Pulsing Lock Icon Badge */}
            <div className="relative flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-[#6E9BFF]/30 text-white shadow-xs border border-white/30">
              <span className="absolute inset-0 rounded-full bg-[#6E9BFF] animate-ping opacity-35" />
              <Lock className="w-3.5 h-3.5 relative z-10 text-white" />
            </div>

            <span className="relative z-10">
              Download our app to explore frac prices and complete details of all our properties
            </span>
          </div>

          <div className="space-y-2.5 pt-2">
            {appPoints.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#DCE7FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6E9BFF] shrink-0"></span>
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3.5 pt-3">
            <a
              href="https://apps.apple.com/in/app/fracspace/id6498551006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-[#DCE7FF] text-[#0B2452] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-md cursor-pointer"
            >
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.fracspace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-md cursor-pointer"
            >
              Google Play
            </a>
          </div>
        </div>

        {/* Right QR and Screen Preview */}
        <div className="lg:col-span-5 flex items-center justify-center gap-6">
          <div className="bg-white rounded-2xl p-5 text-center text-[#14203A] shadow-xl w-48 sm:w-56">
            <div className="aspect-square rounded-xl bg-[#F7F9FC] p-2 border border-[#E7EBF2] mb-3 flex items-center justify-center">
              <Image
                src={qrScannerImg}
                alt="Scan to download Fracspace app"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-jakarta text-xs sm:text-sm font-bold text-[#14203A]">
              Scan to get the app
            </div>
            <div className="text-[11px] text-[#7B8AA8] mt-1">
              iOS &amp; Android
            </div>
          </div>

          <div className="hidden sm:block w-36 relative shrink-0">
            <Image
              src={phoneImg}
              alt="Fracspace App Mockup"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default BottomBanner;
