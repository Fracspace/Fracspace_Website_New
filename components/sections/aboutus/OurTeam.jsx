"use client";

import React, { useState } from "react";
import Image from "next/image";
import unnathSirImg from "../../../assets/unnathSir.jpeg";
import { useDownloadApp } from "@/context/DownloadAppContext";

// Sales Team Images
import abhisheikImg from "../../../assets/TeamMates/sales/abhishek.webp";
import divyaImg from "../../../assets/TeamMates/sales/divya.webp";
import dnsImg from "../../../assets/TeamMates/sales/dns1.webp";
import charithImg from "../../../assets/TeamMates/sales/charith.jpg";
import gitanshImg from "../../../assets/TeamMates/sales/gitansh.jpg";
import harshathImg from "../../../assets/TeamMates/sales/harshath.jpg";
import likithaImg from "../../../assets/TeamMates/sales/likitha.jpg";
import nithyaImg from "../../../assets/TeamMates/sales/nithya.jpg";

// Tech Team Images
import krishnaImg from "../../../assets/TeamMates/tech/krishna.webp";
import shashidharImg from "../../../assets/TeamMates/tech/shashidhar.jpg";
import rakeshImg from "../../../assets/TeamMates/tech/rakesh1.webp";
import tejaswiniImg from "../../../assets/TeamMates/tech/tejaswini.webp";
import vishnuImg from "../../../assets/TeamMates/tech/vishnu.webp";

// Marketing Team Images
import hruthikImg from "../../../assets/TeamMates/marketing/hruthik.webp";
import vivekanandaImg from "../../../assets/TeamMates/marketing/vivekananda.webp";
import mithunImg from "../../../assets/TeamMates/marketing/mithun.jpg";
import nikithaImg from "../../../assets/TeamMates/marketing/nikitha.jpg";
import gopichandImg from "../../../assets/TeamMates/marketing/gopichand.jpg";

// Hospitality Team Images
import deepakImg from "../../../assets/TeamMates/hospitality/deepak.webp";
import mansoorImg from "../../../assets/TeamMates/hospitality/mansoor.webp";
import ranjithImg from "../../../assets/TeamMates/hospitality/ranjith.webp";
import shivaImg from "../../../assets/TeamMates/hospitality/shiva.webp";
import srinivasImg from "../../../assets/TeamMates/hospitality/srinivas.webp";

