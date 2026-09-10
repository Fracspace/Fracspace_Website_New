"use client";

import React, { useState } from "react";

function HomeFaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What is fractional ownership?",
      a: "Fractional ownership allows multiple investors to own an interest in a property rather than one person purchasing the entire asset. Each co-owner holds a legally documented share with proportional income and appreciation rights."
    },
    {
      q: "How does Fracspace select properties?",
      a: "Every asset is screened for destination demand, title clarity, rental potential and operator quality before it is listed. Fewer than 5% of sourced properties make it to the platform."
    },
    {
      q: "How much does it cost to invest?",
      a: "Fraction prices typically start at ₹10,00,000 depending on the asset. All fees, taxes and management charges are disclosed upfront before you commit."
    },
    {
      q: "Can I visit or stay at my property?",
      a: "Yes. Co-owners receive annual stay nights proportionate to their holding, bookable through the app subject to availability."
    },
    {
      q: "How do I exit my investment?",
      a: "Shares can be listed on the Fracspace resale window after the initial lock-in, or transferred privately to another verified investor."
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white font-manrope">
      <div className="max-w-[860px] mx-auto">
        <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mb-10 text-center">
          Questions. Answered.
        </h2>

        <div className="divide-y divide-[#E4E9F1]">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="py-5 sm:py-6">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 text-left font-jakarta text-base sm:text-lg font-bold text-[#14203A] hover:text-[#16418C] transition cursor-pointer"
                >
                  <span>{f.q}</span>
                  <span className="text-xl sm:text-2xl text-[#7B8AA8] shrink-0 font-normal">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3.5 text-xs sm:text-[14px] leading-relaxed text-[#5C6B8A] pr-6 animate-fsSlideUp">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeFaqSection;
