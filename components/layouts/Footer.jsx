"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo22.png";

function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#102A57] text-white font-manrope pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="inline-block group">
            <Image
              alt="Fracspace Logo"
              src={logo}
              className="h-13 sm:h-15 md:h-[58px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <p className="text-xs sm:text-sm leading-relaxed text-[#9FB2D6] max-w-sm">
            Fracspace offers innovative fractional investment opportunities, allowing you to own a share of luxury properties and unique real estate projects.
          </p>
          <div className="flex items-center gap-2.5 pt-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/fracspace/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/p/Fracspace-100085853381915/?_rdr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@FracspaceLimited"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-jakarta font-bold text-sm text-white mb-4 tracking-wide">
            Quick links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#9FB2D6]">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About us
              </Link>
            </li>
            <li>
              <Link href="/properties" className="hover:text-white transition">
                Properties
              </Link>
            </li>
            {/* <li>
              <Link href="/blogs" className="hover:text-white transition">
                Blog
              </Link>
            </li> */}
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="font-jakarta font-bold text-sm text-white mb-4 tracking-wide">
            Contact
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#9FB2D6] leading-relaxed">
            <li>
              4th Floor, Dreamscape Hotel, MLA Colony, NBT Nagar, Road No. 12, Banjara Hills, Hyderabad, Telangana, 500034
            </li>
            <li>
              <a href="mailto:support@fracspace.com" className="hover:text-white transition">
                support@fracspace.com
              </a>
            </li>
            <li className="flex flex-wrap items-center gap-1.5">
              <a href="tel:+919880626111" className="hover:text-white transition">
                +91 98806 26111
              </a>
              <span>·</span>
              <a href="tel:+919154867608" className="hover:text-white transition">
                +91 91548 67608
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-jakarta font-bold text-sm text-white mb-4 tracking-wide">
            Legal
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#9FB2D6]">
            <li>
              <Link href="/termsofuse" className="hover:text-white transition">
                Terms of service
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy" className="hover:text-white transition">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/refundpolicy" className="hover:text-white transition">
                Refund policy
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1180px] mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs text-[#8398C2]">
        Copyright 2026. All rights reserved by Fracspace.
      </div>
    </footer>
  );
}

export default Footer;

