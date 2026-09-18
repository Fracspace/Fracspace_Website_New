"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../assets/logo.png";
import { useDownloadApp } from "@/context/DownloadAppContext";
import { Download } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openDownloadModal } = useDownloadApp();

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact", href: "/contact" },
    { label: "About Us", href: "/about" }
  ];

  const isActive = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7EBF2] font-manrope">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-none group">
            <Image
              alt="Fracspace Logo"
              src={logo}
              className="h-11 sm:h-12 w-auto object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    active
                      ? "text-[#16418C] font-bold"
                      : "text-[#4A5878] hover:text-[#0B2452]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Redesigned Download App Button */}
            <button
              onClick={openDownloadModal}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-[#0B2452] via-[#0E2C68] to-[#16418C] hover:from-[#16418C] hover:via-[#1D4FAD] hover:to-[#2258BE] text-white pl-4.5 pr-3 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow-lg hover:shadow-[#16418C]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer border border-white/15 group"
            >
              <span className="tracking-tight">Download App</span>
              <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Download className="w-3 h-3 text-[#99BEFF] group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200" />
              </span>
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-11 h-11 rounded-xl border border-[#DDE4EF] bg-white flex flex-col items-center justify-center gap-1.5 cursor-pointer p-0 shadow-xs"
          >
            <span
              className={`w-5 h-0.5 bg-[#0B2452] rounded transition-transform duration-200 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#0B2452] rounded transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#0B2452] rounded transition-transform duration-200 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[60] bg-[#07142C]/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Aside */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[min(320px,84vw)] flex flex-col bg-gradient-to-br from-[#071A38] to-[#123068] text-white font-manrope shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="font-jakarta font-extrabold tracking-wider text-sm text-white">
            FRACSPACE MENU
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white text-lg hover:bg-white/10 transition cursor-pointer"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col px-6 py-3">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between py-4 text-base font-semibold border-b border-white/10 transition-colors ${
                  active ? "text-[#8FB4FF] font-bold" : "text-white/90 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-white/40">›</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-6 flex flex-col gap-3.5 border-t border-white/10">
          <button
            onClick={() => {
              setMenuOpen(false);
              openDownloadModal();
            }}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#DCE7FF] text-[#0B2452] py-3.5 rounded-full text-sm font-bold shadow-sm transition-all cursor-pointer group"
          >
            <span>Download App</span>
            <Download className="w-4 h-4 text-[#16418C] group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>
          <div className="flex flex-col gap-1 items-center">
            <a
              href="tel:+919880626111"
              className="text-center text-xs text-[#A9BDE2] hover:text-white transition"
            >
              +91 98806 26111
            </a>
            <a
              href="tel:+919154867608"
              className="text-center text-xs text-[#A9BDE2] hover:text-white transition"
            >
              +91 91548 67608
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;

