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
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <p className="text-xs sm:text-sm leading-relaxed text-[#9FB2D6] max-w-sm">
            Fracspace offers innovative fractional investment opportunities, allowing you to own a share of luxury properties and unique real estate projects.
          </p>
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition"
            >
              in
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition"
            >
              f
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Twitter"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition"
            >
              𝕏
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

