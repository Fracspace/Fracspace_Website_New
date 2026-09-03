"use client";

import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import FracspaceAppModal from "../components/ui/FracspaceAppModal";

import { DownloadAppProvider } from "../context/DownloadAppContext";
import { useDownloadApp } from "../context/DownloadAppContext";
import FloatingWidgets from "../components/ui/FloatingWidgets";

function LayoutContent({ children }) {
  const { isOpen } = useDownloadApp();

  return (
    <>
      <div className="fixed z-40 w-[100vw] bg-white h-[64px] md:h-[12vh] flex items-center shadow-sm">
        <div className="w-full">
          <Navbar />
        </div>
      </div>
      <div className="mt-[64px] md:mt-[12vh] w-[100%]">{children}</div>

      <div>{isOpen && <FracspaceAppModal />}</div>

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
