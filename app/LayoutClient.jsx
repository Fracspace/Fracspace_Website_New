"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import FracspaceAppModal from "../components/ui/FracspaceAppModal";
import ConcertModal from "../components/ui/ConcertModal";

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

    const timer = setTimeout(() => {
      setIsConcertModalOpen(true);
    }, 1200); // 1.2s delay after initial load

    return () => clearTimeout(timer);
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
