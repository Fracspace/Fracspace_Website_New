"use client";

import React from "react";

function Investors() {
  const testimonials = [
    {
      quote:
        "Clear, well-documented and professional. Their transparency and quality of opportunities gave me confidence to invest a second time.",
      name: "Mahesh Kothari",
      role: "Investor · Ahmedabad"
    },
    {
      quote:
        "Customer focused with off-market property options to invest in safely. I trust the reliability more than happening to be an investor in Fracspace.",
      name: "Mitali Dewal",
      role: "Investor · Indore"
    },
    {
      quote:
        "One of the best investment options one can consider. Good service and responsible team, have been associated with them for a year now and have zero issues.",
      name: "Bhargav Ram",
      role: "Investor · Hyderabad"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white font-manrope">
      <div className="max-w-[1180px] mx-auto">
        <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mb-3">
          Real people. Real ownership journeys.
        </h2>
        <p className="text-sm sm:text-base text-[#5C6B8A] mb-12">
          See what Fracspace investors say about their experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <figure
              key={idx}
              className="border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl p-6 sm:p-7 flex flex-col gap-4 bg-[#FCFDFF] transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-[#E0A93B] text-base tracking-widest">
                ★★★★★
              </div>
              <blockquote className="text-xs sm:text-[14px] leading-relaxed text-[#33415F] font-normal italic">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-[#EEF1F7] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0B2452] to-[#16418C] text-white flex items-center justify-center font-jakarta font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-jakarta text-sm font-bold text-[#14203A]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#7B8AA8]">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Investors;
