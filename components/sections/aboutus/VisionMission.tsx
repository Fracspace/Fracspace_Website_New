"use client";

import { Search, Lock, Shield, BarChart3 } from "lucide-react";

function VisionMission() {
  const missionItems = [
    {
      icon: <Search size={22} />,
      title: "Transparency",
      desc: "Clear documentation, structured agreements, and transparent reporting."
    },
    {
      icon: <Lock size={22} />,
      title: "Security",
      desc: "Legally compliant structures and professionally managed assets."
    },
    {
      icon: <Shield size={22} />,
      title: "Accessibility",
      desc: "Lower capital entry barriers without compromising asset quality."
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Long-Term Value",
      desc: "Focus on fixed generation and sustainable appreciation."
    }
  ];
  return (
    <section className="relative overflow-hidden bg-[#0D2B6B] text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')"
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0D2B6B]/85" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-24">
        {/* Vision */}
        <div className="mb-16">
          <h2 className="mb-5 text-3xl font-light sm:text-4xl lg:text-5xl">
            Our Vision
          </h2>

          <p className="mb-5 max-w-7xl text-sm leading-7 text-gray-200 sm:text-base sm:leading-8 lg:text-lg">
            To redefine real estate ownership by making premium property
            investments accessible to a wider community of investors through
            structured and transparent co-ownership models.
          </p>

          <p className="max-w-7xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8 lg:text-lg">
            We envision a future where property ownership is not limited by
            capital barriers but enabled by technology and trust.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="mb-8 text-3xl font-light sm:text-4xl lg:text-5xl">
            Our Mission
          </h2>

          {/* Flex Layout */}
          <div className="flex flex-wrap gap-5">
            {missionItems.map((item, index) => (
              <div
                key={index}
                className="
                  w-full
                  sm:w-[calc(50%-10px)]
                  lg:w-[calc(25%-15px)]
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  backdrop-blur-sm
                  transition
                  duration-300
                  hover:bg-white/10
                  hover:shadow-xl
                "
              >
                <div className="mb-4 text-orange-400">{item.icon}</div>

                <h3 className="mb-3 text-lg font-medium">{item.title}</h3>

                <p className="text-sm leading-6 text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMission;
