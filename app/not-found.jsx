import React from "react";
import Link from "next/link";
import { Home, Compass, BookOpen, Mail, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="w-full min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-[#F7F9FC] font-manrope">
      <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 sm:p-12 border border-[#E7EBF2] shadow-xl">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF1FC] text-[#16418C] text-xs font-bold uppercase tracking-wider mb-6">
          <span>Error 404</span>
        </div>

        {/* Big Code */}
        <h1 className="font-jakarta text-6xl sm:text-7xl font-extrabold text-[#0B2452] tracking-tight mb-4">
          404
        </h1>

        <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] mb-3">
          Page not found
        </h2>

        <p className="text-sm sm:text-base text-[#5C6B8A] leading-relaxed mb-8 max-w-md mx-auto">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B2452] hover:bg-[#16418C] text-white rounded-full text-xs sm:text-sm font-bold transition shadow-md group cursor-pointer"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#F1F5FB] text-[#0B2452] border border-[#DDE4EF] rounded-full text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#16418C]" />
            <span>View Properties</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-6 border-t border-[#E7EBF2] flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#5C6B8A]">
          <span className="text-[#9AA9C4]">Helpful links:</span>
          {/* <Link href="/blogs" className="hover:text-[#16418C] transition flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Blog
          </Link>
          <span className="text-[#DDE4EF]">·</span> */}
          <Link href="/about" className="hover:text-[#16418C] transition">
            About Us
          </Link>
          <span className="text-[#DDE4EF]">·</span>
          <Link href="/contact" className="hover:text-[#16418C] transition flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> Contact
          </Link>
        </div>

      </div>
    </main>
  );
}
