"use client";

import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import FracspaceAppModal from "../components/ui/FracspaceAppModal";

import { DownloadAppProvider } from "../context/DownloadAppContext";
import { useDownloadApp } from "../context/DownloadAppContext";

function LayoutContent({ children }) {
  const { isOpen } = useDownloadApp();

  return (
    <>
      <div className="fixed z-40 w-[100vw] bg-white h-[12vh]">
        <Navbar />
      </div>
      <div className="mt-[12vh] w-[100%]">{children}</div>

      <div>{isOpen && <FracspaceAppModal />}</div>

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
