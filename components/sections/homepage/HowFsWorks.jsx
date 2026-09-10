"use client";

import React from "react";

function HowFsWorks() {
  const steps = [
    {
      n: "01",
      icon: "◎",
      title: "Choose property",
      body: "Browse curated premium assets vetted by our in-house sourcing and legal teams."
    },
    {
      n: "02",
      icon: "◈",
      title: "Invest in fraction",
      body: "Purchase a share starting at a fraction of the full asset value, fully documented."
    },
    {
      n: "03",
      icon: "▤",
      title: "Earn rental income",
      body: "Receive your share of net rental income directly to your bank account."
    },
    {
      n: "04",
      icon: "↗",
      title: "Exit anytime",
      body: "Sell your share after lock-in through the resale window or a private transfer."
    }
  ];

  return (
    <section
      id="how"
      className="relative bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#0F2A57] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-manrope"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 96px)"
        }}
      ></div>

      <div className="relative max-w-[1180px] mx-auto text-center">
        <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          From browsing to ownership
        </h2>
        <p className="text-sm sm:text-base text-[#A9BDE2] max-w-xl mx-auto mb-12 leading-relaxed">
          Fractional ownership made accessible, transparent and completely hassle-free.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 backdrop-blur-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center text-base font-bold">
                    {s.icon}
                  </span>
                  <span className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white/30">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-jakarta text-base font-bold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#A9BDE2]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowFsWorks;
