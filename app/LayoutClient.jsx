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
      <Navbar />
      <div className="pt-[74px] w-full min-h-screen flex flex-col">{children}</div>

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

