"use client";

import React from "react";

function VisionMission() {
  const mission = [
    {
      icon: "◇",
      title: "Transparency",
      body: "Clear documentation, structured agreements and transparent reporting at every stage."
    },
    {
      icon: "⚖",
      title: "Security",
      body: "Legally compliant ownership structures and professionally managed assets."
    },
    {
      icon: "◎",
      title: "Accessibility",
      body: "Lower capital entry barriers without compromising on asset quality."
    },
    {
      icon: "↗",
      title: "Long-term value",
      body: "Focus on steady income generation and sustainable appreciation."
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] font-manrope">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mb-3">
            Our mission
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B8A] max-w-lg mx-auto leading-relaxed">
            Four principles that govern every asset we list and every share we sell.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mission.map((m, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl p-7 transition duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#EDF2FB] text-[#16418C] flex items-center justify-center text-lg font-bold mb-5">
                  {m.icon}
                </span>
                <h3 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A] mb-2.5">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#5C6B8A]">
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VisionMission;
