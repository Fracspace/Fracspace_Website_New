"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import {
  DownloadAppProvider,
  useDownloadApp
} from "../context/DownloadAppContext";

// Defer heavy client-side hydration out of the initial critical render path
const FracspaceAppModal = dynamic(
  () => import("../components/ui/FracspaceAppModal"),
  {
    ssr: false
  }
);
const ConcertModal = dynamic(() => import("../components/ui/ConcertModal"), {
  ssr: false
});
const CookieConsent = dynamic(() => import("../components/ui/CookieConsent"), {
  ssr: false
});
const FloatingWidgets = dynamic(
  () => import("../components/ui/FloatingWidgets"),
  {
    ssr: false
  }
);

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
      <div className="pt-[110px] sm:pt-[114px] w-full min-h-screen flex flex-col">
        {children}
      </div>

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
