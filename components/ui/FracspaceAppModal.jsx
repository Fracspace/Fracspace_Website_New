"use client";

import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import appStoreImg from "../../assets/appModal/appStore.png";
import playStoreImg from "../../assets/appModal/playstore.png";
import qrScannerImg from "../../assets/appModal/qr.png";
import phoneImg from "../../assets/appModal/iphone.png";
import { useDownloadApp } from "@/context/DownloadAppContext";

function FracspaceAppModal() {
  const { closeDownloadModal } = useDownloadApp();

  return (
    <div
      onClick={closeDownloadModal}
      className="fixed inset-0 z-[100] bg-[#0A1428]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-manrope"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#E7EBF2] animate-fsSlideUp my-auto"
      >
        {/* Close Button */}
        <button
          onClick={closeDownloadModal}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#E7EBF2] hover:bg-[#0B2452] hover:text-white text-[#4A5878] flex items-center justify-center transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Text & Actions */}
          <div className="lg:col-span-7 space-y-5">
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
              Fracspace Mobile
            </span>
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14203A] leading-tight">
              Manage your Fracspace investments in the app
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B8A] leading-relaxed">
              Explore properties, invest in fractions, and track your portfolio — all in the Fracspace app.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-6">
              {/* QR Box */}
              <div className="w-32 h-32 p-2.5 rounded-2xl border border-[#E7EBF2] bg-[#F7F9FC] shrink-0 flex items-center justify-center">
                <Image
                  src={qrScannerImg}
                  alt="Scan QR code to download"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <h3 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A]">
                  Scan the QR to get the app
                </h3>
                <p className="text-xs italic text-[#7B8AA8]">
                  Available on iOS and Android
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0B1526] hover:bg-[#16418C] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    App Store
                  </a>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0B1526] hover:bg-[#16418C] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Google Play
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Phone Mockup - Desktop only */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
            <div className="relative w-56 sm:w-64 max-w-full flex items-center justify-center">
              <Image
                src={phoneImg}
                alt="Fracspace App Interface"
                className="w-full h-auto object-contain max-h-[460px] drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FracspaceAppModal;

