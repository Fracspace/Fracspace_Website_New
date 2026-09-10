"use client";

import React from "react";

function ContactDetails() {
  const channels = [
    {
      icon: "☎",
      label: "Phone",
      primary: "+91 98806 26111",
      secondary: "Mon–Sat · 9:00 AM – 5:30 PM IST",
      action: "Call us →",
      href: "tel:+919880626111"
    },
    {
      icon: "✉",
      label: "Email",
      primary: "info@fracspace.com",
      secondary: "General enquiries & partnerships",
      action: "Write to us →",
      href: "mailto:info@fracspace.com"
    },
    {
      icon: "◎",
      label: "Headquarters",
      primary: "Hyderabad, Telangana",
      secondary: "Fracspace HQ · Jubilee Hills",
      action: "View on map →",
      href: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
    }
  ];

  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white font-manrope">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {channels.map((ch, idx) => (
          <a
            key={idx}
            href={ch.href}
            target={ch.href.startsWith("http") ? "_blank" : undefined}
            rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl p-6 sm:p-7 flex flex-col gap-3.5 bg-white transition duration-300 hover:shadow-lg group"
          >
            <span className="w-10 h-10 rounded-xl bg-[#EDF2FB] text-[#16418C] flex items-center justify-center text-lg font-bold">
              {ch.icon}
            </span>
            <div>
              <span className="font-mono-plex text-[10px] tracking-widest text-[#9AA9C4] uppercase font-semibold">
                {ch.label}
              </span>
              <div className="font-jakarta text-base sm:text-lg font-bold text-[#14203A] mt-0.5 group-hover:text-[#16418C] transition">
                {ch.primary}
              </div>
            </div>
            <div className="text-xs sm:text-[13px] text-[#5C6B8A]">
              {ch.secondary}
            </div>
            <span className="text-xs font-bold text-[#16418C] mt-auto pt-2">
              {ch.action}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ContactDetails;
