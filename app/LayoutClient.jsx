"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import FracspaceAppModal from "../components/ui/FracspaceAppModal";
import ConcertModal from "../components/ui/ConcertModal";
import CookieConsent from "../components/ui/CookieConsent";

import { DownloadAppProvider } from "../context/DownloadAppContext";
import { useDownloadApp } from "../context/DownloadAppContext";
import FloatingWidgets from "../components/ui/FloatingWidgets";

function LayoutContent({ children }) {
  const { isOpen } = useDownloadApp();
  const pathname = usePathname();
  const [isConcertModalOpen, setIsConcertModalOpen] = useState(false);

  useEffect(() => {
    // Only auto-open concert popup modal on the main homepage ("/")
    if (pathname !== "/") {
      setIsConcertModalOpen(false);
      return;
    }

    // Check if user already gave or rejected cookie consent
    let consent = null;
    try {
      consent = localStorage.getItem("cookieConsent");
    } catch (e) {}

    let timer = null;
    if (consent) {
      // Consent was already resolved in a previous session: show concert modal after short delay
      timer = setTimeout(() => {
        setIsConcertModalOpen(true);
      }, 1000);
    }

    // Listen for cookie consent selection (fires when user clicks Accept or Reject)
    const handleConsentChange = () => {
      if (pathname === "/") {
        setTimeout(() => {
          setIsConcertModalOpen(true);
        }, 600);
      }
    };

    window.addEventListener("cookie-consent-change", handleConsentChange);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, [pathname]);

  return (
    <>
      <Navbar onOpenConcertModal={() => setIsConcertModalOpen(true)} />
      <div className="pt-[110px] sm:pt-[114px] w-full min-h-screen flex flex-col">{children}</div>

      <ConcertModal
        isOpen={isConcertModalOpen}
        onClose={() => setIsConcertModalOpen(false)}
      />

      {isOpen && <FracspaceAppModal />}

      <FloatingWidgets />

      <CookieConsent />

      <Footer />
    </>
  );
}

export default function LayoutClient({ children }) {
  return (
    <DownloadAppProvider>
      <LayoutContent>{children}</LayoutContent>
    </DownloadAppProvider>
  );
}
