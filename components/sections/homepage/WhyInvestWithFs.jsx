import React from "react";
import Image from "next/image";
import heroImg from "../../../assets/herobg.webp";
import complemtaryIcon from "../../../assets/icons/complementaryStays.png";
import lockIcon from "../../../assets/icons/lock.png";
import dualIncomeIcon from "../../../assets/icons/dualIncome.png";
import managedAssetIcon from "../../../assets/icons/managedAsset.png";

import hilltopImg from "../../../assets/hilltopImg.webp";

import { useMediaQuery } from "react-responsive";

function WhyInvestWithFs() {
  const isMobile = useMediaQuery({ maxWidth: 350 });

  return (
    <div>
      <section className="mt-12 relative overflow-hidden">
        <div className="w-full h-auto md:min-h-screen absolute bg-[linear-gradient(to_right,#021265cc,#003399aa),radial-gradient(circle_at_top,#00a6ff55,transparent_30%),radial-gradient(circle_at_bottom_left,#7c3aed55,transparent_30%)]   inset-0 md:bg-gradient-to-r md:from-[#122d66]/95 md:via-[#28519a]/90 md:to-[#122d66]/95  z-20"></div>
        {!isMobile && (
          <Image
            alt="hero image"
            src={heroImg}
            className="absolute z-10 w-full h-full min-h-screen"
          />
        )}
        <div className="z-30 h-auto relative py-12 mx-auto max-w-7xl">
          {/* inset-0 bg-gradient-to-r from-[#122d66]/95 via-[#28519a]/90 to-[#122d66]/95  ........... md:bg-gradient-to-r md:from-slate-900/90 md:to-bule-900/60*/}
          <h2 className="text-center font-jakarta text-3xl md:text-4xl text-white font-jakarta">
            Why Invest with Fracspace?
          </h2>
          <div className="mt-12 mx-5 sm:mx-10 max-w-7xl flex flex-col lg:flex-row gap-12 justify-between items-start">
            <div className="w-full lg:w-[40vw] rounded-xl relative max-w-[500px] mx-auto lg:mx-0">
              <Image
                alt="hero image"
                src={hilltopImg}
                className="w-full aspect-square rounded-2xl object-cover shadow-2xl"
              />
              <div className="bg-white p-4 rounded-xl absolute -top-6 -left-6 shadow-xl border border-gray-100 flex flex-col items-center justify-center min-w-[120px]">
                <p className="text-2xl font-bold font-jakarta text-[#021265]">200+</p>
                <p className="text-[10px] text-gray-500 font-dm uppercase tracking-wider text-center">Happy Investors</p>
              </div>
            </div>
            <div className="w-full lg:w-[50vw] space-y-6">
              <div className="flex gap-4 border-b border-white/10 pb-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={lockIcon}
                    alt="lock icon"
                    className="w-12 h-12 p-2 bg-[#EDE6DA] rounded-xl object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-jakarta text-lg font-semibold">
                    Secure Legal Structure
                  </p>
                  <p className="text-gray-300 font-dm text-sm mt-1 leading-relaxed">
                    Legally defined co-ownership with transparent documentation,
                    registered title deeds, and agreements that safeguard every
                    rupee you invest.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-b border-white/10 pb-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={managedAssetIcon}
                    alt="lock icon"
                    className="w-12 h-12 p-2 bg-[#EDE6DA] rounded-xl object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-jakarta text-lg font-semibold">
                    Fully Managed Assets
                  </p>
                  <p className="text-gray-300 font-dm text-sm mt-1 leading-relaxed">
                    We handle operations, tenants, maintenance, and compliance -
                    you simply earn, without ever managing a property yourself.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-b border-white/10 pb-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={dualIncomeIcon}
                    alt="lock icon"
                    className="w-12 h-12 p-2 bg-[#EDE6DA] rounded-xl object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-jakarta text-lg font-semibold">
                    Dual Income Stream
                  </p>
                  <p className="text-gray-300 font-dm text-sm mt-1 leading-relaxed">
                    Earn monthly rental income while your asset appreciates in
                    value - creating a powerful compounding wealth effect over
                    time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={complemtaryIcon}
                    alt="lock icon"
                    className="w-12 h-12 p-2 bg-[#EDE6DA] rounded-xl object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-jakarta text-lg font-semibold">
                    Complimentary Stays
                  </p>
                  <p className="text-gray-300 font-dm text-sm mt-1 leading-relaxed">
                    Enjoy exclusive stay privileges and premium owner benefits
                    at every property you hold a frac in - reward yourself as
                    you earn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhyInvestWithFs;