function OurTeam() {
  const [selectedTeam, setSelectedTeam] = useState("All");
  const { openDownloadModal } = useDownloadApp();

  const groups = [
    {
      name: "Business & Sales",
      people: [
        { name: "Divya", role: "Second in Command", image: divyaImg },
        { name: "Prasanth", role: "Special Projects Commander", image: dnsImg },
        { name: "Abhisheik", role: "Pre-sales Executive", image: abhisheikImg },
        { name: "Charith", role: "Pre-sales Executive", image: charithImg },
        { name: "Gitansh", role: "Pre-sales Executive", image: gitanshImg },
        { name: "Harshath", role: "Pre-sales Executive", image: harshathImg },
        { name: "Likitha", role: "Pre-sales Executive", image: likithaImg },
        { name: "Nithya", role: "Pre-sales Executive", image: nithyaImg }
      ]
    },
    {
      name: "Marketing",
      people: [
        { name: "Vivekananda", role: "Digital Marketing Specialist", image: vivekanandaImg },
        { name: "Hruthik", role: "Video Editor", image: hruthikImg },
        { name: "Mithun", role: "Graphic Designer", image: mithunImg },
        { name: "Nikitha", role: "PR & Media Manager", image: nikithaImg },
        { name: "Gopichand", role: "Video Editor", image: gopichandImg }
      ]
    },
    {
      name: "Tech",
      people: [
        { name: "Rakesh", role: "Second Engineer in Command (SDE-2)", image: rakeshImg },
        { name: "Vishnuteja", role: "Senior Fullstack Developer", image: vishnuImg },
        { name: "Krishna", role: "Junior Software Developer", image: krishnaImg },
        { name: "Tejaswini", role: "UI/UX Designer", image: tejaswiniImg },
        { name: "Shashidhar", role: "IT Admin", image: shashidharImg }
      ]
    },
    {
      name: "Hospitality",
      people: [
        { name: "Mansoor", role: "Fitness Trainer", image: mansoorImg },
        { name: "Deepak", role: "Fitness Trainer", image: deepakImg }
      ]
    },
    {
      name: "House",
      people: [
        { name: "Shiva", role: "House Team", image: shivaImg },
        { name: "Ranjith", role: "House Team", image: ranjithImg },
        { name: "Srinivas", role: "House Team", image: srinivasImg }
      ]
    }
  ];

  const teamTabs = ["All", ...groups.map((g) => g.name)];

  const visibleGroups =
    selectedTeam === "All"
      ? groups
      : groups.filter((g) => g.name === selectedTeam);

  return (
    <div className="w-full font-manrope">
      
      {/* Founder / Visionary in Chief Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1140px] mx-auto bg-[#F1F5FB] border border-[#E2E9F4] rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-56 sm:w-64 aspect-[4/4.4] rounded-2xl overflow-hidden shadow-xl border border-white">
              <Image
                src={unnathSirImg}
                alt="Unnath Reddy - Founder of Fracspace"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
              Visionary in chief
            </span>
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14203A]">
              Unnath Reddy
            </h2>
            <div className="text-sm font-medium text-[#5C6B8A]">
              Founder, Fracspace
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#33415F]">
              Unnath Reddy is an entrepreneur and the founder of Fracspace, a real estate technology platform transforming how people invest in structured property assets.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#5C6B8A]">
              After years in corporate real estate and entrepreneurship, he identified the need for accessible and transparent property ownership models.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#5C6B8A]">
              Today he leads Fracspace's mission to democratise real estate investing and provide secure access to modern real-estate backed opportunities.
            </p>
            <div className="pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0B2452] hover:bg-[#16418C] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition shadow-md"
              >
                View LinkedIn profile
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1140px] mx-auto">
          
          <div className="mb-8 max-w-xl">
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mb-3">
              Our team
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B8A] leading-relaxed">
              Professionals with experience across real estate, finance, technology and entrepreneurship — building structured ownership for modern investors.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex gap-2.5 mb-10 flex-wrap">
            {teamTabs.map((t) => {
              const active = selectedTeam === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedTeam(t)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    active
                      ? "bg-[#16418C] text-white border border-[#16418C] shadow-sm"
                      : "bg-white text-[#4A5878] border border-[#DDE4EF] hover:border-[#16418C]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Team Groups */}
          <div className="space-y-12">
            {visibleGroups.map((grp, gIdx) => (
              <div key={gIdx}>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A]">
                    {grp.name} team
                  </h3>
                  <div className="flex-1 h-[1px] bg-[#E7EBF2]"></div>
                  <span className="font-mono-plex text-xs text-[#9AA9C4]">
                    {grp.people.length} members
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {grp.people.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-lg transition duration-300 flex flex-col"
                    >
                      <div className="relative aspect-square bg-[#EEF2F8] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-jakarta text-xs sm:text-sm font-bold text-[#14203A] truncate">
                            {p.name}
                          </span>
                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-[#16418C] border border-[#DDE4EF] hover:bg-[#16418C] hover:text-white rounded px-1.5 py-0.5 transition shrink-0"
                          >
                            in
                          </a>
                        </div>
                        <div className="text-[11px] text-[#7B8AA8] leading-snug">
                          {p.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* App Banner */}
      <section className="pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1140px] mx-auto rounded-3xl bg-gradient-to-r from-[#0A1F42] via-[#0E2C68] to-[#14357A] p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-white leading-tight">
              See how Fracspace works
            </h2>
            <p className="text-sm sm:text-base text-[#B7C6E4] max-w-xl leading-relaxed">
              Explore verified co-ownership opportunities, track performance and invest with confidence — all from one app.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-3.5 justify-start lg:justify-end">
            <button
              onClick={openDownloadModal}
              className="bg-white hover:bg-[#DCE7FF] text-[#0B2452] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-md cursor-pointer"
            >
              App Store
            </button>
            <button
              onClick={openDownloadModal}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-md cursor-pointer"
            >
              Google Play
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default OurTeam;
